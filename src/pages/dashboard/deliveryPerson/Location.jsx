import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Make sure to import Leaflet's CSS
import { useParams } from "react-router-dom";
import useDeliveryLists from "../../../hooks/useDeliveryLists";

const Location = () => {

    const id = useParams();
    console.log('id:', id);
    const [deliveryLists, refetch] = useDeliveryLists();

    console.log("deliveryLists", deliveryLists);

    const area = deliveryLists.filter(deliveryList => deliveryList?._id === id?.id);
    console.log("area", area);
  
    const area_latitude = parseFloat(area[0].latitude);
    const area_longitude = parseFloat(area[0].longitude);


    const position = [area_latitude, area_longitude];
    const bounds = [
        [-90, -180], // Southwest coordinates (latitude, longitude)
        [90, 180]    // Northeast coordinates (latitude, longitude)
    ];

    refetch();

    return (
        <div style={{ width: '100%', height: '100%', padding: '10px', border: '1px solid black', position: 'relative', zIndex: 1 }}>
            <MapContainer
                center={position}
                zoom={3}
                scrollWheelZoom={true}
                style={{ width: '100%', height: '100%' }}
                maxBounds={bounds}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}@2x.jpg?key=VgqVqlzBoDRBAEwiSusM"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Location;
