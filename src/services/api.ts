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
// export async function postUser(user: object) {
//     try {
//         const response = await axios.post(`${api}/users`, user);
//         return response.data;
//     } catch (error) {
//         console.log("sucedio un error: ", error);
//     }
// }