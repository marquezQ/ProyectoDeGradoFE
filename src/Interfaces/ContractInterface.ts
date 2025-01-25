import { User } from "./UserInterface";

export interface Contract {
    id: string, 
    trabajador_id: string,
    user_id: string,
    start_date: string,
    end_date: string,
    details: string,
} 

export type ContractWithUser = Contract & {
    user: User
}