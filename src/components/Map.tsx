import { MapContainer, TileLayer } from "react-leaflet";

export function Map(){
    return (
      <div className="h-40 w-full mt-4 mb-4">
        <MapContainer
          className="h-full w-full z-0"
          center={[51.505, -0.09]} zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* <MapClick /> */}
          {/* {latlng?.lat && <Marker position={latlng} />} */}
        </MapContainer>
      </div>
    );
}