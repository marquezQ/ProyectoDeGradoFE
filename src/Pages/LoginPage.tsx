import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useFormik } from "formik";
import { login } from "../services/api";
import { Button, TextField, InputAdornment, IconButton, Box, Typography } from "@mui/material";
import { useState } from "react";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../hooks/useAuthContext";
import { isWorker } from "../services/workerApi";
function LoginPage() {
    const navigate = useNavigate();
    const { setUser, setWorker } = useAuthContext()
  
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const { handleChange, handleBlur, handleSubmit, errors, touched, values } = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        const response = await login(values.email, values.password);
        if (response && response.user) {
          localStorage.setItem("token", response.token);
          setUser(response.user);
          const dataCarpenter = await isWorker(response.user.id);
          if(dataCarpenter){
            setWorker(dataCarpenter);
          }
          navigate("/");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Credenciales incorrectas",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
    });
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-lg rounded-lg p-6 w-80 border-2"
      >
        <Box textAlign="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
            CarpinPro
          </Typography>
          <AccountCircle sx={{ fontSize: 64, color: "primary.main", mt: 1 }} />
        </Box>

        <Typography variant="h5" textAlign="center" color="primary" mb={3}>
          Iniciar Sesión
        </Typography>
        {/* Campo Email */}
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

        {/* Botón de Enviar */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
}

export default LoginPage

const validationSchema = Yup.object({
    email: Yup.string()
      .required("El correo electrónico es obligatorio")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "El correo debe seguir un formato de dirección de correo electrónico válido."
      ),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .max(15, "La Contraseña debe contener máximo 15 caracteres")
      .min(5, "La contraseña debe tener al menos 5 caracteres"),
});