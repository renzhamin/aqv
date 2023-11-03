import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './MapsCompopnent.module.css'

const MapsComponent = () => {
  const mapContainer = useRef(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const cities = [
    { name: 'City 1', coordinates: [90.401450, 23.911271] }, // Replace with actual coordinates
    { name: 'City 2', coordinates: [30,40] }, // Replace with actual coordinates
    // Add more cities as needed
  ];

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.401450, 23.911271], // [longitude, latitude]
      zoom: 10
    });

    // Add markers for each city
    cities.forEach(city => {
      const el = document.createElement('div');
      el.className = styles.marker;

      new mapboxgl.Marker(el)
        .setLngLat(city.coordinates)
        .setPopup(new mapboxgl.Popup().setText(city.name))
        .addTo(map);
    });

    cities.forEach(city => {
        // Create a marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
  
        // Create a marker on the map
        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(city.coordinates)
          // .setPopup(new mapboxgl.Popup().setText(city.name)) // Set popup text to city name
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${city.name}</h3>`)) // Set popup text to city name
          .addTo(map);
      });


    return () => map.remove(); // Cleanup on unmount
  }, []);

  return (
    <>
        <div className={styles.mapContaner}>
            <div ref={mapContainer} style={{ height: '30vw', width: '100%' }} />
        </div>
    </>
  
  );
};

export default MapsComponent