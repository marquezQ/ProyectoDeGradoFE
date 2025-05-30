import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useFormik } from "formik";
import { login } from "../services/api";
import { Button, TextField, InputAdornment, IconButton, Box, Typography } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuthContext } from "../hooks/useAuthContext";
import { isWorker } from "../services/workerApi";
import image from "../assets/imageLogin.jpeg";

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
          navigate("/workers");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Card principal */}
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row min-h-[600px]">
        
        {/* Sección izquierda - Imagen */}
        <div 
          className="md:w-1/2 relative flex items-center justify-center p-8"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          
          {/* Contenido central */}
          <div className="relative z-10 text-center text-white">
            <Typography variant="h4" component="h1" fontWeight="bold" className="mb-3">
              CarpinPro
            </Typography>
            <Typography variant="body1" className="opacity-90 max-w-xs mx-auto">
              La plataforma líder para profesionales de la carpintería
            </Typography>
          </div>
        </div>

        {/* Sección derecha - Formulario */}
        <div className="md:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-sm">
            
            {/* Título */}
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" component="h2" fontWeight="bold" color="primary.main" className="mb-2">
                Iniciar Sesión
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ingresa tus credenciales para continuar
              </Typography>
            </Box>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
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
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
              >
                Iniciar Sesión
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

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