import { TextField, Button, Box, Typography, IconButton, Paper, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from "yup";
import { useFormik, FieldArray, FormikProvider } from "formik";
import Swal from "sweetalert2";
import { createContract } from "../../services/workerApi";


interface Props {
  workerID: string;
  fetchContracts?: () => void;
  closeForm: () => void;
  userID: string;
}

interface ClauseItem {
  key: string;
  value: string;
}

interface ContractFormValues {
  title: string;
  startDate: string;
  endDate: string;
  clauses: ClauseItem[];
}

function FormNewContract({ workerID, fetchContracts, closeForm, userID }: Props) {
  // Fecha actual en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  // Fecha un mes después como predeterminada para la fecha de fin
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const defaultEndDate = nextMonth.toISOString().split('T')[0];
  
  const validationSchema = Yup.object({
    title: Yup.string().required("El título del contrato es obligatorio"),
    startDate: Yup.date().required("La fecha de inicio es obligatoria"),
    endDate: Yup.date()
      .required("La fecha de finalización es obligatoria")
      .min(
        Yup.ref('startDate'),
        "La fecha de finalización debe ser posterior a la fecha de inicio"
      ),
    clauses: Yup.array().of(
      Yup.object().shape({
        key: Yup.string().required("La clave de la cláusula es obligatoria"),
        value: Yup.string().required("El valor de la cláusula es obligatorio"),
      })
    ).min(1, "Debe incluir al menos una cláusula")
  });

  const formik = useFormik<ContractFormValues>({
    initialValues: {
      title: "",
      startDate: today,
      endDate: defaultEndDate,
      clauses: [{ key: "Descripcion del trabajo", value: "" },{key: "Materiales", value: ""}, {key:"Formas de pago", value: ""}]
    },
    validationSchema,
    onSubmit: async (values) => {
      // Construcción del objeto details
      const details: Record<string, string> = {};
      values.clauses.forEach(clause => {
        if (clause.key && clause.value) {
          details[clause.key] = clause.value;
        }
      });

      const contractData = {
        trabajador_id: workerID,
        user_id: userID,
        title: values.title,
        status: "pendiente",
        start_date: values.startDate,
        end_date: values.endDate,
        details: details
      };

      try {
        await createContract(contractData);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Contrato creado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
        if (fetchContracts) fetchContracts();
        closeForm();
      } catch (error) {
        console.error("Error al crear contrato:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrió un error al crear el contrato",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  // Función auxiliar para acceder de forma segura a los errores de cláusulas
  const getFieldError = (index: number, field: keyof ClauseItem): string => {
    const error = formik.errors.clauses;
    if (Array.isArray(error) && error[index] && typeof error[index] !== 'string') {
      return error[index][field] as string;
    }
    return '';
  };

  // Función auxiliar para verificar si hay error en un campo
  const hasFieldError = (index: number, field: keyof ClauseItem): boolean => {
    return !!(
      formik.touched.clauses && 
      Array.isArray(formik.touched.clauses) && 
      formik.touched.clauses[index] && 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (formik.touched.clauses[index] as any)[field] && 
      getFieldError(index, field)
    );
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 p-4">

        <TextField
          name="title"
          label="Título del Contrato"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
          <TextField
            name="startDate"
            label="Fecha de inicio"
            type="date"
            fullWidth
            value={formik.values.startDate}
            onChange={formik.handleChange}
            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
            helperText={formik.touched.startDate && formik.errors.startDate as string}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="endDate"
            label="Fecha de finalización"
            type="date"
            fullWidth
            value={formik.values.endDate}
            onChange={formik.handleChange}
            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
            helperText={formik.touched.endDate && formik.errors.endDate as string}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Cláusulas del Contrato
          </Typography>
          <Divider />

          <FieldArray
            name="clauses"
            render={arrayHelpers => (
              <Box mt={2}>
                {formik.values.clauses.map((clause, index) => (
                  <Paper key={index} elevation={1} sx={{ p: 2, mb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold">
                        Cláusula {index + 1}
                      </Typography>
                      {formik.values.clauses.length > 1 && (
                        <IconButton 
                          color="error" 
                          onClick={() => arrayHelpers.remove(index)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    <Box mt={2}>
                      <TextField
                        name={`clauses.${index}.key`}
                        label="Título de la cláusula"
                        fullWidth
                        margin="normal"
                        value={clause.key}
                        onChange={formik.handleChange}
                        error={hasFieldError(index, 'key')}
                        helperText={hasFieldError(index, 'key') ? getFieldError(index, 'key') : ''}
                      />
                      <TextField
                        name={`clauses.${index}.value`}
                        label="Descripción"
                        placeholder=""
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        value={clause.value}
                        onChange={formik.handleChange}
                        error={hasFieldError(index, 'value')}
                        helperText={hasFieldError(index, 'value') ? getFieldError(index, 'value') : ''}
                      />
                    </Box>
                  </Paper>
                ))}
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => arrayHelpers.push({ key: "", value: "" })}
                  >
                    Añadir Cláusula
                  </Button>
                </Box>
              </Box>
            )}
          />
        </Box>

        <Box display="flex" justifyContent="end" gap="0.5rem" mt={3}>
          <Button variant="outlined" onClick={closeForm}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={formik.isSubmitting}
          >
            Guardar Contrato
          </Button>
        </Box>
      </form>
    </FormikProvider>
  );
}

export default FormNewContract;
