import { Button, Rating, Typography } from "@mui/material"
import { Worker } from "../Interfaces/WorkerInterface";
import { LocationOn, Phone, WhatsApp, RemoveRedEyeOutlined } from "@mui/icons-material";
interface props{
  worker: Worker;
}

function CarpinterCard({worker}: props) {
  const parsedImages = JSON.parse(worker.images);
  return (
    <div className="flex border rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Imagen */}
      <div className="w-1/3 bg-gray-200 flex items-center justify-center">
        <img
          // src={`http://localhost:8000/storage/${worker.user.profile_picture}`}
          src={`http://localhost:8000/storage/${parsedImages.image3}`}
          alt={"imagen"}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contenido */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Título y Estrellas */}
        <div className="pt-3 flex justify-between items-start">
          <div>
            <Typography variant="h4" className="font-bold text-gray-800">Carpintero Ebanista</Typography>
            <Typography variant="h6" className="pt-3 text-gray-600">{worker.user.name+" "+worker.user.lastname}</Typography>
          </div>
          <div className="flex items-center">
            <Typography variant="h5" className="font-bold">{4.5}</Typography>
            <Rating
              value={4.3}
              precision={0.1}
              readOnly
              size="medium"
              className="ml-1"
            />
            <span className="text-sm text-gray-500 ml-1">({45} reseñas)</span>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {worker.description}
        </p>

        {/* Información de Contacto */}
        <div className="flex items-center justify-between text-gray-600 mb-5">
      {/* Ubicación */}
      <div className="flex items-center">
        <LocationOn fontSize="small" color="error" />
        <Typography variant="body2" className="ml-1">
          {"aqui obtener API"}
        </Typography>
      </div>

      {/* Teléfono */}
      <div className="flex items-center">
        <Phone fontSize="small" color="primary" />
        <Typography variant="body2" className="ml-1">
          {worker.user.phone_number}
        </Typography>
      </div>

      {/* WhatsApp */}
      <div className="flex items-center">
        <Button variant="contained" size="medium" sx={{background:"green"}}>
          <WhatsApp fontSize="small"/>
          WhatsApp
        </Button>
      </div>

      {/* Botón */}
      <div>
        <Button
          variant="contained"
          size="medium"
        >
          <RemoveRedEyeOutlined fontSize="small"/>
          Ver Perfil
        </Button>
      </div>
    </div>
      </div>
    </div>
  )
}

export default CarpinterCard