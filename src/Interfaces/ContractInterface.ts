import { User } from "./UserInterface";
import { Worker } from "./WorkerInterface";
export interface Contract {
    id: string, 
    trabajador_id: string,
    user_id: string,
    title: string,
    status: string,
    start_date: string,
    end_date: string,
    details: string,
    created_at: string
} 

export type ContractWithUser = Contract & {
    user: User
}

export type ContractWithClientAndWorker = ContractWithUser & {
    trabajador: Worker
}
//revisar creo que no es necesario el &