
import { MapContainer, TileLayer, Marker } from 'react-leaflet';


interface StaticMapProps {
  lat: string;
  lng: string;
}

const StaticMap = ({ lat, lng }: StaticMapProps) => {
  // Crear una ubicación con las coordenadas proporcionadas
  

  // Crear la URL de Google Maps para abrir en el navegador

  
    const latitud = parseFloat(lat);
    const longitud = parseFloat(lng)
    
  return (
    <>
      <MapContainer center={[latitud, longitud ]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Mostrar el marcador en la posición especificada */}
        <Marker position={[latitud, longitud ]} />
      </MapContainer>      
    </>
  );
};

export default StaticMap;
