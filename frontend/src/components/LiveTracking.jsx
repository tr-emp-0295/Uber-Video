import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const markerIcon = L.divIcon({
    className: '',
    html: '<div class="pulse-marker"></div>',
    iconSize: [ 22, 22 ],
    iconAnchor: [ 11, 11 ]
});

const center = {
    lat: -3.745,
    lng: -38.523
};

const Recenter = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        map.setView([ position.lat, position.lng ]);
    }, [ position.lat, position.lng, map ]);

    return null;
}

const LiveTracking = () => {
    const [ currentPosition, setCurrentPosition ] = useState(center);

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <MapContainer
            center={[ currentPosition.lat, currentPosition.lng ]}
            zoom={15}
            style={{ width: '100%', height: '100%', position: 'relative', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={markerIcon} position={[ currentPosition.lat, currentPosition.lng ]} />
            <Recenter position={currentPosition} />
        </MapContainer>
    )
}

export default LiveTracking
