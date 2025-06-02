import useFetchData from '../../hooks/useFetchData';
import { Review } from '../../Interfaces/ReviewInterface';
import { getReviewsByWorkerId } from '../../services/workerApi';
import { ErrorMessage, SkeletonCardReviews } from '../Skeleton/Skeleton';
import ReviewCard from './ReviewCard';

interface Props {
  workerID: string
}

const ReviewTab = ({ workerID }: Props) => {
  const { data: reviewsList, loading, error } = useFetchData<Review[]>({
    apiFunction: () => getReviewsByWorkerId(workerID)
  });

  if (loading) return <SkeletonCardReviews/>;
  if (error) return <ErrorMessage/>;
  if (reviewsList?.length === 0) return <p>Aun no existen reseñas para este trabajador</p>
  if (reviewsList)
    return (
      <div className="space-y-6">
        {reviewsList.map((review, index) => (
          <div key={index}>
            <ReviewCard review={review} />
          </div>
        ))}

      </div>
    );

};

export default ReviewTab;
