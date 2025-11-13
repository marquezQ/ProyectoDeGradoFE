import { Search, Clear, FilterList } from '@mui/icons-material';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Typography,
  Collapse,
  Button,
} from '@mui/material';
import { useState, KeyboardEvent, RefObject } from 'react';
import { SortOption } from '../hooks/useWorkerSearch';

interface SearchBarProps {
  inputRef: RefObject<HTMLInputElement>;
  onSearch: () => void;
  onClearSearch: () => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  totalResults: number;
  hasActiveFilters: boolean;
  onClearAllFilters: () => void;
}

function SearchBar({
  inputRef,
  onSearch,
  onClearSearch,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortChange,
  totalResults,
  hasActiveFilters,
  onClearAllFilters,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  // Permitir buscar con Enter
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Box className="space-y-4">
      {/* ========== BARRA DE BÚSQUEDA PRINCIPAL ========== */}
      {/* MÓVIL: Columna | DESKTOP: Fila*/}
      <div className="flex flex-col sm:flex-row gap-2">
        <TextField
          fullWidth
          inputRef={inputRef}
          placeholder="Buscar por nombre, taller, teléfono o ubicación..."
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onClearSearch} size="small" title="Limpiar">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="medium"
        />
        
        {/* Botón de búsqueda */}
        <Button
          variant="contained"
          onClick={onSearch}
          startIcon={<Search />}
          sx={{ 
            minWidth: { xs: '100%', sm: '120px' }, // Ancho completo en móvil, mínimo en desktop
            minHeight: '56px' // Igual altura que el TextField
          }}
        >
          Buscar
        </Button>
        
        {/* Botón de filtros */}
        <Button
          variant={showFilters ? 'contained' : 'outlined'}
          startIcon={<FilterList />}
          onClick={() => setShowFilters(!showFilters)}
          sx={{ 
            minWidth: { xs: '100%', sm: '120px' }, // Ancho completo en móvil, mínimo en desktop
            minHeight: '56px' // Igual altura que el TextField
          }}
        >
          Filtros
        </Button>
      </div>

      {/* ========== FILTROS AVANZADOS (COLAPSABLES) ========== */}
      <Collapse in={showFilters}>
        <Box className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Filtro por calificación */}
          <FormControl className="w-full sm:w-64">
            <InputLabel>Calificación mínima</InputLabel>
            <Select
              value={minRating}
              label="Calificación mínima"
              onChange={(e) => onMinRatingChange(e.target.value as number)}
            >
              <MenuItem value={0}>Todas</MenuItem>
              <MenuItem value={3}>
                <Box className="flex items-center gap-2">
                  <Rating value={3} readOnly size="small" />
                  <span>o más</span>
                </Box>
              </MenuItem>
              <MenuItem value={4}>
                <Box className="flex items-center gap-2">
                  <Rating value={4} readOnly size="small" />
                  <span>o más</span>
                </Box>
              </MenuItem>
              <MenuItem value={4.5}>
                <Box className="flex items-center gap-2">
                  <Rating value={4.5} readOnly size="small" />
                  <span>o más</span>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          {/* Ordenar por */}
          <FormControl className="w-full sm:w-64">
            <InputLabel>Ordenar por</InputLabel>
            <Select
              value={sortBy}
              label="Ordenar por"
              onChange={(e) => onSortChange(e.target.value as SortOption)}
            >
              <MenuItem value="rating-desc">Mayor calificación</MenuItem>
              <MenuItem value="rating-asc">Menor calificación</MenuItem>
              <MenuItem value="reviews-desc">Más reseñas</MenuItem>
              <MenuItem value="name-asc">Nombre (A-Z)</MenuItem>
            </Select>
          </FormControl>

          {/* Botón limpiar filtros */}
          {hasActiveFilters && (
            <Button
              variant="text"
              onClick={onClearAllFilters}
              className="sm:mt-2"
              sx={{ 
                width: { xs: '100%', sm: 'auto' } // Ancho completo en móvil
              }}
            >
              Limpiar todo
            </Button>
          )}
        </Box>
      </Collapse>

      {/* ========== INDICADOR DE RESULTADOS ========== */}
      <Typography variant="body2" className="text-gray-600">
        {totalResults} {totalResults === 1 ? 'carpintero encontrado' : 'carpinteros encontrados'}
      </Typography>
    </Box>
  );
}

export default SearchBar;