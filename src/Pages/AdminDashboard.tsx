import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import HandymanIcon from '@mui/icons-material/Handyman';
import InventoryIcon from '@mui/icons-material/Inventory';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DescriptionIcon from '@mui/icons-material/Description';
import useFetchData from '../hooks/useFetchData';
import { getDashboardStats } from '../services/admin';
import { ErrorMessage } from '../components/Skeleton/Skeleton';
import { User } from '../Interfaces/UserInterface';
import { Review } from '../Interfaces/ReviewInterface';

interface DashboardStats {
  total_users: number;
  total_carpinteros: number;
  total_productos: number;
  total_reseñas: number;
  total_contratos: number;
  recent_users: User[];
  recent_reseñas: Review[];
}

function AdminDashboard() {
  const { data: stats, loading, error } = useFetchData<DashboardStats>({
    apiFunction: getDashboardStats,
  });

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error || !stats) {
    return <ErrorMessage />;
  }

  const statCards = [
    { title: 'Usuarios', value: stats.total_users, icon: <PeopleIcon />, color: '#1976d2' },
    { title: 'Carpinteros', value: stats.total_carpinteros, icon: <HandymanIcon />, color: '#2e7d32' },
    { title: 'Productos', value: stats.total_productos, icon: <InventoryIcon />, color: '#ed6c02' },
    { title: 'Reseñas', value: stats.total_reseñas, icon: <RateReviewIcon />, color: '#9c27b0' },
    { title: 'Contratos', value: stats.total_contratos, icon: <DescriptionIcon />, color: '#d32f2f' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={2.4} key={card.title}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {card.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: card.color, width: 56, height: 56 }}>
                    {card.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Usuarios Recientes
            </Typography>
            <List>
              {stats.recent_users.slice(0, 5).map((user) => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar src={user.profile_picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.name} ${user.lastname}`}
                    secondary={user.email}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Reseñas Recientes
            </Typography>
            <List>
              {stats.recent_reseñas.slice(0, 5).map((review) => (
                <ListItem key={review.id}>
                  <ListItemAvatar>
                    <Avatar src={review.contrato?.user?.profile_picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">
                          {review.contrato?.user?.name || 'Usuario'}
                        </Typography>
                        <Rating 
                          value={review.calificacion?.final || 0} 
                          readOnly 
                          size="small" 
                          precision={0.5}
                        />
                      </Box>
                    }
                    secondary={`Para: ${review.contrato?.trabajador?.user?.name || 'Carpintero'}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;