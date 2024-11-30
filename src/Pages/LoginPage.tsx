import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import * as Yup from "yup";
import { useFormik } from "formik";
import { login } from "../services/api";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
function LoginPage() {
    const navigate = useNavigate();
    // const { setUser } = useAuthContext()
  
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
        // console.log(response)
        // const response = Users.find((u) => u.email === values.email && u.password === values.password);
        if (!response.errors) {
        //   localStorage.setItem("token", response.token);
        //   localStorage.setItem("roles", JSON.stringify(response.roles));
        //   const decode = decodeToken(response.token);
        //   setUser({id: decode.id, email:decode.username, name:decode.username, role: response.roles});
          navigate("/");
        } else {
        //   Swal.fire({
        //     position: "center",
        //     icon: "error",
        //     title: "Credenciales incorrectas",
        //     showConfirmButton: false,
        //     timer: 1000,
        //   });
        alert(`error del backend ${JSON.stringify(response.errors.email[0])}`)
        }
      },
    });
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-lg rounded-lg p-6 w-80"
      >
        <h2 className="text-center font-bold text-xl">Inicio de Sesión</h2>

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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
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
      .min(3, "La contraseña debe tener al menos 3 caracteres"),
});