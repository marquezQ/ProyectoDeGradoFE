import { Button } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";

interface Props {
  contract: ContractWithClientAndWorker;
}

const ContractCard = ({ contract }: Props) => {
  const statusColors: Record<string, string> = {
    aceptado: "text-green-500",
    pendiente: "text-yellow-500",
    rechazado: "text-red-500",
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
        <Button variant="outlined" size="small">Ver Contrato</Button>
        <Button variant="contained" size="small" className="bg-brown-500 hover:bg-brown-600">
          Hacer reseña
        </Button>
      </div>
    </div>
  );
};

export default ContractCard;

