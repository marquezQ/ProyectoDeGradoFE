import { useState, ChangeEvent } from "react";
import { TextField, Button, Box } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { PhotoCamera } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { updateUser } from "../../services/api";
import { User } from "../../Interfaces/UserInterface";

interface Props {
  user: User;
  onCancel: () => void;
  refresh: () => void;
}

function EditUser({ user,  onCancel, refresh }: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(user.profile_picture || null);
  const [removeImage, setRemoveImage] = useState(false); // Nuevo estado

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      lastname: user.lastname || "",
      email: user.email || "",
      phone: user.phone_number || "",
      profileImage: null as File | null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      lastname: Yup.string().required("El apellido es obligatorio"),
      phone: Yup.string()
        .required("El número de celular es obligatorio")
        .matches(/^\d{8,15}$/, "El número debe tener entre 8 y 15 dígitos"),
      // profileImage: Yup.mixed().notRequired(),
    }),
    onSubmit: async (values) => {
      const dataSend = new FormData();
      dataSend.append("name", values.name);
      dataSend.append("lastname", values.lastname);
      dataSend.append("email", values.email);
      dataSend.append("phone_number", values.phone);
      if (values.profileImage) {
        dataSend.append("profile_picture", values.profileImage);
      }
      if (removeImage) {
        dataSend.append("remove_profile_picture", "1"); // Indica que se debe eliminar
      }
      try {
        await updateUser(dataSend, user.id.toString());
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Perfil actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
        onCancel()
        refresh();
      } catch {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error al actualizar",
          showConfirmButton: true,
        });
      }
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (!file) return;
    formik.setFieldValue("profileImage", file);
    const objectURL = URL.createObjectURL(file);
    setPreviewImage(objectURL);
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("profileImage", null);
    setPreviewImage(null);
    setRemoveImage(true); // Marca para eliminar en el backend
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box
          sx={{
            position: "relative",
            width: 100,
            height: 100,
            borderRadius: "30%",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "#f9f9f9",
          }}
        >
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Perfil"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <HighlightOffOutlinedIcon
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "transparent",
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { color: "gray" },
                }}
                onClick={handleRemoveImage}
              />
            </>
          ) : (
            <PhotoCamera sx={{ fontSize: 32, color: "#ccc" }} />
          )}
        </Box>
        <Button variant="contained" component="label" color="primary">
          Cambiar Foto
          <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
        </Button>
      </Box>

      <TextField
        name="name"
        label="Nombre"
        variant="outlined"
        fullWidth
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        name="lastname"
        label="Apellido"
        variant="outlined"
        fullWidth
        value={formik.values.lastname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
        helperText={formik.touched.lastname && formik.errors.lastname}
      />
      <TextField
        name="email"
        label="Correo Electrónico"
        variant="outlined"
        fullWidth
        value={formik.values.email}
        disabled
      />
      <TextField
        name="phone"
        label="Número de Celular"
        variant="outlined"
        fullWidth
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />

      <Box display="flex" justifyContent="end" gap="0.5rem">
        <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
      </Box>
    </form>
  );
}

export default EditUser;