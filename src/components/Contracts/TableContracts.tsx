
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import { Visibility, CheckCircle, Cancel } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import FormContract from "./FormContract";
import { useState } from "react";


interface Props {
  contracts: ContractWithClientAndWorker[]
  fetchData: () => void
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

const TablaTrabajos = ({contracts, fetchData}: Props) => {
  const [open, setOpen] = useState(false);
  const closeForm = () => setOpen(false);
  const [currentContract, setCurrentContract] = useState<ContractWithClientAndWorker>(contracts[0])
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
                  <Button onClick={() => {setOpen(true); setCurrentContract(contract)}} variant="outlined" startIcon={<Visibility />} size="small" className="!min-w-32">
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

      <Dialog maxWidth="lg" fullWidth open={open} onClose={closeForm}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
          Solicitud de contrato
          <IconButton onClick={closeForm}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <FormContract closeForm={closeForm}
          userID={currentContract.user_id}
          workerID={currentContract.trabajador_id}
          fetchContracts={fetchData}
          validate={true}
          contract={currentContract} />
      </Dialog>
    </TableContainer>
  );
};

export default TablaTrabajos;
