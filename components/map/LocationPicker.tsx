'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LocationPickerProps {
  value: { lat: number; lng: number } | null;
  onChange: (location: { lat: number; lng: number }) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [mounted, setMounted] = useState(false);
  const [MapComponent, setMapComponent] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Dynamically load all map components
    Promise.all([
      import('react-leaflet'),
      import('@/lib/leaflet-config'),
    ]).then(([leaflet]) => {
      const { MapContainer, TileLayer, Marker, useMapEvents } = leaflet;
      
      function MapClickHandler({ onChange }: { onChange: (location: { lat: number; lng: number }) => void }) {
        useMapEvents({
          click(e) {
            onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
          },
        });
        return null;
      }
      
      function Map({ center, value, onChange }: any) {
        return (
          <MapContainer
            center={center}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onChange={onChange} />
            {value && <Marker position={[value.lat, value.lng]} />}
          </MapContainer>
        );
      }
      
      setMapComponent(() => Map);
    });
  }, []);

  if (!mounted || !MapComponent) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const center: [number, number] = value 
    ? [value.lat, value.lng]
    : [-36.8485, 174.7633];

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
      <MapComponent center={center} value={value} onChange={onChange} />
    </div>
  );
}

