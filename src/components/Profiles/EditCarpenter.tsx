import {
  Button,
  Box,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Worker } from "../../Interfaces/WorkerInterface";
// import { useNavigate } from "react-router-dom";
import MapWithLocationEdit from "../maps/editMap";
import { updateInfoWorker } from "../../services/workerApi";
import { useState } from "react";


// Define props
interface EditCarpenterPageProps {
  worker: Worker;
  closeModal: () => void;
  reload: () => void;
}

// Yup validation schema
const validationSchema = Yup.object({
  description: Yup.string().required("La descripción es obligatoria"),
  workshop: Yup.string().required("El nombre del taller es obligatorio"),
  latitud: Yup.string().required("La latitud es obligatoria"),
  longitud: Yup.string().required("La longitud es obligatoria"),
  address: Yup.string().required("La dirección es obligatoria"),
});

function EditCarpenter({ worker, closeModal, reload }: EditCarpenterPageProps) {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      description: worker.description,
      workshop: worker.workshop,
      latitud: worker.latitud,
      longitud: worker.longitud,
      address: worker.address || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await updateInfoWorker(values, worker.id);
        closeModal();
        reload();
        await Swal.fire({
          position: "center",
          icon: "success",
          title: "Actualización exitosa",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error al actualizar",
          showConfirmButton: true,
        });
        console.log(error)
      }finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box p={3}>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 1301 }}>
        <CircularProgress color="primary" />
      </Backdrop>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Especialidad o nombre de tu taller"
          name="workshop"
          value={formik.values.workshop}
          onChange={formik.handleChange}
          error={formik.touched.workshop && Boolean(formik.errors.workshop)}
          helperText={formik.touched.workshop && formik.errors.workshop}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Descripción"
          name="description"
          multiline
          minRows={3}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Dirección"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <MapWithLocationEdit
          defaultLat={parseFloat(formik.values.latitud)}
          defaultLng={parseFloat(formik.values.longitud)}
          onLocationSelect={(lat, lng) => {
            formik.setFieldValue("latitud", lat);
            formik.setFieldValue("longitud", lng);
          }}
        />

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={closeModal}>Cancelar</Button>
          <Button variant="contained" color="primary" type="submit">
            Guardar Cambios
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditCarpenter;