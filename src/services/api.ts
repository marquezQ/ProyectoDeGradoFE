import axios from "axios";
const api = 'http://localhost:8000/api'
export const getWorkers = async () => {
    try {
        const response = await axios.get(`${api}/trabajador`);
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