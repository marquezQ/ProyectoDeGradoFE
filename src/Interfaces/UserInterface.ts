export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone_number: string;
    profile_picture: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string; // Formato ISO 8601
}