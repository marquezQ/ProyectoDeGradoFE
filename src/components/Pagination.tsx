// components/Pagination.tsx
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward, FirstPage, LastPage } from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onGoToPage: (page: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onNextPage,
  onPreviousPage,
  onGoToPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) {
  
  // Si no hay páginas, no mostrar nada
  if (totalPages <= 1) return null;

  // Generar array de números de página a mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Máximo de números visibles
    
    if (totalPages <= maxVisible) {
      // Mostrar todas las páginas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para muchas páginas
      if (currentPage <= 3) {
        // Inicio: [1, 2, 3, 4, ..., última]
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Final: [1, ..., última-3, última-2, última-1, última]
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Medio: [1, ..., actual-1, actual, actual+1, ..., última]
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Box className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      {/* Info de resultados */}
      <Typography variant="body2" className="text-gray-600">
        Mostrando {((currentPage - 1) * 5) + 1} - {Math.min(currentPage * 5, totalItems)} de {totalItems} resultados
      </Typography>

      {/* Controles de navegación */}
      <Box className="flex items-center gap-2">
        {/* Primera página */}
        <IconButton
          onClick={() => onGoToPage(1)}
          disabled={!hasPreviousPage}
          size="small"
          title="Primera página"
        >
          <FirstPage />
        </IconButton>

        {/* Página anterior */}
        <Button
          variant="outlined"
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          startIcon={<ArrowBack />}
          size="small"
        >
          Anterior
        </Button>

        {/* Números de página */}
        <Box className="hidden sm:flex items-center gap-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <Typography key={`ellipsis-${index}`} className="px-2">
                  ...
                </Typography>
              );
            }
            
            return (
              <Button
                key={page}
                variant={currentPage === page ? 'contained' : 'outlined'}
                onClick={() => onGoToPage(page as number)}
                size="small"
                sx={{ minWidth: '40px' }}
              >
                {page}
              </Button>
            );
          })}
        </Box>

        {/* Indicador móvil (solo muestra página actual) */}
        <Typography className="sm:hidden px-3">
          {currentPage} / {totalPages}
        </Typography>

        {/* Página siguiente */}
        <Button
          variant="outlined"
          onClick={onNextPage}
          disabled={!hasNextPage}
          endIcon={<ArrowForward />}
          size="small"
        >
          Siguiente
        </Button>

        {/* Última página */}
        <IconButton
          onClick={() => onGoToPage(totalPages)}
          disabled={!hasNextPage}
          size="small"
          title="Última página"
        >
          <LastPage />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Pagination;