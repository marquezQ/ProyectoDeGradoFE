import useFetchData from "../hooks/useFetchData";
import { getWorkers } from "../services/workerApi";
import { Worker } from "../Interfaces/WorkerInterface";
import CarpinterCard from "../components/CarpinterCard";
import { ErrorMessage, SkeletonWorkers } from "../components/Skeleton/Skeleton";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import { useWorkerSearch } from "../hooks/useWorkerSearch";

function WorkersPage() {
  const { data: workerList, loading, error } = useFetchData<Worker[]>({
    apiFunction: getWorkers,
  });

  const {
    inputRef,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    executeSearch,
    clearSearch,
    clearAllFilters,
    totalResults,
    hasActiveFilters,
    currentPage,
    totalPages,
    totalItems,
    currentPageWorkers,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = useWorkerSearch({ 
    workers: workerList || [],
    itemsPerPage: 5
  });

  if (loading) return <SkeletonWorkers />;
  if (error) return <ErrorMessage />;

  return (
    <div className="mx-auto max-w-screen-xl p-4 sm:pt-14">
      {/* Barra de búsqueda y filtros */}
      <div className="mb-8">
        <SearchBar
          inputRef={inputRef}
          onSearch={executeSearch}
          onClearSearch={clearSearch}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={totalResults}
          hasActiveFilters={hasActiveFilters}
          onClearAllFilters={clearAllFilters}
        />
      </div>

      {/* Lista de carpinteros o estado vacío */}
      {currentPageWorkers.length > 0 ? (
        <>
          <div className="space-y-8 sm:space-y-14">
            {currentPageWorkers.map((worker) => (
              <CarpinterCard worker={worker} key={worker.user_id} />
            ))}
          </div>

          {/* Componente de paginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onNextPage={goToNextPage}
            onPreviousPage={goToPreviousPage}
            onGoToPage={goToPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </>
      ) : (
        <EmptyState hasSearchTerm={hasActiveFilters} />
      )}
    </div>
  );
}

export default WorkersPage;