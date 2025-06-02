import { Typography } from "@mui/material";
import useFetchData from "../../hooks/useFetchData";
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import { getContractsByWorkerId } from "../../services/workerApi";
import TableContracts from "./TableContracts";
import { ErrorMessage, SkeletonTable } from "../Skeleton/Skeleton";

interface Props{
    workerID: string
}
function ContainerWorker({workerID}: Props) {
  const { data: contractsList, loading, error, fetchData } = useFetchData<ContractWithClientAndWorker[]>({
    apiFunction: () => getContractsByWorkerId(workerID)
  });
  if (loading) return <SkeletonTable/>;
  if (error) return <ErrorMessage/>;
  if (contractsList)
  return (
    <div>
      {contractsList.length>0?
        <TableContracts contracts={contractsList} fetchData={fetchData}/>
        :
        <Typography>
          Aun no tienes ningun contrato
        </Typography>
    }
    </div>
  )
}

export default ContainerWorker