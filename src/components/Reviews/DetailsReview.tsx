import { useState, useEffect } from "react";
import { Rating, useMediaQuery, useTheme, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Review } from "../../Interfaces/ReviewInterface";

interface Props {
  review: Review;
}

function DetailsReview({ review }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const images = Object.values(review.images).filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className="bg-white">
      <div className="relative w-full" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{
          height: isMobile ? '300px' : '400px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/800x600?text=Imagen+no+disponible";
                }}
              />
            </div>
          ))}

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-all"
                onClick={handlePrev}
              >
                <ArrowBackIos sx={{ fontSize: isMobile ? 20 : 24 }} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-all"
                onClick={handleNext}
              >
                <ArrowForwardIos sx={{ fontSize: isMobile ? 20 : 24 }} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex ? "bg-[#654b43] scale-125" : "bg-gray-400 hover:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
  {[
    { label: "Puntualidad", value: review.calificacion.time },
    { label: "Calidad", value: review.calificacion.quality },
    { label: "Comunicación", value: review.calificacion.communication },
    { label: "Precio", value: review.calificacion.price }
  ].map((item) => (
    <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
      <span className="text-gray-700 font-medium min-w-[100px]">{item.label}:</span>
      <Rating
        value={item.value}
        readOnly
        size={isMobile ? "small" : "medium"}
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#fbbf24',
          },
          '& .MuiRating-icon': {
            fontSize: isMobile ? '1.25rem' : '1.5rem', // Ajuste fino del tamaño
          },
        }}
      />
    </div>
  ))}
</div>


        <div className="border-t pt-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-800 mb-2">Comentario:</Typography>
          <Typography variant="body2" className="text-gray-600 whitespace-pre-line">{review.comment}</Typography>
        </div>
      </div>
    </div>
  );
}

export default DetailsReview;