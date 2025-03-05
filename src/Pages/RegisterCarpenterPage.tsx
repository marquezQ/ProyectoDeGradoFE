import { Button, Box, Typography, TextField } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { AccountCircle } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useAuthContext } from "../hooks/useAuthContext";
import MapWithLocation from "./exampleMap"; // Componente del mapa
import { ChangeEvent } from "react";
import { registerWorker } from "../services/workerApi";
import { useNavigate } from "react-router-dom";

// Tipo para manejar las imágenes subidas
type ProfileImages = File[];

function RegisterCarpenterPage() {
  const { user, setWorker } = useAuthContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      description: "",
      workshop: "",
      latitude: "-17.3935",
      longitude: "-66.157",
      address: "",
      profileImages: [] as ProfileImages,
    },
    validationSchema,
    onSubmit: async (values) => {
      const dataSend = new FormData();
      dataSend.append("user_id", user ? user.id.toString() : "");
      dataSend.append("description", values.description);
      dataSend.append("workshop", values.workshop);
      dataSend.append("latitud", values.latitude);
      dataSend.append("longitud", values.longitude);
      dataSend.append("address", values.address || "");
      values.profileImages.forEach((image, index) => {
        dataSend.append(`imagen${index + 1}`, image);
      });

      try {
        const response = await registerWorker(dataSend);
        setWorker(response.trabajador);
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/workers'); //añadir ruta del perfil del carpintero cuando ya se tenga
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error al registrarte",
          showConfirmButton: true,
        });
        throw error;
      }
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedFiles = Array.from(files);
    if (formik.values.profileImages.length + uploadedFiles.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Límite de imágenes alcanzado",
        text: "Solo puedes subir un máximo de 5 imágenes.",
      });
      return;
    }

    formik.setFieldValue("profileImages", [...formik.values.profileImages, ...uploadedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = formik.values.profileImages.filter((_, i) => i !== index);
    formik.setFieldValue("profileImages", updatedImages);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-lg rounded-lg p-6 w-auto border-2"
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
            Registro de Carpintero
          </Typography>
          <AccountCircle sx={{ fontSize: 64, color: "primary.main", mt: 1 }} />
        </Box>

        <TextField
          label="Descripción"
          name="description"
          multiline
          rows={3}
          fullWidth
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          label="Cargo o especialidad"
          name="workshop"
          placeholder="Carpintero Ebanista, Taller de carpintería ABC..."
          fullWidth
          value={formik.values.workshop}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.workshop && Boolean(formik.errors.workshop)}
          helperText={
            formik.touched.workshop && formik.errors.workshop
              ? formik.errors.workshop // Si hay error, muestra el mensaje en rojo
              : "Escribe tu especialidad o el nombre de tu negocio"
          }
        />

        {/* Mapa para seleccionar ubicación */}
        <Box mt={2}>
          <Typography variant="h6" color="primary">
            Selecciona tu ubicación en el mapa:
          </Typography>
          <MapWithLocation
            onLocationSelect={(lat, lng) => {
              formik.setFieldValue("latitude", lat);
              formik.setFieldValue("longitude", lng);
            }}
          />
        </Box>
        <TextField
          label="Descripción de la dirección (Opcional)"
          name="address"
          fullWidth
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        {/* Subir Imágenes */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {formik.values.profileImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  borderRadius: "10%",
                  border: "1px solid #ccc",
                  overflow: "hidden",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Imagen ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <HighlightOffOutlinedIcon
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    color: "white",
                    cursor: "pointer",
                    "&:hover": { color: "gray" },
                  }}
                  onClick={() => handleRemoveImage(index)}
                />
              </Box>
            ))}
          </Box>
          {/* Mensaje de error si no hay imágenes */}
          <Typography color="error">
            {typeof formik.errors.profileImages === "string"
              ? formik.errors.profileImages
              : Array.isArray(formik.errors.profileImages)
                ? formik.errors.profileImages.join(", ") // Convierte el array en un string separado por comas
                : ""}
          </Typography>

          <Button
            variant="contained"
            component="label"
            color="primary"
            disabled={formik.values.profileImages.length >= 5} // Deshabilitar si hay 5 imágenes
          >
            Subir Imágenes
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleImageUpload}
            />
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrarse
        </Button>
      </form>
    </div>
  );
}
export default RegisterCarpenterPage;

const validationSchema = Yup.object({
  description: Yup.string().required("La descripción es requerida")
    .min(50, "La descripción debe tener al menos 50 caracteres"),
  workshop: Yup.string()
    .required("Este campo es obligatorio")
    .min(10, "Debe tener al menos 10 caracteres"),
  latitude: Yup.string().required("La latitud es requerida"),
  longitude: Yup.string().required("La longitud es requerida"),
  address: Yup.string()
    .notRequired()
    .test("min-length", "La dirección debe tener al menos 10 caracteres.", (value) => {
      return !value || value.length >= 10;
    }),
  profileImages: Yup.array()
    .min(1, "Debes subir al menos una imagen.")
    .max(5, "Solo puedes subir un máximo de 5 imágenes."),
});