import { 
  Button, 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Avatar
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { ChangeEvent, useMemo, useState } from "react";
import { Worker } from "../../Interfaces/WorkerInterface";
import { updateImagesWorker } from "../../services/workerApi";

interface ImageEditFormProps {
  worker: Worker;
  closeForm: () => void;
}

interface FormValues {
  images: Record<string, File | string>;
}

export default function ImageEditForm({ worker, closeForm }: ImageEditFormProps) {
  // 1. Memoize initial images
  const initialImages = useMemo(() => ({
    image1: worker.images.image1 || '',
    image2: worker.images.image2 || '',
    image3: worker.images.image3 || '',
    image4: worker.images.image4 || '',
    image5: worker.images.image5 || '',
  }), [worker.images]);

  // 2. State for preview URLs
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  const formik = useFormik<FormValues>({
    initialValues: {
      images: { ...initialImages }
    },
    validationSchema: Yup.object({
      images: Yup.object().test(
        'at-least-one-image',
        'Debes mantener al menos una imagen.',
        (value) => Object.values(value).some(img => img !== '')
      )
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      
      Object.entries(values.images).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        }
      });

      try {
        await updateImagesWorker(formData, worker.id);
        
        // 3. Liberar URLs creadas
        Object.values(previewUrls).forEach(URL.revokeObjectURL);
        
        // 4. Swal no bloqueante
        setTimeout(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Imágenes actualizadas",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 0);
        
        closeForm();
      } catch (error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al actualizar",
          showConfirmButton: true,
        });
        console.error(error);
      }
    },
  });

  // 5. Optimizar el manejo de imágenes
  const handleImageReplace = (imageKey: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Liberar URL anterior si existe
    if (previewUrls[imageKey]) {
      URL.revokeObjectURL(previewUrls[imageKey]);
    }

    // Crear nueva URL y actualizar estados
    const newUrl = URL.createObjectURL(file);
    setPreviewUrls(prev => ({ ...prev, [imageKey]: newUrl }));
    formik.setFieldValue(`images.${imageKey}`, file);
  };

  // 6. Componente memoizado para filas
  const renderRow = ([key, value]: [string, File | string], index: number) => (
    <TableRow key={key} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        {value ? (
          <Box sx={{ width: 150, height: 150 }}> {/* Reducido de 180px */}
            <Avatar
              variant="rounded"
              src={typeof value === 'string' ? value : previewUrls[key]}
              sx={{ 
                width: '100%', 
                height: '100%',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
          </Box>
        ) : (
          <Box sx={{ 
            width: 150, 
            height: 150,
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '1px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5'
          }}>
            <Typography variant="body2" className="text-gray-500">
              Sin imagen
            </Typography>
          </Box>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          component="label"
          color="primary"
          size="small"
        >
          Reemplazar
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleImageReplace(key, e)}
          />
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <Box 
      component="form" 
      onSubmit={formik.handleSubmit}
      className="p-4 md:p-6 bg-white rounded-lg shadow-md"
    >
      <Typography variant="body1" className="mb-4 text-gray-600">
        Puedes reemplazar cada imagen individualmente. Máximo 5 imágenes.
      </Typography>
      

      <TableContainer component={Paper} className="mb-6">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold">#</TableCell>
              <TableCell className="font-bold">Imagen Actual</TableCell>
              <TableCell className="font-bold">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(formik.values.images).map(renderRow)}
          </TableBody>
        </Table>
      </TableContainer>

      {formik.errors.images && (
        <Typography color="error" className="mb-4">
          {typeof formik.errors.images === 'string' 
            ? formik.errors.images 
            : 'Error en las imágenes'}
        </Typography>
      )}

      <Box className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outlined" 
          onClick={closeForm}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={formik.isSubmitting}
        >
          Guardar Cambios
        </Button>
      </Box>
    </Box>
  );
}