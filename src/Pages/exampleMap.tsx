import { Button } from '@mui/material';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

interface MapWithLocationProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const DEFAULT_POSITION: [number, number] = [-17.3935, -66.157]; // Coordenadas de Cochabamba

const MapWithLocation = ({ onLocationSelect }: MapWithLocationProps) => {
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>(DEFAULT_POSITION);
  const [shouldMoveMap, setShouldMoveMap] = useState(false); // Controla si el mapa debe moverse

  // Componente para seleccionar ubicación en el mapa
  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
        setSelectedPosition(newPosition);
        onLocationSelect(e.latlng.lat, e.latlng.lng); // Comunicar la posición seleccionada al padre
        setShouldMoveMap(false); // No mover el mapa cuando se selecciona manualmente
      },
    });
    return <Marker position={selectedPosition} />;
  };

  // Función para mover el mapa a una nueva ubicación
  const MoveMapToLocation = ({ position, shouldMove }: { position: [number, number]; shouldMove: boolean }) => {
    const map = useMap();
    if (shouldMove) {
      map.setView(position, map.getZoom()); // Mueve la vista del mapa si está habilitado
    }
    return null;
  };

  // Función para obtener la ubicación del usuario
  const handleGoToUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const userPosition: [number, number] = [
          location.coords.latitude,
          location.coords.longitude,
        ];
        setSelectedPosition(userPosition); // Actualiza la posición seleccionada
        onLocationSelect(userPosition[0], userPosition[1]); // Comunica la posición al padre
        setShouldMoveMap(true); // Habilita el movimiento del mapa
      },
      (error) => {
        console.error("Permiso denegado o error obteniendo la ubicación:", error);
        alert("No se pudo obtener la ubicación. Permanecerás en Cochabamba.");
      }
    );
  };

  return (
    <>
      <MapContainer center={DEFAULT_POSITION} zoom={13} style={{ height: '400px', width: '100%', zIndex: '0' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSelector />
        {/* Mueve el mapa solo cuando `shouldMoveMap` es verdadero */}
        <MoveMapToLocation position={selectedPosition} shouldMove={shouldMoveMap} />
      </MapContainer>
      <div className='w-full flex pt-2 justify-center'>
      <Button type="button" variant="outlined" size='small' onClick={handleGoToUserLocation}>
        Ir a mi ubicación
      </Button>
      </div>
    </>
  );
};

export default MapWithLocation;

//aqui la v2 con google maps funciona peor con error y warning
// import { useState } from 'react';
// import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// const DEFAULT_POSITION = { lat: -17.3935, lng: -66.157 }; // Coordenadas de Cochabamba

// const MapWithGoogleMaps = () => {
//   const [position, setPosition] = useState(DEFAULT_POSITION); // Centro inicial
//   const [selectedPosition, setSelectedPosition] = useState(DEFAULT_POSITION); // Posición seleccionada

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyCIQE9EZMamzLlOhGFHZnMmCmhzX0wMejg", // Reemplaza con tu API Key de Google Maps
//   });

//   const handleGoToUserLocation = () => {
//     navigator.geolocation.getCurrentPosition(
//       (location) => {
//         const userPosition = {
//           lat: location.coords.latitude,
//           lng: location.coords.longitude,
//         };
//         setPosition(userPosition); // Centra el mapa en la ubicación del usuario
//         setSelectedPosition(userPosition); // Actualiza la posición seleccionada
//       },
//       (error) => {
//         console.error("Error obteniendo la ubicación:", error);
//         alert("No se pudo obtener la ubicación. Permanecerás en Cochabamba.");
//       }
//     );
//   };

//   const handleMapClick = (e: google.maps.MapMouseEvent) => {
//     if (e.latLng) {
//       setSelectedPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() }); // Actualiza la posición seleccionada
//     }
//   };

//   const handleSave = () => {
//     alert(`Coordenadas seleccionadas: Latitud ${selectedPosition.lat}, Longitud ${selectedPosition.lng}`);
//   };

//   const handleOpenInGoogleMaps = () => {
//     const googleMapsUrl = `https://www.google.com/maps?q=${selectedPosition.lat},${selectedPosition.lng}`;
//     window.open(googleMapsUrl, '_blank');
//   };

//   if (!isLoaded) return <div>Cargando mapa...</div>;

//   return (
//     <div>
//       <GoogleMap
//         center={position}
//         zoom={13}
//         mapContainerStyle={{ height: '500px', width: '70%' }}
//         onClick={handleMapClick}
//       >
//         <Marker position={selectedPosition} />
//       </GoogleMap>
//       <div style={{ marginTop: '10px' }}>
//         <button
//           onClick={handleGoToUserLocation}
//           style={{
//             marginRight: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//           }}
//         >
//           Ir a tu ubicación
//         </button>
//         <button
//           onClick={handleSave}
//           style={{
//             marginRight: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//           }}
//         >
//           Guardar
//         </button>
//         <button
//           onClick={handleOpenInGoogleMaps}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//           }}
//         >
//           Abrir en Google Maps
//         </button>
//       </div>
     
//     </div>
//   );
// };

// export default MapWithGoogleMaps;