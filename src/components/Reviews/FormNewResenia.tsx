import { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Rating,
} from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { createReview } from '../../services/workerApi';
interface Props {
    contractID: string;
    closeForm: () => void;
    refreshReviews: () => void;
}
type ReviewImages = File[];

const validationSchema = Yup.object({
  comment: Yup.string()
    .required('El comentario es obligatorio')
    .min(20, 'El comentario debe tener al menos 20 caracteres'),
  recommend: Yup.boolean().required(),
  imagen: Yup.array()
  .min(1, 'Debes subir al menos una imagen.')
  .max(3, 'Solo puedes subir un máximo de 3 imágenes.'),
  time: Yup.number()
  .moreThan(0, 'Debes calificar el tiempo.'),
quality: Yup.number()
  .moreThan(0, 'Debes calificar la calidad.'),
communication: Yup.number()
  .moreThan(0, 'Debes calificar la comunicación.'),
price: Yup.number()
  .moreThan(0, 'Debes calificar el precio.'),
});

const FormNewReview = ({contractID, closeForm, refreshReviews}: Props) => {
  const [imagen, setImagen] = useState<ReviewImages>([]);

  const formik = useFormik({
    initialValues: {
      comment: '',
      recommend: false,
      imagen: [] as ReviewImages,
      time: 0,
      quality: 0,
      communication: 0,
      price: 0,
      contrato_id: contractID,
    },
    validationSchema,
    onSubmit: async (values) => {
        const formData = new FormData();
        formData.append('comment', values.comment);
        formData.append('recommend', values.recommend ? '1' : '0');
        formData.append('time', values.time.toString());
        formData.append('quality', values.quality.toString());
        formData.append('communication', values.communication.toString());
        formData.append('price', values.price.toString());
        formData.append('contrato_id', values.contrato_id);
        
        imagen.forEach((file, index) => {
          formData.append(`imagen${index + 1}`, file); 
        });
        try {
            await createReview(formData);
            Swal.fire({
                icon: 'success',
                title: 'Reseña enviada',
                text: 'Gracias por tu opinión.',
                showConfirmButton: false,
                timer: 1500,
            });
            refreshReviews();
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar reseña',
                showConfirmButton: false,
                timer: 1500,
              });
        }
        closeForm();
    },
  });

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedFiles = Array.from(files);
    if (imagen.length + uploadedFiles.length > 3) {
      Swal.fire({
        icon: 'error',
        title: 'Límite de imágenes alcanzado',
        text: 'Solo puedes subir un máximo de 3 imágenes.',
      });
      return;
    }

    setImagen([...imagen, ...uploadedFiles]);
    formik.setFieldValue('imagen', [...imagen, ...uploadedFiles]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImagen = imagen.filter((_, i) => i !== index);
    setImagen(updatedImagen);
    formik.setFieldValue('imagen', updatedImagen);
  };

  const calculateAverage = () => {
    const { time, quality, communication, price } = formik.values;
    return (time + quality + communication + price) / 4;
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 bg-white shadow-lg rounded-lg p-6 w-full"
      >
        <TextField
          label="Comentario"
          name="comment"
          multiline
          rows={4}
          fullWidth
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
          helperText={formik.touched.comment && formik.errors.comment}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formik.values.recommend}
              onChange={formik.handleChange}
              name="recommend"
              color="primary"
            />
          }
          label="¿Recomienda al trabajador?"
        />

        {/* Valoraciones */}
              <Box display="flex" flexDirection="column" gap={2}>
                  {([
                      { key: 'time', label: 'Tiempo' },
                      { key: 'quality', label: 'Calidad' },
                      { key: 'communication', label: 'Comunicación' },
                      { key: 'price', label: 'Precio' },
                  ] as const).map(({ key, label }) => (
                    <Box key={key} display="flex" flexDirection="column" gap={0.5}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography>{label}:</Typography>
                      <Rating
                        name={key}
                        value={formik.values[key]}
                        onChange={(_, value) => formik.setFieldValue(key, value)}
                      />
                    </Box>
                    {formik.touched[key] && formik.errors[key] && (
                      <Typography color="error" variant="body2">
                        {formik.errors[key]}
                      </Typography>
                    )}
                  </Box>
                  ))}
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography>Calificación Final:</Typography>
                      <Rating value={calculateAverage()} precision={0.5} readOnly />
                  </Box>
              </Box>


        {/* Carga de Imágenes */}
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {imagen.map((imagen, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  width: 100,
                  height: 100,
                  borderRadius: '10%',
                  border: '1px solid #ccc',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={URL.createObjectURL(imagen)}
                  alt={`Imagen ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <HighlightOffOutlinedIcon
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': { color: 'gray' },
                  }}
                  onClick={() => handleRemoveImage(index)}
                />
              </Box>
            ))}
          </Box>
                  {formik.touched.imagen && formik.errors.imagen && typeof formik.errors.imagen === 'string' && (
                      <Typography color="error" variant="body2">
                          {formik.errors.imagen}
                      </Typography>
                  )}

          <Button
            variant="contained"
            component="label"
            color="primary"
            disabled={imagen.length >= 3}
          >
            Subir Imágenes
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleImageUpload}
            />
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Enviar Reseña
        </Button>
      </form>
    </div>
  );
};

export default FormNewReview;
