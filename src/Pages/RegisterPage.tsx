import { useState, ChangeEvent } from "react";
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Backdrop, CircularProgress } from "@mui/material";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

type ProfileImage = File | null;

function RegisterPage() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const { handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        profileImage: null as ProfileImage,
      },
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        const dataSend = new FormData();
        dataSend.append("name", values.name);
        dataSend.append("lastname", values.lastname);
        dataSend.append("email", values.email);
        dataSend.append("phone_number", values.phone);
        dataSend.append("password", values.password);

        if (values.profileImage) {
          dataSend.append("profile_picture", values.profileImage); 
        }
        try {
          const response = await register(dataSend);
          localStorage.setItem("token", response.token);
          setUser(response.user);
          await Swal.fire({
            position: "center",
            icon: "success",
            title: "Registro exitoso",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/');
        } catch (error) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Ocurrió un error al registrarte",
            showConfirmButton: true,
          });
          throw error;
        } finally {
          setLoading(false);
        }
      },
    });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFieldValue("profileImage", file); // Agregar el archivo al formulario
  };

  return (
    <div className="flex items-center justify-center pt-4">
      {/* Loader mientras espera */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1301 }}>
        <CircularProgress color="primary" />
      </Backdrop>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-lg rounded-lg p-6 w-96 border-2"
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
            Registro de Usuario
          </Typography>
        </Box>

        {/* Campo Nombre */}
        <TextField
          name="name"
          label="Nombre"
          variant="outlined"
          fullWidth
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        {/* Campo apellido */}
        <TextField
          name="lastname"
          label="Apellido"
          variant="outlined"
          fullWidth
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastname && Boolean(errors.lastname)}
          helperText={touched.lastname && errors.lastname}
        />

        {/* Campo Correo Electrónico */}
        <TextField
          name="email"
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />

        {/* Campo Número de Celular */}
        <TextField
          name="phone"
          label="Número de Celular"
          variant="outlined"
          fullWidth
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />

        {/* Campo Contraseña */}
        <TextField
          name="password"
          label="Contraseña"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Campo Confirmar Contraseña */}
        <TextField
          name="confirmPassword"
          label="Confirmar Contraseña"
          variant="outlined"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Subir Foto */}
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={2}>
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
            {values.profileImage ? (
              <>
                <img
                  src={URL.createObjectURL(values.profileImage)}
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
                    "&:hover": { color: "gray" },
                  }}
                  onClick={() => setFieldValue("profileImage", null)}
                >
                </HighlightOffOutlinedIcon>
              </>
            ) : (
              <PhotoCamera sx={{ fontSize: 32, color: "#ccc" }} />
            )}
          </Box>
          <Button
            variant="contained"
            component="label"
            color="primary"
          >
            Subir Foto
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
        </Box>

        {/* Botón de Registrarse */}
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;

const validationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio"),
  lastname: Yup.string()
    .required("El apellido es obligatorio"),
  email: Yup.string()
    .required("El correo electrónico es obligatorio")
    .email("Debes ingresar un correo válido"),
  phone: Yup.string()
    .required("El número de celular es obligatorio")
    .matches(/^\d{8,15}$/, "El número debe tener entre 8 y 15 dígitos"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .max(15, "La contraseña debe contener máximo 15 caracteres")
    .min(5, "La contraseña debe tener al menos 5 caracteres"),
  confirmPassword: Yup.string()
    .required("Debes confirmar tu contraseña")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  // profileImage: Yup.mixed().required("La imagen de perfil es obligatoria"),
})