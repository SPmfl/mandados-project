import React, { useRef, useEffect, useState, useCallback } from 'react';
import Map, { FullscreenControl, Marker, useControl, Popup, GeolocateControl } from 'react-map-gl';
import * as turf from '@turf/turf';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import geojson from '../../utils/geojson';


const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;

function CmpMap(params) {
    const mapRef = useRef();

    const [lng, setLng] = useState(-76.5297);
    const [lat, setLat] = useState(3.3756);
    const [zoom, setZoom] = useState(15);

    const initialView = {
        longitude: lng,
        latitude: lat,
        zoom: zoom
    }

    // const [features, setFeatures] = useState(geojson.features);
    const [features, setFeatures] = useState({});

    const onMove = () => {
        const map = mapRef.current;
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
    }

    function DrawControl(props) {
        useControl(() => new MapboxDraw(props), {
            position: props.position
        });
        return null;
    }

    function parallelLines(e) {
        return "hola lineas paralelas";
    }

    const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
          const newFeatures = {...currFeatures};
          for (const f of e.features) {
            newFeatures[f.id] = f;
          }
          return newFeatures;
        });
      }, []);
    
      const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
          const newFeatures = {...currFeatures};
          for (const f of e.features) {
            delete newFeatures[f.id];
          }
          return newFeatures;
        });
      }, []);


    return (
        <Map
            ref={mapRef}
            onMove={onMove}
            initialViewState={initialView}
            style={{ width: "100vw", height: "80vh" }}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={apiKey}
        >
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <FullscreenControl position="bottom-left" />
            <GeolocateControl position="bottom-left" />
            <DrawControl
                position="top-left"
                displayControlsDefault={false}
                controls={{
                    line_string: true,
                    trash: true
                }}
                defaultMode="draw_line_string"
                onCreate={onUpdate}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
            {/* {features && features.map(ft => {
                return <Marker longitude={ft.geometry.coordinates[0]}
                    latitude={ft.geometry.coordinates[1]}
                    onClick={e => {
                        e.preventDefault();
                        setSelected(ft);
                        setShowPopUp(true);
                    }} >
                </Marker>
            })
            } */}

        </Map>
    )
}




export default CmpMap;