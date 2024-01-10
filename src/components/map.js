import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { decode } from '@googlemaps/polyline-codec';
import '../styles/map.css';


import { useCart } from "../cartext";

const myIcon = L.icon({
  iconUrl: 'https://img.icons8.com/color/48/marker--v1.png',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41],
});

const yourTollIcon = L.icon({
  iconUrl: 'https://img.icons8.com/color/48/tollbooth.png', // Replace with the actual path to your toll icon
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5],
  popupAnchor: [0, -12.5],
});

const YOUR_OPENCAGE_API_KEY = "DqJ3mP9LQ7B3nnTDJ4JjDdfDG444LLqJ"; // Replace with your OpenCage API key

export default function Map() {
  const {
    origin,
    destination,
    selectingOrigin,
    setOrigin,
    setDestination,
    setSelectingOrigin,
    setOriginAddress,
    setDestinationAddress,
    setOriginAddressError,
    setDestinationAddressError,
    form,
    setForm,
    responseData,
    data,
  } = useCart();

  const originAddress = useCart().originAddress;
  const originAddressError = useCart().originAddressError;
  const destinationAddress = useCart().destinationAddress;
  const destinationAddressError = useCart().destinationAddressError;

  const [decodedPolyline, setDecodedPolyline] = useState([]);

  useEffect(() => {
    try {
      const decoded = decode(responseData?.routes?.[0]?.polyline);
      if (decoded) {
        setDecodedPolyline(decoded);
      } else {
        console.error('Error decoding polyline:', responseData?.routes?.[0]?.polyline);
      }
    } catch (error) {
      console.error('Error decoding polyline:', error);
    }
  }, [responseData]);

  const getAddressFromCoordinates = async (lat, lng, setAddress, setError) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${YOUR_OPENCAGE_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setAddress(data.results[0].formatted);
        setError(null);
      } else {
        setError("Address not found");
      }
    } catch (error) {
      setError("Error fetching address");
    }
  };

  const geocodeAddress = async (address, setCoordinates, setAddress, setError) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${YOUR_OPENCAGE_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const coordinates = [data.results[0].geometry.lat, data.results[0].geometry.lng];
        setCoordinates(coordinates);
        setAddress(data.results[0].formatted);
        setError(null);
        return { coordinates, address: data.results[0].formatted };
      } else {
        setError("Address not found");
        return null;
      }
    } catch (error) {
      setError("Error fetching address");
      return null;
    }
  };

  const searchAndPlaceMarkers = async () => {
    try {
      const originData = await geocodeAddress(
        form.origin,
        setOrigin,
        setOriginAddress,
        setOriginAddressError
      );
      console.log(originData);

      const destinationData = await geocodeAddress(
        form.destination,
        setDestination,
        setDestinationAddress,
        setDestinationAddressError
      );
      console.log( destinationData);
    } catch (error) {
      console.error("Error searching and placing markers:", error);
    }
  };

  const placeMarker = (coordinates, address, icon) => {
    // Check if coordinates are valid
    if (coordinates && coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
      return (
        <Marker position={coordinates} icon={icon}>
          <Popup>{address}</Popup>
        </Marker>
      );
    } else {
      // Handle invalid coordinates
      console.error('Invalid coordinates:', coordinates);
      return null;
    }
  };
  

  const tollMarkers = data?.route?.tolls ? (
    data.route.tolls.map((toll, index) =>
      placeMarker([toll.lat, toll.lng], toll.name, yourTollIcon)
    )
  ) : null;

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;

    if (selectingOrigin) {
      setOrigin([lat, lng]);
      setForm((prevForm) => ({
        ...prevForm,
        origin: [lat, lng],
      }));
      setSelectingOrigin(false);
    } else {
      setDestination([lat, lng]);
      setForm((prevForm) => ({
        ...prevForm,
        destination: [lat, lng],
      }));
      setSelectingOrigin(true);
    }
  };

  const MapEvents = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });
console.log(map);
    return null;
  };

  useEffect(() => {
    if (origin) {
      getAddressFromCoordinates(origin[0], origin[1], setOriginAddress, setOriginAddressError);
      setSelectingOrigin(false);
    }
    if (destination) {
      getAddressFromCoordinates(
        destination[0],
        destination[1],
        setDestinationAddress,
        setDestinationAddressError
      );
      setSelectingOrigin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  useEffect(() => {
    if (form.origin && form.destination) {
      searchAndPlaceMarkers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.origin, form.destination]);

  return (
    <div>
      <MapContainer
        center={[55.505, -0.09]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {decodedPolyline.length > 0 && (
          <Polyline positions={decodedPolyline} color="blue" />
        )}

        {origin && (
          <Marker position={origin} icon={myIcon}>
            <Popup>
              <strong>Origin:</strong> {originAddress || `${origin[0]}, ${origin[1]}`}
              {originAddressError && <p style={{ color: "red" }}>{originAddressError}</p>}
            </Popup>
          </Marker>
        )}

        {destination && (
          <Marker position={destination} icon={myIcon}>
            <Popup>
              <strong>Destination:</strong>{" "}
              {destinationAddress || `${destination[0]}, ${destination[1]}`}
              {destinationAddressError && (
                <p style={{ color: "red" }}>{destinationAddressError}</p>
              )}
            </Popup>
          </Marker>
        )}

        {tollMarkers}

        <ZoomControl position="bottomright" />

        <MapEvents />
      </MapContainer>

      <div>
        <button onClick={() => setSelectingOrigin(true)}>Select Origin</button>
        <button onClick={() => setSelectingOrigin(false)}>Select Destination</button>
      </div>
    </div>
  );
}
