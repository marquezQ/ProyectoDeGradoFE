import {
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { AccountCircle } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useAuthContext } from "../hooks/useAuthContext";
import { register } from "../services/api";

 
type ProfileImages = File[];

function RegisterCarpenterPage() {
  
  const { user } = useAuthContext();

  const { handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched } =
    useFormik({
      initialValues: {
        user_id: user?user.id:"", //obtener el id de usuario
        description: "",
        location: "",
        profileImages: [] as ProfileImages, // Array de imágenes
      },
      validationSchema,
      onSubmit: async (values) => {
        const dataSend = new FormData();
        dataSend.append("user_id", values.user_id);
        dataSend.append("description", values.description);
        dataSend.append("latitud", "aqui la cordenada");
        dataSend.append("longitud", "aqui la otra cordenada");
        // Agregar imágenes al FormData
        values.profileImages.forEach((image, index) => {
          dataSend.append(`imagen${index+1}`, image);
        });

        try {
          const response = await register(dataSend);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro exitoso",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrió un error al registrarte",
            showConfirmButton: true,
          });
          throw error
        }
      },
    });

  // Manejar subida de imágenes
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedFiles = Array.from(files);
    if (values.profileImages.length + uploadedFiles.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Límite de imágenes alcanzado",
        text: "Solo puedes subir un máximo de 5 imágenes.",
      });
      return;
    }

    setFieldValue("profileImages", [...values.profileImages, ...uploadedFiles]);
    console.log(values.profileImages)
  };

  // Eliminar una imagen específica
  const handleRemoveImage = (index: number) => {
    const updatedImages = values.profileImages.filter((_, i) => i !== index);
    setFieldValue("profileImages", updatedImages);
    console.log(values.profileImages)
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-lg rounded-lg p-6 w-auto border-2"
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
            Registro de Carpintero
          </Typography>
          <AccountCircle sx={{ fontSize: 64, color: "primary.main", mt: 1 }} />
        </Box>

        {/* Otros campos omitidos para brevedad */}
        
        <TextField
          label="Descripción"
          name="description"
          multiline
          rows={3}
          fullWidth
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
          className="mb-4"
        />
        <TextField
          label="Localizacion"
          name="location"
          multiline
          rows={5}
          fullWidth
          value={values.location}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.location && Boolean(errors.location)}
          helperText={touched.location && errors.location}
          className="mb-4"
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
            {values.profileImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: 100,
                  height: 100,
                  borderRadius: "30%",
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
          <Button
            variant="contained"
            component="label"
            color="primary"
            disabled={values.profileImages.length >= 5} // Deshabilitar si hay 5 imágenes
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

// Validaciones
const validationSchema = Yup.object({
  // Otros campos omitidos para brevedad
  description: Yup.string().required('La descripción es requerida'),
  location: Yup.string().required('La localizacion es requerida'),
  profileImages: Yup.array().max(5, "Solo puedes subir un máximo de 5 imágenes."),
});
