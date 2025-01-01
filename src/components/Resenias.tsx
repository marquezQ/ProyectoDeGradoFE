// ReviewsView.tsx
import React from 'react';
import { Button, Rating } from '@mui/material';

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
    profileImage: 'https://via.placeholder.com/50', // Cambia por las imágenes reales
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

const ReviewsView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4"
        >
          <div className="flex items-start gap-4">
            <img
              src={review.profileImage}
              alt={review.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-sm text-gray-700">Puntualidad: <Rating value={review.punctuality} readOnly size="small" /></p>
              <p className="text-sm text-gray-700">Comunicación: <Rating value={review.communication} readOnly size="small" /></p>
              <p className="text-sm text-gray-800 mt-2">{review.comment}</p>
              {review.recommendation && (
                <p className="text-green-600 font-semibold mt-1">¡Lo recomienda!</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="bg-amber-950 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {review.overallRating}
                <Rating value={review.overallRating} readOnly />
            </div>
            <p className="text-sm text-gray-700">Calidad: <Rating value={review.quality} readOnly size="small" /></p>
            <p className="text-sm text-gray-700">Precio: <Rating value={review.price} readOnly size="small" /></p>
            <Button variant='contained'>
              Ver detalle
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsView;
