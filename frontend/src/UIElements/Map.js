import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";

import "./Map.css";

const Map = (props) => {
    // const mapRef = useRef();

    const { center, zoom } = props;

    // // v1, No longer necessary due to LoadScript
    // useEffect(() => {
    //   const map = new window.google.maps.Map(mapRef.current, {
    //     center: props.center,
    //     zoom: props.zoom,
    //   });

    //   new window.google.maps.Marker({ position: props.center, map: map });
    // }, [center, zoom]);

    return (
        // LoadScriptNext should load asynchronously by default. Ignore console warning "Google Maps JavaScript API has been loaded directly without loading=async.".
        <div className="map">
            <LoadScriptNext
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                loadingElement={<div>Loading...</div>}
            >
                <GoogleMap
                    center={center}
                    zoom={zoom}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScriptNext>
        </div>
    );
};

export default Map;
