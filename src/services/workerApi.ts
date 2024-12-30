import axios from "axios";
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

export const isWorker = async (id: number) => {
    try {
        const response = await axiosInstace.get(`/userTrabajador/${id}`);
        if(!response.data.message){
            return response.data;
        }
    } catch (error) {
        console.log("no se supo si es trabajador");
        throw error;
    }
}

export const getWorkerData = async (id: string) => {
    try {
        const response = await axiosInstace.get(`/trabajador/${id}`)
        if(!response.data.message){
            return response.data.trabajador
        }
    } catch (error) {
        console.log("error al obtener al trabajador")
        throw error;
    }
}

export const addressWorker = async (lat: string, lon: string) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        if(!response.data.error){
            return response.data.address
        }
    } catch (error) {
        console.log("error al obtener direccion");
        throw error
    }
}