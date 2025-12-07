import { createContext, ReactNode, useEffect, useState } from "react";
import { AuthInterface } from "../Interfaces/AuthInterface";
import { User } from "../Interfaces/UserInterface";
import { getUserData } from "../services/api";
import { Worker } from "../Interfaces/WorkerInterface";
import { isWorker } from "../services/workerApi";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthInterface | undefined>(undefined);


interface PropsContextProvider {
    children: ReactNode
  }
export const AuthContextProvider = ({ children }: PropsContextProvider) => {
  const [user, setUser] = useState<User>();
  const [worker, setWorker] = useState<Worker>();
  const [loading, setLoading] = useState(true);

  const LogOut = () => {
    setUser(undefined);
    setWorker(undefined);
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      if (token) {
        try {
          const data = await getUserData();
          setUser(data);

          if (data) {
            const dataCarpenter = await isWorker(data.id);
            setWorker(dataCarpenter);
          }
        } catch (e) {
          console.error(e);
          LogOut();
        }
      }
      setLoading(false); // <<< evita el flicker
    };

    fetchData();
  }, []);

  // Mientras carga, no renderices toda la app (evita el flicker)
  if (loading) {
    return <div></div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, LogOut, worker, setWorker, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
