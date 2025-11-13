/* eslint-disable no-case-declarations */
import { useMemo, useState, useRef } from 'react';
import { Worker } from '../Interfaces/WorkerInterface';

export type SortOption = 'rating-desc' | 'rating-asc' | 'reviews-desc' | 'name-asc';

interface UseWorkerSearchProps {
  workers: Worker[];
  itemsPerPage?: number;
}

/**
 * Función para normalizar texto:
 * - Convierte a minúsculas
 * - Elimina tildes/acentos
 * Ejemplo: "José López" → "jose lopez"
 */
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD') // Separa las letras de los acentos
    .replace(/[\u0300-\u036f]/g, ''); // Elimina los acentos
};

export const useWorkerSearch = ({ 
  workers, 
  itemsPerPage = 5 
}: UseWorkerSearchProps) => {
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('rating-desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Ejecutar búsqueda y resetear a página 1
  const executeSearch = () => {
    const value = inputRef.current?.value.trim() || '';
    setActiveSearchTerm(value);
    setCurrentPage(1);
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setActiveSearchTerm('');
    setCurrentPage(1);
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setActiveSearchTerm('');
    setMinRating(0);
    setSortBy('rating-desc');
    setCurrentPage(1);
  };

  // PASO 1: Filtrar y ordenar
  const filteredAndSortedWorkers = useMemo(() => {
    if (!workers || workers.length === 0) return [];

    let result = [...workers];

    // ========== FILTRAR POR TÉRMINO DE BÚSQUEDA ==========
    if (activeSearchTerm) {
      // Normalizar el término de búsqueda (sin tildes ni mayúsculas)
      const searchNormalized = normalizeText(activeSearchTerm);
      
      result = result.filter((worker) => {
        // Construir los campos donde buscar y normalizarlos
        const fullName = normalizeText(`${worker.user.name} ${worker.user.lastname}`);
        const workshop = normalizeText(worker.workshop);
        const address = normalizeText(worker.address);
        const phoneNumber = worker.user.phone_number; // Los números no necesitan normalización
        
        // Buscar coincidencias en:
        // 1. Nombre completo del carpintero
        // 2. Nombre del taller
        // 3. Dirección
        // 4. Número de teléfono
        return (
          fullName.includes(searchNormalized) ||
          workshop.includes(searchNormalized) ||
          address.includes(searchNormalized) ||
          phoneNumber.includes(activeSearchTerm) // Búsqueda exacta para números
        );
      });
    }

    // ========== FILTRAR POR CALIFICACIÓN MÍNIMA ==========
    if (minRating > 0) {
      result = result.filter((worker) => worker.averageRating >= minRating);
    }

    // ========== ORDENAR ==========
    result.sort((a, b) => {
      switch (sortBy) {
        case 'rating-desc':
          // Mayor calificación primero
          return b.averageRating - a.averageRating;
        
        case 'rating-asc':
          // Menor calificación primero
          return a.averageRating - b.averageRating;
        
        case 'reviews-desc':
          // Más reseñas primero
          return parseInt(b.totalReviews) - parseInt(a.totalReviews);
        
        case 'name-asc':
          // Orden alfabético por nombre
          const nameA = `${a.user.name} ${a.user.lastname}`;
          const nameB = `${b.user.name} ${b.user.lastname}`;
          return nameA.localeCompare(nameB);
        
        default:
          return 0;
      }
    });

    return result;
  }, [workers, activeSearchTerm, minRating, sortBy]);

  // PASO 2: Calcular paginación
  const paginationData = useMemo(() => {
    const totalItems = filteredAndSortedWorkers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Calcular índices para slice
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Extraer solo los carpinteros de la página actual
    const currentPageWorkers = filteredAndSortedWorkers.slice(startIndex, endIndex);
    
    return {
      currentPageWorkers,
      totalPages,
      totalItems,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }, [filteredAndSortedWorkers, currentPage, itemsPerPage]);

  // Navegación: Página siguiente
  const goToNextPage = () => {
    if (paginationData.hasNextPage) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navegación: Página anterior
  const goToPreviousPage = () => {
    if (paginationData.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Navegación: Ir a página específica
  const goToPage = (page: number) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    // Ref del input
    inputRef,
    
    // Estado de búsqueda activa
    activeSearchTerm,
    
    // Filtros
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    
    // Acciones de búsqueda
    executeSearch,
    clearSearch,
    clearAllFilters,
    
    // Datos de paginación
    currentPage,
    totalPages: paginationData.totalPages,
    totalItems: paginationData.totalItems,
    currentPageWorkers: paginationData.currentPageWorkers,
    hasNextPage: paginationData.hasNextPage,
    hasPreviousPage: paginationData.hasPreviousPage,
    
    // Funciones de navegación
    goToNextPage,
    goToPreviousPage,
    goToPage,
    
    // Resultados totales (para el SearchBar)
    totalResults: filteredAndSortedWorkers.length,
    hasActiveFilters: activeSearchTerm !== '' || minRating > 0,
  };
};