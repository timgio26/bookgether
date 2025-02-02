// import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents,Marker} from "react-leaflet";
import { Coordinate} from "@/utils/types";

type MapProp = {
  handleMap:({ lat, lng }: Coordinate)=>void;
  coordinate:Coordinate
}

export function Map({handleMap,coordinate}:MapProp) {
  
  function MapClick() {
    // console.log(latlng);
    
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
        handleMap({lat:e.latlng.lat,lng:e.latlng.lng})
      },
    });
    return null;
  }
  return (
    <div className="h-40 w-full mt-4 mb-4">
      <MapContainer
        className="h-full w-full z-0"
        center={coordinate?.lat && coordinate?.lng ?[Number(coordinate.lat),Number(coordinate.lng)]:[39.083131, -94.553563]}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClick />
        {coordinate?.lat && coordinate?.lng && <Marker position={{lat:Number(coordinate.lat),lng:Number(coordinate.lng)}} />}
      </MapContainer>
    </div>
  );
}
