import { User } from "./UserInterface";

export interface AuthInterface {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    LogOut: () => void;
}