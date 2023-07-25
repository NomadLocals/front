import "./Map.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setEventLocation, setPlaceName, fetchPlaceName } from "../../Redux trad/actions";

const MapSelect = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const zoom = 12;
  const dispatch = useDispatch();
  const markerRef = useRef(null);
  const [hasLocation, setHasLocation] = useState(false);

  const currentPlace = useSelector(state => state.placeName);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);
          setHasLocation(true);
          dispatch(fetchPlaceName(latitude, longitude));
          dispatch(setPlaceName(currentPlace));
          dispatch(setEventLocation(location));
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Subscribe to changes in currentLocation and currentPlace from the Redux store
  useEffect(() => {
    if (currentLocation) {
      dispatch(setEventLocation(currentLocation));
    }
  }, [currentLocation, dispatch]);

  useEffect(() => {
    if (currentPlace) {
      dispatch(setPlaceName(currentPlace));
    }
  }, [currentPlace, dispatch]);

  const handleMapClick = (e) => {
    const location = e.latlng;
    setCurrentLocation(location);
    dispatch(fetchPlaceName(location.lat, location.lng));
  };

  const handleMarkerDragEnd = (e) => {
    const marker = e.target;
    const location = marker.getLatLng();
    setCurrentLocation(location);
    dispatch(fetchPlaceName(location.lat, location.lng));
  };

  if (!hasLocation) {
    return <div>Permite que el navegador acceda a tu ubicación...</div>; // or any loading indicator you prefer
  }

  return (
    <MapContainer center={currentLocation} zoom={zoom} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={currentLocation} draggable={true} ref={markerRef} eventHandlers={{ dragend: handleMarkerDragEnd }}>
        <Popup>
        <pre>{currentPlace}</pre>
        </Popup>
      </Marker>

    </MapContainer>
  );
};

export default MapSelect;
