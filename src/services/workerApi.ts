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
export const updateInfoWorker = async (worker: object, id: string) => {
    try {
        const response = await axiosInstace.patch(`/trabajador/${id}/info`, worker)
        return response.data
    } catch (error) {
        console.log("error al editar info trabajador", error);
        throw error;
    }
}
export const updateImagesWorker = async (worker: object, id: string) => {
    try {
        const response = await axiosInstace.post(`/trabajador/${id}/images`, worker)
        return response.data
    } catch (error) {
        console.log("error al editar imagenes trabajador", error);
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

export const getWorkerProducts = async (id: string) => {
    try {
        const response = await axiosInstace.get(`/productos/${id}`)
        if(!response.data.error){
            return response.data.products;
        }
    } catch (error) {
        console.log("error al obtener productos")
        throw error;
    }
}

export const createProduct = async (product: object) => {
    try {
        const response = await axiosInstace.post(`/productos`, product)
        if(response.data.product){
            return response.data.product
        }
    } catch (error) {
        console.log("error al crear producto")
        throw error
    }
}
export const updateProduct = async (product: object, id: string) => {
    try {
        const response = await axiosInstace.post(`/productos/${id}`, product)
        if(response.data,product){
            return response.data.product
        }
    } catch (error) {
        console.log('error al actualizar')
        throw error
    }
}
export const deleteProduct = async (id: string) => {
    try {
        const response = await axiosInstace.delete(`/productos/${id}`);
        if (response.data.status === 200) {
            return true;
        }
    } catch (error) {
        console.log("Error al eliminar producto");
        throw error;
    }
}


export const getReviewsByWorkerId = async (id: string) => {
    try {
        const response = await axiosInstace.get(`/resenia/trabajador/${id}`)
        if(!response.data.message){
            return response.data.reseñas;
        }
    } catch (error) {
        console.log("error en obtener reseñas")
        throw error
    }
}

export const createReview = async (resenia: object) => {
    try {
        const response = await axiosInstace.post(`/resenia`, resenia);
        if(!response.data.message){
            return response.data.reseña
        }
    } catch (error) {
        console.log("error al crear reseña")
        throw error
    }
}

export const getContractsByWorkerId = async (id: string) => {
    try {
        const response = await axiosInstace.get(`/contrato/${id}`)
        if(!response.data.message){
            return response.data.contratos;
        }
    } catch (error) {
        console.log("error al obtener contratos del carpintero: "+id)
        throw error
    }
}

export const getContractsByWorkerAndClient = async (workerID: string, clientID: string) => {
    try {
        const response = await axiosInstace.get(`/contrato/${workerID}/${clientID}`)
        if(!response.data.message){
            return response.data.contratos;
        }
    } catch (error) {
        console.log("error al obtener contratos del carpintero y cliente")
        throw error
    }
}

export const createContract = async (contract: object) => {
    try {
        const response = await axiosInstace.post(`/contrato`, contract)
        if(response.data.message){
            return response.data.contrato
        }
    } catch (error){
        console.log("error al crear contrato")
        throw error
    }
}

export const updateContract = async (contract: object, id: string) => {
    try {
        const response = await axiosInstace.put(`/contrato/${id}`, contract)
        if(!response.data.message){
            return response.data.product
        }
    } catch (error) {
        console.log('error al actualizar')
        throw error
    }
}

export const updateStatuscontract = async (body: object, id: string) => {
    try {
        const response = await axiosInstace.patch(`/contrato/${id}/status`, body)
        if(!response.data.message){
            return response.data.contract
        }
    } catch (error) {
        console.log('error al actualizar status')
        throw error
    }
}

export const deleteContract = async (id: string) => {
    try {
        const response = await axiosInstace.delete(`/contrato/${id}`);
        if(response.data.status === 200){
            return true
        }
    } catch (error) {
        console.log("error al eliminar contrato");
        throw error
    }
}