import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';

interface MapWithLocationProps {
  defaultLat: number;
  defaultLng: number;
  onLocationSelect: (lat: number, lng: number) => void;
}

const MapWithLocationEdit = ({ defaultLat, defaultLng, onLocationSelect }: MapWithLocationProps) => {
  const initialPosition: [number, number] = [defaultLat, defaultLng];
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>(initialPosition);
  const [shouldMoveMap, setShouldMoveMap] = useState(false);

  // Actualizar posición inicial si cambian los props
  useEffect(() => {
    setSelectedPosition([defaultLat, defaultLng]);
  }, [defaultLat, defaultLng]);

  const LocationSelector = () => {
    useMapEvents({
      click(e) {
        const newPos: [number, number] = [e.latlng.lat, e.latlng.lng];
        setSelectedPosition(newPos);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
        setShouldMoveMap(false);
      },
    });
    return <Marker position={selectedPosition} />;
  };

  const MoveMapToLocation = ({ position, shouldMove }: { position: [number, number]; shouldMove: boolean }) => {
    const map = useMap();
    useEffect(() => {
      if (shouldMove) {
        map.setView(position, map.getZoom());
      }
    }, [position, shouldMove, map]);
    return null;
  };

  const handleGoToUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const userPos: [number, number] = [location.coords.latitude, location.coords.longitude];
        setSelectedPosition(userPos);
        onLocationSelect(userPos[0], userPos[1]);
        setShouldMoveMap(true);
      },
      (error) => {
        console.error("Error obteniendo la ubicación:", error);
        alert("No se pudo obtener tu ubicación.");
      }
    );
  };

  return (
    <>
      <MapContainer center={selectedPosition} zoom={13} style={{ height: '400px', width: '100%', zIndex: '0' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationSelector />
        <MoveMapToLocation position={selectedPosition} shouldMove={shouldMoveMap} />
      </MapContainer>
      <div className="flex justify-center pt-2">
        <Button variant="outlined" onClick={handleGoToUserLocation}>
          Usar mi ubicación actual
        </Button>
      </div>
    </>
  );
};

export default MapWithLocationEdit;
