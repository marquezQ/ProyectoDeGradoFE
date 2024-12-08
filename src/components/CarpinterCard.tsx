import { Chat, LocationOn, Phone } from "@mui/icons-material"
import { Button, Card, CardContent, Typography } from "@mui/material"
import { Worker } from "../Interfaces/WorkerInterface";
interface props{
  worker: Worker;
}

function CarpinterCard({worker}: props) {
  return (
    <Card className="flex flex-col md:flex-row items-center bg-gray-50 shadow-md rounded-lg p-4 mx-32 my-5">
      {/* Imagen o Avatar */}
      <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 mr-4">
        <img
          src={`http://localhost:8000/storage/${worker.user.profile_picture}`}
          className="w-full h-full rounded-md border border-gray-200"
        />
      </div>

      {/* Contenido */}
      <CardContent className="flex-grow">
        {/* Título y nombre */}
        <Typography variant="h6" className="text-gray-800 font-semibold">
          {worker.user.name+" "+worker.user.lastname}
        </Typography>

        {/* Subtítulo (descripción) */}
        <Typography variant="body2" className="text-gray-600">
          {worker.description}
        </Typography>

        {/* Rating */}
        <div className="flex items-center mt-2 text-sm text-yellow-600">
          <span className="font-semibold">{"4.6"}</span>
          <span className="ml-1">⭐</span>
          <Typography variant="body2" className="ml-2 text-gray-500">
            ({"40"} reseñas)
          </Typography>
        </div>

        {/* Contacto */}
        <div className="mt-4 flex flex-col space-y-2 text-sm text-gray-700">
          <div className="flex items-center">
            <LocationOn className="text-gray-500 mr-2" />
            {"avenida america"}
          </div>
          <div className="flex items-center">
            <Phone className="text-gray-500 mr-2" />
            {worker.user.phone_number}
          </div>
          <div className="flex items-center">
            <Chat className="text-gray-500 mr-2" />
            WhatsApp: {"69584712"}
          </div>
        </div>
      </CardContent>

      {/* Botón */}
      <div className="mt-4 md:mt-0 md:ml-4">
        <Button
          variant="contained"
          className="bg-brown-500 hover:bg-brown-600 text-white px-4 py-2 rounded-md"
        >
          Ver Perfil
        </Button>
      </div>
    </Card>
  )
}

export default CarpinterCard