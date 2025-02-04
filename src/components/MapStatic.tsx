// import { useState } from "react";
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import { Coordinate} from "@/utils/types";

type MapProp = {
  coordinate:Coordinate
}

export function MapStatic({coordinate}:MapProp) {

  return (
    <div className="h-40 w-full mt-4 mb-4">
      <MapContainer
        className="h-full w-full z-0"
        center={[Number(coordinate.lat), Number(coordinate.lng)]}
        zoom={13}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* <MapClick /> */}
        {coordinate?.lat && coordinate?.lng && <Marker position={{lat:Number(coordinate.lat),lng:Number(coordinate.lng)}} />}
      </MapContainer>
    </div>
  );
}
