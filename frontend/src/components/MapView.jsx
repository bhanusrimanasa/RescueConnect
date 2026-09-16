import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({
  latitude,
  longitude,
  volunteerLocation,
}) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  // Make sure animal coordinates are actually valid
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return (
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-700">
          📍 Valid GPS location is not available.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-xl overflow-hidden border">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Animal location */}
        <Marker position={[lat, lng]}>
          <Popup>
            🐾 Animal rescue location
          </Popup>
        </Marker>

        {/* Volunteer location */}
        {volunteerLocation &&
          Number.isFinite(Number(volunteerLocation.latitude)) &&
          Number.isFinite(Number(volunteerLocation.longitude)) && (
            <Marker
              position={[
                Number(volunteerLocation.latitude),
                Number(volunteerLocation.longitude),
              ]}
            >
              <Popup>
                🚑 Your current location
              </Popup>
            </Marker>
          )}
      </MapContainer>
    </div>
  );
}

export default MapView;