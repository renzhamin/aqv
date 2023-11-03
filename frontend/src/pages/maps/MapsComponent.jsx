import { get_cities_by_aqi } from "@/fetch/rankings";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import styles from "./MapsCompopnent.module.css";
import { colorIndex } from "@/helpers/colorIndex";
import { SearchBar } from "@/components/search";

const MapsComponent = () => {
  const mapContainer = useRef(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    get_cities_by_aqi(false).then((worst) => {
      mapboxgl.accessToken = mapboxToken;
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [90.40145, 23.911271], // [longitude, latitude]
        zoom: 5.7,
      });

      worst.forEach((item) => {
        if (item.lat && item.lng) {
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lng);
          const el = document.createElement("div");
          el.className = colorIndex(item.aqi) + " marker";

          new mapboxgl.Marker(el)
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup().setText(item.city + ", aqi:" + item.aqi)
            )
            .addTo(map);
        }
      });
    });
  }, []);

  return (
    <>
      <div className={styles.mapContaner} id="map">
        <p className={styles.title}>Explore your Air Quality</p>
        <div
          ref={mapContainer}
          style={{ height: "30vw", width: "90%", margin: "auto" }}
        />
      </div>
    </>
  );
};

export default MapsComponent;
