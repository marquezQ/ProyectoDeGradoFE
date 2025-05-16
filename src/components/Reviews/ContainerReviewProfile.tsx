import useFetchData from '../../hooks/useFetchData';
import { Review } from '../../Interfaces/ReviewInterface';
import { getReviewsByUserId } from '../../services/api';
import ReviewCard from './ReviewCard';

interface Props {
  userID: string
}

const ContainerReviewProfile = ({ userID }: Props) => {
  const { data: reviewsList, loading, error } = useFetchData<Review[]>({
    apiFunction: () => getReviewsByUserId(userID)
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>ocurrio un error</p>;
  if (reviewsList?.length === 0) return <p>Aun no realizaste ninguna reseña</p>
  if (reviewsList)
    return (
      <div className="space-y-6">
        {reviewsList.map((review, index) => (
          <div key={index}>
            <ReviewCard review={review} profile={true} />
          </div>
        ))}

      </div>
    );

};

export default ContainerReviewProfile;