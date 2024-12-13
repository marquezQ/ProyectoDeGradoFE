import useFetchData from "../hooks/useFetchData";
import { getWorkers } from "../services/workerApi";
import { Worker } from "../Interfaces/WorkerInterface";
import CarpinterCard from "../components/CarpinterCard";
import { Button } from "@mui/material";

function WorkersPage() {
    const { data: workerList, loading, error } = useFetchData<Worker[]>({
        apiFunction: getWorkers,
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ocurrio un error</p>;
  return (
    <>
            {workerList && workerList.map((worker) => (
                <CarpinterCard worker={worker} key={worker.user_id}/>
            ))}

          <div className="flex items-center justify-center">
              <Button variant="contained" color="primary">
                  Hola
              </Button>
              <Button variant="contained" color="secondary" className="ml-4">
                  Secundario
              </Button>
              
          </div>

      </>
  )
}

export default WorkersPage