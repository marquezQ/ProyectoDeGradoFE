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
// export async function postUser(user: object) {
//     try {
//         const response = await axios.post(`${api}/users`, user);
//         return response.data;
//     } catch (error) {
//         console.log("sucedio un error: ", error);
//     }
// }