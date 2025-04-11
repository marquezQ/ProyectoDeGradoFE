import { Button, Typography } from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import { getContractsByWorkerId } from "../../services/workerApi";
import TableContracts from "./TableContracts";

interface Props{
    workerID: string
}
function ContainerWorker({workerID}: Props) {
  const { data: contractsList, loading, error, fetchData } = useFetchData<ContractWithClientAndWorker[]>({
    apiFunction: () => getContractsByWorkerId(workerID)
  });
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>ocurrio un error</p>;
  if (contractsList)
  return (
    <div>
      <div className='flex flex-col sm:flex-row justify-start sm:justify-between mb-4'>
        <Typography variant="h6" className="font-bold">
          Contratos
        </Typography>
        <Button variant='contained' size='medium' sx={{ maxWidth: "10rem" }}>Nuevo contrato</Button>
      </div>
      {contractsList.length>0?
        <TableContracts contracts={contractsList} fetchData={fetchData}/>
        :
        <p>
          Aun no tienes ningun contrato
        </p>
    }
    </div>
  )
}

export default ContainerWorker