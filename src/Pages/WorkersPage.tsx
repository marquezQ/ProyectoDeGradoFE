import useFetchData from "../hooks/useFetchData";
import { getWorkers } from "../services/api";
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
    <div>
            {workerList && workerList.map((worker) => (
                <div key={worker.id}>
                    <h3>{worker.user_id}</h3>
                    <p>Location: {worker.latitud}</p>
                    {/* <p>{worker.user.name}</p> */}
                </div>
            ))}
          <CarpinterCard />
          <CarpinterCard />
          <div className="flex items-center justify-center">
              <Button variant="contained" color="primary">
                  Hola
              </Button>
              <Button variant="contained" color="secondary" className="ml-4">
                  Secundario
              </Button>
              
          </div>

      </div>
  )
}

export default WorkersPage