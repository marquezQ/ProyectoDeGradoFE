import { User } from "./UserInterface";

export interface Worker {
    id: string,
    user_id: string,
    description: string,
    latitud: string,
    longitud: string,
    images: object,
    // created_at: string,
    // updated_at: string,
    user: User
}