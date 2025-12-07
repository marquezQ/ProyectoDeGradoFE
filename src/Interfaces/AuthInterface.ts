import { User } from "./UserInterface";
import { Worker } from "./WorkerInterface";

export interface AuthInterface {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    LogOut: () => void;
    worker: Worker | undefined;
    setWorker: React.Dispatch<React.SetStateAction<Worker | undefined>>;
    loading: boolean;
}