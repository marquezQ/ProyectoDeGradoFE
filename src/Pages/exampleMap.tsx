import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const DEFAULT_POSITION: [number, number] = [-17.3935, -66.157]; // Coordenadas de Cochabamba, Bolivia

const MapWithLocation = () => {
  const [position, setPosition] = useState<[number, number]>(DEFAULT_POSITION); // Posición inicial: Cochabamba
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>(DEFAULT_POSITION); // Posición seleccionada

  // Función para obtener la ubicación del usuario
  const handleGoToUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const userPosition: [number, number] = [
          location.coords.latitude,
          location.coords.longitude,
        ];
        setPosition(userPosition); // Centra el mapa en la ubicación del usuario
        setSelectedPosition(userPosition); // Actualiza la posición seleccionada
      },
      (error) => {
        console.error("Permiso denegado o error obteniendo la ubicación:", error);
        alert("No se pudo obtener la ubicación. Permanecerás en Cochabamba.");
      }
    );
  };

  // Componente para manejar clics en el mapa
  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]); // Actualiza la posición seleccionada
      },
    });
    return <Marker position={selectedPosition} />;
  };

  const handleSave = () => {
    alert(
      `Coordenadas seleccionadas: Latitud ${selectedPosition[0]}, Longitud ${selectedPosition[1]}`
    );
  };

  const handleOpenInGoogleMaps = () => {
    if (selectedPosition) {
      const [lat, lng] = selectedPosition;
      const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(googleMapsUrl, '_blank'); // Abre en una nueva pestaña o ventana
    } else {
      alert("No se ha seleccionado una ubicación.");
    }
  };
  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: '500px', width: '70%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSelector />
      </MapContainer>
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={handleGoToUserLocation}
          style={{
            marginRight: '10px',
            padding: '10px 20px',
            fontSize: '16px',
          }}
        >
          Ir a tu ubicación
        </button>
        <button
          onClick={handleSave}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
          }}
        >
          Guardar
        </button>
        <button
          onClick={handleOpenInGoogleMaps}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
          }}
        >
          Abrir en Google Maps
        </button>
      </div>
    </div>
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






 
