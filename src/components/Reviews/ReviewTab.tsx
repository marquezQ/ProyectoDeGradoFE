import useFetchData from '../../hooks/useFetchData';
import { Review } from '../../Interfaces/ReviewInterface';
import { getReviewsByWorkerId } from '../../services/workerApi';
import ReviewCard from './ReviewCard';

interface Props {
  workerID: string
}

const ReviewTab = ({ workerID }: Props) => {
  const { data: reviewsList, loading, error } = useFetchData<Review[]>({
    apiFunction: () => getReviewsByWorkerId(workerID)
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>ocurrio un error</p>;
  if (reviewsList?.length === 0) return <p>Aun no existen reseñas para este trabajador</p>
  if (reviewsList)
    return (
      <div className="p-4 space-y-6">
        {reviewsList.map((review, index) => (
          <div key={index}>
            <ReviewCard review={review} />
          </div>
        ))}

      </div>
    );

};

export default ReviewTab;
