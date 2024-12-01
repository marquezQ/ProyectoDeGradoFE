import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthInterface } from "../Interfaces/AuthInterface";
import { User } from "../Interfaces/UserInterface";
import { getUserData } from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthInterface | undefined>(undefined);


interface PropsContextProvider {
    children: ReactNode
  }
export const AuthContextProvider = ( {children}: PropsContextProvider ) => {
    const [user, setUser] = useState<User>()
    const LogOut = () => {
        setUser(undefined);
        localStorage.removeItem("token");
        window.location.reload();
        // localStorage.removeItem("roles");
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
          const fetchData = async () => {
            const data = await getUserData();
            setUser(data);
          }
          fetchData();
        }
    }, []);

    //console.log("Estado del AuthContext: ", user);

    return (
      <AuthContext.Provider value={{ user, setUser, LogOut }}>
        {children}
      </AuthContext.Provider>
    );
}