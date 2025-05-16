import { axiosInstace } from "./axiosInstace";

export const login = async (email: string, password: string) => {
    try{
        const response = await axiosInstace.post('/login', {email, password});
        return response.data
    }catch (error) {
        console.log("error en login", error )
        throw error;
    }
}

export const register = async (user: object) => {
    try {
        const response = await axiosInstace.post('/register', user)
        return response.data
    } catch (error) {
        console.log("error al registrar usuario", error);
        throw error;
    }
}

export const getUserData = async () => {
    try {
        const response = await axiosInstace.get('/user');
        return response.data
    } catch (error) {
        console.log("error al recuperar data del usuario", error);
    }
}

export const getUser = async (id: string) => {
    try {
        const response = await axiosInstace.get(`/user/${id}`);
        return response.data.datos
    } catch (error) {
        console.log("error al recuperar al usuario");
        throw error
    }
}

export const getReviewsByUserId = async (id: string) => {
    try {
        const response = await axiosInstace.get(`/resenia/user/${id}`)
        if(!response.data.message){
            return response.data.reseñas;
        }
    } catch (error) {
        console.log("error en obtener reseñas")
        throw error
    }
}