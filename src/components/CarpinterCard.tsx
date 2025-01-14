import { Button, Rating, Typography } from "@mui/material"
import { Worker } from "../Interfaces/WorkerInterface";
import { LocationOn, Phone, WhatsApp, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
interface props{
  worker: Worker;
}

function CarpinterCard({worker}: props) {
  return (
    <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-lg bg-white h-auto xl:h-72">
      {/* Imagen */}
      <div className="w-full md:w-1/3 bg-gray-200 flex items-center justify-center">
        <img
          src={worker.images.image1}
          alt={"imagen"}
          className="object-cover w-full h-48 md:h-full"
        />
      </div>
  
      {/* Contenido */}
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
        {/* Título y Estrellas */}
        <div className="flex flex-col md:flex-row md:justify-between md:text-start text-center">
          <div className="mb-3 md:mb-0">
            <Typography variant="h5" className="font-bold text-gray-800">
              Carpintero Ebanista
            </Typography>
            <Typography variant="h6" className=" text-gray-600">
              {worker.user.name + " " + worker.user.lastname}
            </Typography>
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex items-center">
              <Typography variant="h6" className="font-bold">{4.5}</Typography>
              <Rating
                value={4.3}
                precision={0.1}
                readOnly
                size="medium"
                className="ml-1"
              />
            </div>
            <span className="text-sm text-gray-500 md:ml-1 mt-1 md:mt-0">
              ({45} reseñas)
            </span>
          </div>
        </div>
  
        {/* Descripción */}
        <p className="text-gray-700 text-sm mb-2 line-clamp-3 text-center md:text-left">
          {worker.description}
        </p>
  
        {/* Información de Contacto */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
          {/* Ubicación */}
          <div className="flex flex-col xl:flex-row justify-start w-full lg:w-1/2 gap-3 xl:pt-2">
            <div className="flex items-center justify-center">  
              <LocationOn fontSize="small" color="error" />
              <Typography variant="body2" className="ml-1">
                Aqui la direccion largaaaaa
              </Typography>
            </div>
    
            {/* Teléfono */}
            <div className="flex items-center justify-center ">
              <Phone fontSize="small" color="primary" />
              <Typography variant="body2" className="ml-1">
                {worker.user.phone_number}
              </Typography>
            </div>
          </div>
          {/* WhatsApp */}
          <div className="flex flex-col xl:flex-row justify-end lg:w-1/2 gap-3">
            <div className="flex justify-center">
              <Button
                variant="contained"
                sx={{ background: "green", width:"8rem" }}
              >
                <WhatsApp fontSize="small" />
                WhatsApp
              </Button>
            </div>
    
            {/* Botón */}
            <div className="flex justify-center">
              <Link to={`/workers/workerProfile/${worker.id}`}>
                <Button variant="contained" sx={{width:"8rem"}}>
                  <RemoveRedEyeOutlined fontSize="small" />
                  Ver Perfil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}
export default CarpinterCard