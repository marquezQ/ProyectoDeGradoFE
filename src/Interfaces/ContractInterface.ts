import { User } from "./UserInterface";

export interface Contract {
    id: string, 
    trabajador_id: string,
    user_id: string,
    title: string,
    status: string,
    start_date: string,
    end_date: string,
    details: string,
} 

export type ContractWithUser = Contract & {
    user: User
}

export type ContractWithClientAndWorker = ContractWithUser & {
    worker: Worker
}
//revisar creo que no es necesario el &