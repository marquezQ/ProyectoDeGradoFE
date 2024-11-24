import useFetchData from "../hooks/useFetchData";
import { getWorkers } from "../services/api";
import { Worker } from "../Interfaces/WorkerInterface";

function WorkersPage() {
    const { data: workerList, loading, error } = useFetchData<Worker[]>({
        apiFunction: getWorkers,
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ocurrio un error</p>;
    console.log(workerList)
  return (
    <div>
            {workerList && workerList.map((worker) => (
                <div key={worker.id}>
                    <h3>{worker.user_id}</h3>
                    <p>Location: {worker.latitud}</p>
                    {/* <p>{worker.user.name}</p> */}
                </div>
            ))}
        </div>
  )
}

export default WorkersPage