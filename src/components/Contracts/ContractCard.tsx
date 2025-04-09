import { Button } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import { pdf } from "@react-pdf/renderer";
import ContractPDF from "../ContractPDF";

interface Props {
  contract: ContractWithClientAndWorker;
}

const ContractCard = ({ contract }: Props) => {
  const statusColors: Record<string, string> = {
    aceptado: "text-green-500",
    pendiente: "text-yellow-500",
    rechazado: "text-red-500",
  };
  const handleViewContract = async () => {
    // Crear el PDF
    const doc = <ContractPDF contract={contract} />;
    console.log(contract)
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

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center space-x-3">
        <PictureAsPdfIcon fontSize="large" className="text-brown-500" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{contract.title}</h3>
          <p className="text-sm text-gray-600">Haz clic para ver el contrato</p>
          <p className={`font-medium ${statusColors[contract.status.toLowerCase()] || "text-gray-500"}`}>
            {contract.status}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button variant="outlined" size="small"  onClick={handleViewContract}>Ver Contrato</Button>
        <Button variant="contained" size="small" className="bg-brown-500 hover:bg-brown-600">
          Hacer reseña
        </Button>
      </div>
    </div>
  );
};

export default ContractCard;

