import { Button, Dialog, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContractCard from "./ContractCard";
import useFetchData from "../../hooks/useFetchData";
import { getContractsByWorkerAndClient } from "../../services/workerApi";
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import { useState } from "react";
import FormContract from "./FormContract";

interface Props{
    workerID: string,
    clientID: string
}

function ContainerClient({workerID, clientID}: Props) {
  const [open, setOpen] = useState(false);
  const closeForm = () => setOpen(false);
    const { data: contractsList, loading, error, fetchData } = useFetchData<ContractWithClientAndWorker[]>({
      apiFunction: () => getContractsByWorkerAndClient(workerID, clientID)
    });
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>ocurrio un error</p>;
    // if (contractsList?.length === 0) return <p>Aun no tienes contratos con este carpintero</p>
    if (contractsList)
        return (
          <div className="p-4 space-y-6">
            <div className='flex flex-col sm:flex-row justify-start sm:justify-between'>
              <Typography variant="h6" className="font-bold">
                Tus contratos con este carpintero
              </Typography>
              <Button variant='contained' size='medium' sx={{maxWidth:"18rem"}} 
                      onClick={()=>setOpen(true)}>
                        Solicitar nuevo contrato
              </Button>
            </div>
            {contractsList.length>0?
            contractsList.map((contract, index) => (
              <div key={index}>
                <ContractCard contract={contract}/>
              </div>
            )):
            <p>No existen contratos realizados con este carpintero</p>}
            
            <Dialog maxWidth="lg" fullWidth open={open} onClose={closeForm}>
              <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
                Solicitud de contrato
                <IconButton onClick={closeForm}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <FormContract closeForm={closeForm} userID={clientID} workerID={workerID} fetchContracts={fetchData} validate={false}/>
            </Dialog>
          </div>
        );
}

export default ContainerClient