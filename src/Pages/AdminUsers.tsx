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
  Chip,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsers, deleteUser } from '../services/admin';
import useFetchData from '../hooks/useFetchData';
import { User } from '../Interfaces/UserInterface';
import { ErrorMessage } from '../components/Skeleton/Skeleton';
import Swal from 'sweetalert2';

function AdminUsers() {
  const { data: users, loading, error, fetchData } = useFetchData<User[]>({
    apiFunction: getAllUsers,
  });

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (users) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleDeleteClick = async (user: User) => {
    if (user.role === 'admin') {
      Swal.fire({
        icon: 'error',
        title: 'Acción no permitida',
        text: 'No se puede eliminar un administrador',
      });
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `Vas a eliminar al usuario <strong>${user.name} ${user.lastname}</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(user.id.toString());
        await fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Usuario eliminado correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch  {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el usuario',
        });
      }
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error || !users) return <ErrorMessage />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Usuarios
        </Typography>
        <TextField
          placeholder="Buscar usuarios..."
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
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={user.profile_picture} />
                    <Typography>
                      {user.name} {user.lastname}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>
                  <Chip
                    label={user.role || 'cliente'}
                    color={
                      user.role === 'admin'
                        ? 'error'
                        : user.role === 'carpintero'
                        ? 'success'
                        : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(user)}
                    disabled={user.role === 'admin'}
                  >
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

export default AdminUsers;