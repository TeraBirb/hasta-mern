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

    // v3, uses new recommended way to load Google Maps API
    const initMap = async () => {
        /* eslint-disable no-undef */
        // google is defined in index.html as a script tag loading the Google Maps API asynchronously
        // the app still works without the eslint-disable comment, however a warning is shown in the console
        const { Map } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } = await google.maps.importLibrary(
            "marker"
        );

        const map = new Map(document.getElementById("map"), {
            center: center,
            zoom: zoom,
            mapId: "mapId",
        });

        new AdvancedMarkerElement({
            map: map,
            position: center,
        });
    };

    initMap();

    return (
        //  //v2, LoadScriptNext should load asynchronously by default. Ignore console warning "Google Maps JavaScript API has been loaded directly without loading=async.".
        // <div className="map">
        //     <LoadScriptNext
        //         googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        //         loadingElement={<div>Loading...</div>}
        //     >
        //         <GoogleMap
        //             center={center}
        //             zoom={zoom}
        //             mapContainerStyle={{ width: "100%", height: "100%" }}
        //         >
        //             <Marker position={center} />
        //         </GoogleMap>
        //     </LoadScriptNext>
        // </div>

        // v3, uses new recommended way to load Google Maps API
        <div id="map"></div>
    );
};

export default Map;
