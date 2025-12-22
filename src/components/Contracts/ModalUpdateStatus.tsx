import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ContractWithClientAndWorker } from "../../Interfaces/ContractInterface";
import Swal from "sweetalert2";
import { updateStatuscontract } from "../../services/workerApi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";


interface Props {
  contract: ContractWithClientAndWorker;
  status: string;
  closeModal: () => void;
  refreshContracts: () => void;
}

function ModalUpdateStatus({
  contract,
  status,
  closeModal,
  refreshContracts,
}: Props) {
  
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await updateStatuscontract(
      {
        status: status,
        reason: values.reason, // siempre enviado
      },
      contract.id
      );


      Swal.fire({
        position: "center",
        icon: "success",
        title: status === "aceptado" ? "Contrato aceptado" : "Contrato rechazado",
        showConfirmButton: false,
        timer: 1500,
      });

      refreshContracts();
      closeModal();
    } catch  {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ocurrió un error",
        showConfirmButton: false,
        timer: 1500,
      });
    }finally {
    setLoading(false);
  }
  };

  // ========== ACEPTADO =============
  if (status === "aceptado") {
    return (
      <>
        <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1301 }}>
          <CircularProgress color="primary" />
        </Backdrop>
        <DialogTitle>Confirmar Contrato</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Esta seguro que acepta el contrato? Este ya no será modificable.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} variant="outlined">Cancelar</Button>
          <Button onClick={() => handleSubmit({})} variant="contained">
            Aceptar
          </Button>
        </DialogActions>
      </>
    );
  }

  // ========== RECHAZADO (CON FORM) =============
  return (
    <Formik
      initialValues={{ reason: "" }}
      validationSchema={Yup.object({
        reason: Yup.string()
          .required("El motivo es obligatorio")
          .min(10, "El motivo debe tener al menos 10 caracteres"),
      })}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1301 }}>
            <CircularProgress color="primary" />
          </Backdrop>
          <DialogTitle>Confirmar rechazo</DialogTitle>

          <DialogContent className="space-y-4">
            <Typography>
              ¿Está seguro que quiere rechazar el contrato?
            </Typography>

            <TextField
              name="reason"
              label="Motivo del rechazo"
              fullWidth
              multiline
              minRows={3}
              value={values.reason}
              onChange={handleChange}
              error={touched.reason && Boolean(errors.reason)}
              helperText={touched.reason && errors.reason}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal} variant="outlined">Cancelar</Button>
            <Button type="submit" variant="contained">Rechazar</Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}

export default ModalUpdateStatus;
