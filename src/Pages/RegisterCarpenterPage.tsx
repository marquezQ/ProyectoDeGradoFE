import { Button, Box, Typography, TextField, useMediaQuery, Theme, Backdrop, CircularProgress } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useAuthContext } from "../hooks/useAuthContext";
import MapWithLocation from "./exampleMap";
import { ChangeEvent, useState } from "react";
import { registerWorker } from "../services/workerApi";
import { useNavigate } from "react-router-dom";

type ProfileImages = File[];

function RegisterCarpenterPage() {
  const { user, setWorker } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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
      setLoading(true);
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
        navigate('/workers');
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error al registrarte",
          showConfirmButton: true,
        });
        throw error;
      }finally {
        setLoading(false);  
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
    <Box display="flex" justifyContent="center" className="p-3 sm:p-6">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        gap={4}
        // bgcolor="white"
        boxShadow={3}
        borderRadius={2}
        className="p-3 sm:p-6"
        width="100%"
        maxWidth="1200px"
        border="2px solid"
        borderColor="divider"
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
            Registro de Carpintero
          </Typography>
        </Box>

        {/* Contenedor de dos columnas */}
        <Box 
          display="flex" 
          flexDirection={isMobile ? "column" : "row"} 
          gap={4}
          width="100%"
        >
          <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1301 }}>
                <CircularProgress color="primary" />
            </Backdrop>
          {/* Columna izquierda - Información */}
          <Box flex={1}>
            <Typography variant="h5" component="h2" color="primary" gutterBottom mb={3}>
              Información
            </Typography>
            
            <TextField
              label="Descripción"
              name="description"
              multiline
              rows={isMobile ? 3 : 6}
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              sx={{ mb: 3 }}
            />

            <TextField
              label="Especialidad o nombre de tu taller"
              name="workshop"
              placeholder="Carpintero Ebanista, Taller de carpintería ABC..."
              fullWidth
              value={formik.values.workshop}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.workshop && Boolean(formik.errors.workshop)}
              helperText={
                formik.touched.workshop && formik.errors.workshop
                  ? formik.errors.workshop
                  : "Escribe tu especialidad o el nombre de tu negocio"
              }
              sx={{ mb: 3 }}
            />

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
          </Box>

          {/* Columna derecha - Ubicación */}
          <Box flex={1}>
            <Typography variant="h5" component="h2" color="primary" gutterBottom mb={3}>
              Ubicación del Taller
            </Typography>
            
            <Box 
              sx={{ 
                height: isMobile ? '300px' : '100%',
                minHeight: '400px',
                width: '100%',
                mb: 3
              }}
            >
              <MapWithLocation
                onLocationSelect={(lat, lng) => {
                  formik.setFieldValue("latitude", lat);
                  formik.setFieldValue("longitude", lng);
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Sección de imágenes */}
        <Box width="100%">
          <Typography variant="h5" component="h2" color="primary" gutterBottom mb={2}>
            Imágenes de tus trabajos
          </Typography>
          {/* 👇 Mensaje informativo */}
          <Typography variant="body2" color="text.secondary" mb={2}>
            La primera imagen que selecciones será usada como tu portada.
          </Typography>
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
                    width: 140,
                    height: 140,
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
            
            <Typography color="error">
              {typeof formik.errors.profileImages === "string"
                ? formik.errors.profileImages
                : Array.isArray(formik.errors.profileImages)
                  ? formik.errors.profileImages.join(", ")
                  : ""}
            </Typography>

            <Button
              variant="contained"
              component="label"
              color="primary"
              disabled={formik.values.profileImages.length >= 5}
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
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>
          Registrarse
        </Button>
      </Box>
    </Box>
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