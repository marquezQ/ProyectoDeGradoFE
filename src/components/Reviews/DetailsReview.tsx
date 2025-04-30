import { useState, useEffect } from "react";
import { Rating, useMediaQuery, useTheme } from "@mui/material";
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

  // Auto-play configuration
  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying, currentIndex]);

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
    <div className="w-full mx-auto bg-white">
      {/* Carrusel optimizado para móvil */}
      <div className="relative w-full overflow-hidden mb-6">
        {/* Contenedor del carrusel con altura dinámica */}
        <div 
          className="w-full"
          style={{
            height: isMobile ? 'calc(100vw * 0.8)' : '400px',
            maxHeight: isMobile ? 'none' : '60vh'
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                src={image}
                alt={`Reseña ${index + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://via.placeholder.com/800x600?text=Imagen+no+disponible";
                }}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
              />
            </div>
          ))}

          {images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 z-10 transition-all hover:scale-110"
                onClick={handlePrev}
                aria-label="Imagen anterior"
              >
                <ArrowBackIos fontSize={isMobile ? "medium" : "large"} />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow hover:bg-opacity-100 z-10 transition-all hover:scale-110"
                onClick={handleNext}
                aria-label="Imagen siguiente"
              >
                <ArrowForwardIos fontSize={isMobile ? "medium" : "large"} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-gray-800 scale-125"
                        : "bg-gray-400 hover:bg-gray-600"
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Ratings - Versión responsiva mejorada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 px-4 sm:px-6">
        {[
          { label: "Puntualidad", value: review.calificacion.time },
          { label: "Calidad", value: review.calificacion.quality },
          { label: "Comunicación", value: review.calificacion.communication },
          { label: "Precio", value: review.calificacion.price },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="font-medium text-sm min-w-[110px]">{item.label}:</span>
            <Rating 
              value={item.value} 
              readOnly 
              size={isMobile ? "small" : "medium"}
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#fbbf24',
                },
              }}
            />
          </div>
        ))}
      </div>

      {/* Comment */}
      <div className="px-4 sm:px-6 pb-6">
        <p className="font-semibold mb-2 text-gray-800">Comentario:</p>
        <p className="text-gray-700 whitespace-pre-line">{review.comment}</p>
      </div>
    </div>
  );
}

export default DetailsReview;