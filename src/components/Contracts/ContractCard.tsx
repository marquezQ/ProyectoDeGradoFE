import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import { pdf } from "@react-pdf/renderer";
import ContractPDF from "../ContractPDF";
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import FormNewReview from "../Reviews/FormNewResenia";
import Swal from "sweetalert2";
import { deleteContract } from "../../services/workerApi";
interface Props {
  contract: ContractWithClientAndWorker;
  reload: () => void;
}

const ContractCard = ({ contract, reload }: Props) => {
  const [open, setOpen] = useState(false);
  const closeForm = () => setOpen(false);

  const [openDelete, setopenDelete] = useState(false);
  const closeDelete = () => setopenDelete(false);
  const handleViewContract = async () => {
    // Crear el PDF
    const doc = <ContractPDF contract={contract} />;
    // Generar el blob del PDF
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    
    // Abrir en nueva ventana
    const newWindow = window.open(url, '_blank');
    
    // Asegurarse de que la URL se revoque cuando la ventana se cierre
    if (newWindow) {
      newWindow.onbeforeunload = () => {
        URL.revokeObjectURL(url);
      };
    } else {
      // Si el navegador bloquea la ventana emergente, mostrar un mensaje
      alert('Por favor permite ventanas emergentes para este sitio');
      URL.revokeObjectURL(url);
    }
  };
  const canDelete = ["pendiente", "rechazado"].includes(contract.status.toLowerCase());

  const handleDelete = async () => {
    try {
      await deleteContract(contract.id);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Eliminado con éxito",
        showConfirmButton: false,
        timer: 1500,
    });
    reload();
    } catch {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrio un error:",
        showConfirmButton: false,
        timer: 1500,
    });
    }
    closeDelete();
  };
  return (
    <>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg shadow-md bg-white">
      {/* Info del contrato */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
        <div>
          <Typography variant="h6" className="text-lg font-semibold text-gray-800">
            {contract.title}
          </Typography>
          <Typography variant="body2" className="text-sm text-gray-500">
            Fecha de inicio: {new Date(contract.start_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" className="text-sm text-gray-500">
            Fecha de finalización: {new Date(contract.end_date).toLocaleDateString()}
          </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "500",
                color:
                  contract.status === "aceptado"
                    ? "green"
                    : contract.status === "pendiente"
                      ? "orange"
                      : contract.status === "rechazado"
                        ? "red"
                        : "gray",
              }}
            >
              {contract.status}
            </Typography>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button
          sx={{ minWidth: 180 }}
          variant="outlined"
          onClick={handleViewContract}
          startIcon={<PictureAsPdfIcon />}
          
        >
          Ver Contrato
        </Button>
        {contract.status.toLowerCase() === "aceptado" &&
          new Date(contract.end_date) < new Date() && (
            <Button
              sx={{ 
              minWidth: 180,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': {
                  transform: 'scale(1.2)',
                },
                '50%': {
                  transform: 'scale(1.08)',
                },
              },
               }}
              variant="contained"
              className="bg-brown-500 hover:bg-brown-600"
              startIcon={<RateReviewIcon />}
              onClick={()=>setOpen(true)}
            >
              Hacer Reseña
            </Button>
          )}
          {canDelete && 
             <Button
             onClick={() => setopenDelete(true)}
             sx={{ minWidth: 180 }}
             variant="outlined"
             startIcon={<DeleteIcon />}
           >
             Eliminar
           </Button>
          }
      </div>
    </div>
    <Dialog maxWidth="sm" fullWidth open={open} onClose={closeForm}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        Deja tu reseña
        <IconButton onClick={closeForm}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <FormNewReview contractID={contract.id} closeForm={closeForm} refreshReviews={reload}/>
    </Dialog>

    <Dialog open={openDelete} onClose={closeDelete} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          Confirmación
          <IconButton onClick={closeDelete}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que quieres eliminar esta solicitud de contrato?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDelete} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Eliminar
          </Button>
        </DialogActions>
    </Dialog>
    </>
  );
};

export default ContractCard;

