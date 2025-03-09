import { useState } from "react";
import { Box, Typography, Modal } from "@mui/material";
import { Worker } from "../Interfaces/WorkerInterface";
import StaticMap from "../Pages/StaticMap";

interface workerProps {
  worker: Worker;
}

function AboutMeWorker({ worker }: workerProps) {

  // Estado para manejar el modal
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Funciones para abrir y cerrar el modal
  const handleOpen = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box className="w-full h-full">
      <Typography variant="h6" className="font-bold mb-2">
        Sobre mí
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        {worker.description}
      </Typography>
      <div className="mt-4">
        <Typography variant="h6" className="font-bold">
          Ubicación
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          {worker.address}
        </Typography>
        <div className="w-full flex items-center mt-2">
          <StaticMap lat={worker.latitud} lng={worker.longitud} />
        </div>
      </div>
      {/* Sección de galería */}
      <div className="mt-6">
        <Typography variant="h6" className="font-bold mb-4">
          Algunos de mis trabajos
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.values(worker.images).map((imageUrl, index) => (
            <div
              key={index}
              className="w-auto h-auto overflow-hidden rounded-lg border shadow-md cursor-pointer m-auto"
              onClick={() => handleOpen(`${imageUrl}`)}
            >
              <img
                src={`${imageUrl}`}
                alt={`Imagen ${index + 1}`}
                className="w-auto h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal para mostrar la imagen ampliada */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="flex items-center justify-center"
        // sx={{backgroundColor:"red"}}
        
      >
        <Box className="bg-white p-4 rounded-lg shadow-lg max-w-screen-lg w-full h-full">
          
          {selectedImage && (
            <div className="flex items-center justify-center h-full">
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-full object-contain"
            />
            </div>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default AboutMeWorker;
