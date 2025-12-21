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
  IconButton,
  TextField,
  Chip,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllContratos, deleteContrato } from '../services/admin';
import useFetchData from '../hooks/useFetchData';
import { ErrorMessage } from '../components/Skeleton/Skeleton';
import Swal from 'sweetalert2';

interface ContratoAdmin {
  id: string;
  trabajador_id: string;
  user_id: string;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
  details: string;
  created_at: string;
  trabajador: {
    user: {
      name: string;
      lastname: string;
      profile_picture: string;
    };
  };
  user: {
    name: string;
    lastname: string;
    email: string;
    profile_picture: string;
  };
}

function AdminContratos() {
  const { data: contratos, loading, error, fetchData } = useFetchData<ContratoAdmin[]>({
    apiFunction: getAllContratos,
  });

  const [filteredContratos, setFilteredContratos] = useState<ContratoAdmin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (contratos) {
      const filtered = contratos.filter(
        (contrato) =>
          contrato.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contrato.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contrato.trabajador.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contrato.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContratos(filtered);
    }
  }, [searchTerm, contratos]);

  const handleDeleteClick = async (contrato: ContratoAdmin) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `Vas a eliminar el contrato <strong>${contrato.title}</strong><br>Esta acción también eliminará la reseña asociada si existe.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteContrato(contrato.id);
        await fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Contrato eliminado correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el contrato',
        });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completado':
      case 'completed':
        return 'success';
      case 'en_proceso':
      case 'in_progress':
        return 'info';
      case 'pendiente':
      case 'pending':
        return 'warning';
      case 'cancelado':
      case 'cancelled':
      case 'rechazado':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error || !contratos) return <ErrorMessage />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Contratos
        </Typography>
        <TextField
          placeholder="Buscar contratos..."
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
              <TableCell>Título</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Carpintero</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Inicio</TableCell>
              <TableCell>Fecha Fin</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContratos.length > 0 ? (
              filteredContratos.map((contrato) => (
                <TableRow key={contrato.id}>
                  <TableCell>
                    <Typography fontWeight="bold">{contrato.title}</Typography>
                    {contrato.details && (
                      <Typography variant="caption" color="textSecondary">
                        {contrato.details.substring(0, 50)}
                        {contrato.details.length > 50 ? '...' : ''}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        src={contrato.user.profile_picture}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box>
                        <Typography variant="body2">
                          {contrato.user.name} {contrato.user.lastname}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {contrato.user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        src={contrato.trabajador.user.profile_picture}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Typography variant="body2">
                        {contrato.trabajador.user.name}{' '}
                        {contrato.trabajador.user.lastname}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={contrato.status}
                      color={getStatusColor(contrato.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {contrato.start_date
                      ? new Date(contrato.start_date).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {contrato.end_date
                      ? new Date(contrato.end_date).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="error" onClick={() => handleDeleteClick(contrato)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="textSecondary">
                    No se encontraron contratos
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminContratos;