import { useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import "./Map.css";

const Map = (props) => {
    const mapRef = useRef();

    const { center, zoom } = props;

    // No longer necessary due to LoadScript
    // useEffect(() => {
    //   const map = new window.google.maps.Map(mapRef.current, {
    //     center: props.center,
    //     zoom: props.zoom,
    //   });

    //   new window.google.maps.Marker({ position: props.center, map: map });
    // }, [center, zoom]);

    return (
        // <div
        //   ref={mapRef}
        //   className={`map ${props.className}`}
        //   style={props.style}
        // ></div>
        <div className="map">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
