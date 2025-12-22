import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  TextField,
  Chip,
  Rating,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllReseñas, deleteReseña } from '../services/admin';
import useFetchData from '../hooks/useFetchData';
import { Review } from '../Interfaces/ReviewInterface';
import { ErrorMessage } from '../components/Skeleton/Skeleton';
import Swal from 'sweetalert2';

function AdminReseñas() {
  const { data: reseñas, loading, error, fetchData } = useFetchData<Review[]>({
    apiFunction: getAllReseñas,
  });

  const [filteredReseñas, setFilteredReseñas] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (reseñas) {
      const filtered = reseñas.filter(
        (res) =>
          res.contrato.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.contrato.user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.contrato.trabajador.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReseñas(filtered);
    }
  }, [searchTerm, reseñas]);

  const handleDeleteClick = async (reseña: Review) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: 'Vas a eliminar esta reseña.<br>Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteReseña(reseña.id);
        await fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Reseña eliminada correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar la reseña',
        });
      }
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error || !reseñas) return <ErrorMessage />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Reseñas
        </Typography>
        <TextField
          placeholder="Buscar reseñas..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredReseñas.length > 0 ? (
          filteredReseñas.map((reseña) => (
            <Grid item xs={12} md={6} key={reseña.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={reseña.contrato.user.profile_picture} />
                      <Box>
                        <Typography fontWeight="bold">
                          {reseña.contrato.user.name} {reseña.contrato.user.lastname}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {reseña.contrato.user.email}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(reseña)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="caption" color="textSecondary">
                      Para el carpintero:
                    </Typography>
                    <Typography fontWeight="bold">
                      {reseña.contrato.trabajador.user.name}{' '}
                      {reseña.contrato.trabajador.user.lastname}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Rating 
                      value={reseña.calificacion?.final || 0} 
                      readOnly 
                      size="small" 
                      precision={0.5}
                    />
                    <Typography variant="body2">
                      ({reseña.calificacion?.final?.toFixed(1) || 'N/A'})
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {reseña.comment}
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip
                      label={reseña.recommend ? 'Recomienda' : 'No recomienda'}
                      color={reseña.recommend ? 'success' : 'error'}
                      size="small"
                    />
                    <Typography variant="caption" color="textSecondary">
                      {new Date(reseña.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography textAlign="center" color="textSecondary">
              No se encontraron reseñas
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default AdminReseñas;