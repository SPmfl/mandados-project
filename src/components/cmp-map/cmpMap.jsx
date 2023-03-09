import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './cmpMap.css';

import geojson from '../../utils/geojson.js';


const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;
mapboxgl.accessToken = apiKey;


export default function MapComponent(props) {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-76.5297);
  const [lat, setLat] = useState(3.3756);
  const [zoom, setZoom] = useState(15);
  const [geoState, setGeoState] = useState(true);
  const [features, setFeatures] = useState(geojson.features)

  const addToMap = (map, features) => {
    features.map(feature => {
      new mapboxgl.Marker(
        {
          color: "#000",
          draggable: true,
        }
      )
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup()
            .setHTML("<h1>Marker!!!</h1>")
            .addTo(map))
        .addTo(map);
    });
  }


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: 'map',
      style: process.env.REACT_APP_MAPBOX_STYLES,
      center: [lng, lat],
      zoom: zoom
    });
    addToMap(map.current, features);
  });


  /** update useState for coordinates on move */
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });


  useEffect(() => {
    // Initialize the geolocate control.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserHeading: true
    });
    // Add the control to the map.
    if (geoState) {
      map.current.addControl(geolocate);
      setGeoState(false);
    }
    map.current.on('load', () => {
      geolocate.trigger();
    });
  });

  // useEffect(() => {
  //   addToMap(map.current, features);
  // })




  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" id='map' />
    </div>
  );
}
