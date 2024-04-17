import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useGenericQuery from "../../hooks/useGenericQuery";
import { getUserDistribution } from "../../services/api functions/apiStats";
import FullSpinner from "../ui/FullSpinner";

function UserMap() {
  const { data, isLoading } = useGenericQuery({
    queryKey: ["user-distribution"],
    queryFn: getUserDistribution,
    queryOptions: {
      staleTime: 0,
    },
  });

  if (isLoading)
    return (
      <div className="absolute h-full w-full bg-indigo-100">
        <FullSpinner blur={false} />
      </div>
    );

  return (
    <div className="h-full">
      <MapContainer
        center={[40, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: "100%", zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((entry) => (
          <Marker position={entry.latLng} key={entry.country}>
            <Popup>
              {entry.country} | {entry.count} users
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default UserMap;
