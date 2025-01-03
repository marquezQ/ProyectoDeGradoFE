import ReviewCard from './ReviewCard';

type Review = {
  name: string;
  profileImage: string;
  punctuality: number;
  communication: number;
  quality: number;
  price: number;
  comment: string;
  recommendation: boolean;
  overallRating: number;
};

const reviews: Review[] = [
  {
    name: 'María García',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    punctuality: 5,
    communication: 4,
    quality: 5,
    price: 4,
    comment:
      'Excelente trabajo en mi comedor. Carlos es muy profesional y entregó el proyecto a tiempo. Altamente recomendado.',
    recommendation: true,
    overallRating: 4.5,
  },
  {
    name: 'Juan Pérez',
    profileImage: 'https://via.placeholder.com/50',
    punctuality: 4,
    communication: 5,
    quality: 5,
    price: 3,
    comment:
      'Hizo un trabajo increíble restaurando mi armario antiguo. Un poco caro, pero la calidad lo vale.',
    recommendation: true,
    overallRating: 4.3,
  },
];

const ReviewTab = () => {
  return (
    <div className="p-4 space-y-6">
      {reviews.map((review, index) => (
        <div key={index}>
          <ReviewCard />
        </div>
      ))}

    </div>
  );

};

export default ReviewTab;
