import { axiosInstace } from "./axiosInstace";

export const getWorkers = async () => {
    try {
        const response = await axiosInstace.get('/trabajador');
        // console.log(response);
        return response.data.trabajadors
    } catch (error) {
        console.log("sucedio un error: ", error);
        throw error;
    }
}

export const registerWorker = async (worker: object) => {
    try {
        const response = await axiosInstace.post('/trabajador', worker)
        return response.data
    } catch (error) {
        console.log("error al registrar trabajador", error);
        throw error;
    }
}