// components/EmptyState.tsx
import { Search } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  hasSearchTerm: boolean;
}

function EmptyState({ hasSearchTerm }: EmptyStateProps) {
  return (
    <Box className="flex flex-col items-center justify-center py-16 px-4">
      <Search sx={{ fontSize: 80, color: 'gray', mb: 2 }} />
      <Typography variant="h6" className="text-gray-600 mb-2">
        {hasSearchTerm
          ? 'No se encontraron carpinteros'
          : 'No hay carpinteros disponibles'}
      </Typography>
      <Typography variant="body2" className="text-gray-500 text-center">
        {hasSearchTerm
          ? 'Intenta ajustar tu búsqueda o filtros'
          : 'Vuelve a intentarlo más tarde'}
      </Typography>
    </Box>
  );
}

export default EmptyState;