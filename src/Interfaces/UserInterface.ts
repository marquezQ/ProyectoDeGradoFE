export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    phone_number: string;
    profile_picture: string;
    email_verified: boolean;
    created_at: string;
    updated_at: string; // Formato ISO 8601
}