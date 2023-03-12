import React, { useRef, useEffect, useState, useCallback } from 'react';
import Map, { Source, FullscreenControl, Marker, useControl, Popup, GeolocateControl, Layer } from 'react-map-gl';
import * as turf from '@turf/turf';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import geojson from '../../utils/geojson';


const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;

function CmpMap(params) {
    const mapRef = useRef();

    const [lng, setLng] = useState(-76.5297);
    const [lat, setLat] = useState(3.3756);
    const [zoom, setZoom] = useState(14);

    const initialView = {
        longitude: lng,
        latitude: lat,
        zoom: zoom
    }

    const [myfeatures, setMyFeatures] = useState(geojson.features);
    const [features, setFeatures] = useState({});

    const [showPopup, setShowPopup] = useState(true);

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

    const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);










    const createParallelLines = (line, offset) => {
        const leftLine = turf.lineOffset(line, offset, { units: "kilometers" });
        const rightLine = turf.lineOffset(line, -offset, { units: "kilometers" });
        return [leftLine, rightLine];
    };


    const line = {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: [
                [-76.5449, 3.4300],
                [-76.5297, 3.3756],
                [-76.5276, 3.3691],
                [-76.5418, 3.4473]
            ],
        },
    };
    const parallelLines = createParallelLines(line, 0.05);


    return (
        <Map
            ref={mapRef}
            onMove={onMove}
            initialViewState={initialView}
            style={{ width: "100vw", height: "80vh" }}
            mapStyle="mapbox://styles/mapbox/light-v9"
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
                // defaultMode="draw_line_string"
                onCreate={onUpdate}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
            
            <Source
                id="parallelLines"
                type="geojson"
                data={{
                    type: "FeatureCollection",
                    features: parallelLines
                }}
            >
                <Layer
                    id="parallelLinesLayer"
                    type="line"
                    source="parallelLines"
                    paint={{
                        "line-color": "red",
                        "line-width": 2,
                    }}
                />
            </Source>

            {/* {showPopup && (
                <Popup longitude={features} latitude={40}
                    anchor="bottom"
                    onClose={() => setShowPopup(false)}>
                    You are here
                </Popup> )
            } */}
        </Map>
    );
}




export default CmpMap;