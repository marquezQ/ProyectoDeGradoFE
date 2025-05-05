import useFetchData from "../hooks/useFetchData";
import { getWorkers } from "../services/workerApi";
import { Worker } from "../Interfaces/WorkerInterface";
import CarpinterCard from "../components/CarpinterCard";

function WorkersPage() {
    const { data: workerList, loading, error } = useFetchData<Worker[]>({
        apiFunction: getWorkers,
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ocurrio un error</p>;
  return (
    <>
    <div className="mx-auto max-w-screen-xl p-4 sm:pt-14 space-y-8 sm:space-y-14">
            {workerList && workerList.map((worker) => (
                <CarpinterCard worker={worker} key={worker.user_id}/>
            ))}
    </div>
      </>
  )
}

export default WorkersPage