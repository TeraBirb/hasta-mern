import { useRef, useEffect } from "react";

import "./Map.css"

const Map = (props) => {
  const mapRef = useRef();

  // destructuring so we can use only parts of props as dependecies in useEffect
  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: props.center,
      zoom: props.zoom,
    });

    new window.google.maps.Marker({ position: props.center, map: map });
  }, [center, zoom]);

  // useRef to store a pointer to div?
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
