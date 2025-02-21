import useFetchData from "../../hooks/useFetchData";
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import { getContractsByWorkerId } from "../../services/workerApi";

interface Props{
    workerID: string
}
function ContainerWorker({workerID}: Props) {
  const { data: contractsList, loading, error } = useFetchData<ContractWithClientAndWorker[]>({
    apiFunction: () => getContractsByWorkerId(workerID)
  });
  console.log(contractsList)
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>ocurrio un error</p>;
  if (contractsList?.length === 0) return <p>Aun no tienes ningun contrato</p>
  if (contractsList)
  return (
    <div>aqui debera mostrarse TODOS los contratos del worker con ID: {workerID}</div>
  )
}

export default ContainerWorker