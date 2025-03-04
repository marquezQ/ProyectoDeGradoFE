
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Box } from "@mui/material";
import { Visibility, CheckCircle, Cancel } from "@mui/icons-material";
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";

interface Props {
  contracts: ContractWithClientAndWorker[]
}

const getChipColor = (estado: string) => {
  switch (estado) {
    case "pendiente":
      return "warning";
    case "aceptado":
      return "success";
    case "en Progreso":
      return "primary";
    default:
      return "default";
  }
};

const TablaTrabajos = ({contracts}: Props) => {
  console.log(contracts)
  return (
    <TableContainer component={Paper} className="p-4 overflow-x-auto w-full">
      <Table>
        <TableHead>
          <TableRow className="bg-gray-200">
            <TableCell>Cliente</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo de Trabajo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract, index) => (
            <TableRow key={index}>
              <TableCell>{contract.user.name+" "+contract.user.lastname}</TableCell>
              <TableCell>{contract.start_date}</TableCell>
              <TableCell>{contract.title}</TableCell>
              <TableCell>
                <Chip label={contract.status} color={getChipColor(contract.status)} className="!min-w-24" />
              </TableCell>
              <TableCell>
                <Box className="flex flex-wrap gap-2">
                  <Button variant="outlined" startIcon={<Visibility />} size="small" className="!min-w-32">
                    Ver Contrato
                  </Button>
                  {contract.status === "pendiente" && (
                    <>
                      <Button variant="contained" color="success" startIcon={<CheckCircle />} size="small" className="!min-w-32">
                        Aceptar
                      </Button>
                      <Button variant="contained" color="error" startIcon={<Cancel />} size="small" className="!min-w-32">
                        Rechazar
                      </Button>
                    </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaTrabajos;
