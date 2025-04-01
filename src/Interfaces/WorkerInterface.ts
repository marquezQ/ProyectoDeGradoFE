import { User } from "./UserInterface";

export interface Worker {
    id: string,
    user_id: string,
    description: string,
    workshop: string,
    latitud: string,
    longitud: string,
    address: string,
    images: WorkerImages,
    totalReviews: string,
    averageRating: number,
    // created_at: string,
    // updated_at: string,
    user: User
}

export interface WorkerImages {
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
}