import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Chip,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllProductosAdmin, deleteProducto } from '../services/admin';
import useFetchData from '../hooks/useFetchData';
import { ErrorMessage } from '../components/Skeleton/Skeleton';
import Swal from 'sweetalert2';

interface ProductoAdmin {
  id: string;
  trabajador_id: string;
  name: string;
  stock: string;
  price: number;
  image: string;
  created_at: string;
  trabajador: {
    id: string;
    user: {
      name: string;
      lastname: string;
      profile_picture: string;
    };
  };
}

function AdminProductos() {
  const { data: productos, loading, error, fetchData } = useFetchData<ProductoAdmin[]>({
    apiFunction: getAllProductosAdmin,
  });

  const [filteredProductos, setFilteredProductos] = useState<ProductoAdmin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (productos) {
      const filtered = productos.filter(
        (prod) =>
          prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prod.trabajador.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prod.trabajador.user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProductos(filtered);
    }
  }, [searchTerm, productos]);

  const handleDeleteClick = async (producto: ProductoAdmin) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `Vas a eliminar el producto <strong>${producto.name}</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteProducto(producto.id);
        await fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Producto eliminado correctamente',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el producto',
        });
      }
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error || !productos) return <ErrorMessage />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Productos
        </Typography>
        <TextField
          placeholder="Buscar productos..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={producto.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={producto.image || '/placeholder.jpg'}
                  alt={producto.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" noWrap>
                    {producto.name}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold" my={1}>
                    Bs. {Number(producto.price).toFixed(2)}
                  </Typography>
                  <Chip
                    label={`Stock: ${producto.stock}`}
                    size="small"
                    color={Number(producto.stock) > 0 ? 'success' : 'error'}
                  />
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Avatar
                      src={producto.trabajador.user.profile_picture}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      {producto.trabajador.user.name} {producto.trabajador.user.lastname}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(producto)}
                    sx={{ ml: 'auto' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography textAlign="center" color="textSecondary">
              No se encontraron productos
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default AdminProductos;