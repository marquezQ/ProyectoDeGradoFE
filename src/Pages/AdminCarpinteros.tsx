import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAllCarpinteros, deleteCarpintero } from '../services/admin';
import { Link } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import { Worker } from '../Interfaces/WorkerInterface';
import { ErrorMessage } from '../components/Skeleton/Skeleton';
import Swal from 'sweetalert2';

function AdminCarpinteros() {
  const { data: carpinteros, loading, error, fetchData } = useFetchData<Worker[]>({
    apiFunction: getAllCarpinteros,
  });

  const [filteredCarpinteros, setFilteredCarpinteros] = useState<Worker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (carpinteros) {
      const filtered = carpinteros.filter(
        (carp) =>
          carp.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          carp.user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          carp.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          carp.workshop.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCarpinteros(filtered);
    }
  }, [searchTerm, carpinteros]);

  const handleDeleteClick = async (carpintero: Worker) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `Vas a eliminar al carpintero <strong>${carpintero.user.name} ${carpintero.user.lastname}</strong><br>Esta acción eliminará también todos sus productos y contratos asociados.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteCarpintero(carpintero.id);
        await fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Carpintero eliminado correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch  {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el carpintero',
        });
      }
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error || !carpinteros) return <ErrorMessage />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Carpinteros
        </Typography>
        <TextField
          placeholder="Buscar carpinteros..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Carpintero</TableCell>
              <TableCell>Taller</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCarpinteros.map((carpintero) => (
              <TableRow key={carpintero.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={carpintero.user.profile_picture} />
                    <Box>
                      <Typography fontWeight="bold">
                        {carpintero.user.name} {carpintero.user.lastname}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {carpintero.user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{carpintero.workshop}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200 }}>
                    {carpintero.address}
                  </Typography>
                </TableCell>
                <TableCell>{carpintero.user.phone_number}</TableCell>
                <TableCell>
                  {new Date(carpintero.user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Link to={`/workers/workerProfile/${carpintero.id}`} target="_blank">
                    <IconButton color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                  <IconButton color="error" onClick={() => handleDeleteClick(carpintero)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminCarpinteros;