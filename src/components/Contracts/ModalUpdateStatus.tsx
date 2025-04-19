import { Button, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface"
import Swal from "sweetalert2";
import { updateStatuscontract } from "../../services/workerApi";

interface Props {
    contract: ContractWithClientAndWorker;
    status: string;
    closeModal: () => void;
    refreshContracts: () => void;
}
function ModalUpdateStatus({contract, status, closeModal, refreshContracts}: Props) {

    const onSubmitStatus = async () => {
        try{
            await updateStatuscontract({status: status}, contract.id)
            if(status === "aceptado"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Contrato aceptado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            if(status === "rechazado"){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Contrato rechazado",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            refreshContracts();
            closeModal();
        } catch {
            closeModal();
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Ocurrió un error: ",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    if(status === "aceptado"){
        return (
            <>
                <DialogTitle>Confirmar Contrato</DialogTitle>
                <DialogContent>
                  <Typography>¿Esta seguro que acepta el contrato? Este ya no sera modificable</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeModal} variant="outlined">
                    Cancelar
                  </Button>
                  <Button onClick={onSubmitStatus} variant="contained">
                    Aceptar
                  </Button>
                </DialogActions>
            </>
        )
    }
    if(status === "rechazado"){
        return (
            <>
                <DialogTitle>Confirmar rechazo</DialogTitle>
                <DialogContent>
                  <Typography>¿Esta seguro que quiere rechazar el contrato?</Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeModal} variant="outlined">
                    Cancelar
                  </Button>
                  <Button onClick={onSubmitStatus} variant="contained">
                    Aceptar
                  </Button>
                </DialogActions>
            </>
        )
    }
  
}

export default ModalUpdateStatus