import { Button, Dialog, DialogTitle, IconButton } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import { pdf } from "@react-pdf/renderer";
import ContractPDF from "../ContractPDF";
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import FormNewResenia from "../Resenias/FormNewResenia";
interface Props {
  contract: ContractWithClientAndWorker;
}

const ContractCard = ({ contract }: Props) => {
  const [open, setOpen] = useState(false);
  const closeForm = () => setOpen(false);
  const statusColors: Record<string, string> = {
    aceptado: "text-green-500",
    pendiente: "text-yellow-500",
    rechazado: "text-red-500",
  };
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
  const canDelete =
    ["pendiente", "rechazado"].includes(contract.status.toLowerCase());
  return (
    <>
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg shadow-md bg-white max-w-5xl mx-auto">
      {/* Info del contrato */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">            {contract.title}
            </h3>
          <p className="text-sm text-gray-500">Fecha de inicio: {new Date(contract.start_date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Fecha de finalización: {new Date(contract.end_date).toLocaleDateString()}</p>

          <p className={`font-medium ${statusColors[contract.status.toLowerCase()] || "text-gray-500"}`}>
            {contract.status}
          </p>
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
      <FormNewResenia contractID={contract.id} closeForm={closeForm}/>
    </Dialog>
    </>
  );
};

export default ContractCard;

