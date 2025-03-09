import axios from "axios";

export const axiosInstace = axios.create({
    baseURL: import.meta.env.VITE_API_URL,    
    // timeout: 3000 // opcional tiempo de espera
    headers: {}
});

axiosInstace.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        //manejo de error antes de enviar la solicitud
        console.log("Error en la solicitud", error);
        return Promise.reject(error);
    }
);

axiosInstace.interceptors.response.use(
    (response) => {
        //manejo de respuestas exitosas
        return response
    },
    (error) => {
        // Manejo de errores globalmente
        if (error.response) {
            console.error("Error en la respuesta:", error.response);
            //manejar errores específicos según el código de estado
            if (error.response.status === 401) {
                console.warn("No autorizado, redirigiendo al login...");
                // Redirige al login si es necesario
            }
        } else {
            console.error("Error de red:", error.message);
        }
        return Promise.reject(error);
    }
);