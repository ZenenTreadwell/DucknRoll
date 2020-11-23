import React, { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

function LocationMap(props) {

    function LocationMarker() {
        const [position, setPosition] = useState(props.position)
        const map = useMapEvents({
            click(e) {
                setPosition([e.latlng.lat,e.latlng.lng]);
                props.setPosition(e.latlng.lat, e.latlng.lng);
            },
        })

        return (
            <Marker position={position}>
                <Popup>Latitude: {position[0]}<br/>
                Longitude: {position[1]}</Popup>
            </Marker>
        );
    }


    return (
        <MapContainer center={props.position} zoom={13} scrollWheelZoom={true} style={{"height": 200}}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker/>
        </MapContainer>
    );
}

export default LocationMap;
