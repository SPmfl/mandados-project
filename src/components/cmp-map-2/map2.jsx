import { Map, useMap, MapProvider } from "react-map-gl";
import {
    useControl,
    Marker,
    GeolocateControl,
    FullscreenControl,
    NavigationControl,
    ScaleControl,
    Source,
    Layer
} from "react-map-gl";

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapboxgl from 'mapbox-gl';
import * as  turf from '@turf/turf';

import React, { useRef, useState, useCallback } from "react";






 const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;


function Map2() {
    const mapRef = useRef();

    const [lng, setLng] = useState(-76.5297);
    const [lat, setLat] = useState(3.3756);
    const [zoom, setZoom] = useState(14);

    const [features, setFeatures] = useState({});

    const initialView = {
        longitude: lng,
        latitude: lat,
        zoom: zoom
    }

    const onMove = () => {
        const map = mapRef.current;
        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });
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


    return (
        <MapProvider>
            <Map
                id="Map1"
                ref={mapRef}
                onMove={onMove}
                onError={evt => console.log("error: ", evt)}
                initialViewState={initialView}
                style={{ width: "100vw", height: "100vh" }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={apiKey}>
                <Coordinates />
                <GeolocateControl position="bottom-left" />
                <FullscreenControl position="bottom-left" />
                <NavigationControl position="bottom-left" />
                <ScaleControl />
                <DrawControl
                    position="top-left"
                    displayControlsDefault={false}
                    controls={{
                        line_string: true,
                        point: true,
                        trash: true
                    }}
                    onCreate={onUpdate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
                {/* { console.log(Object.values(features)) }  */}

                <Control features={Object.values(features)} />

            </Map>
        </MapProvider>
    );
}

function Control(props) {
    const { Map1 } = useMap();
    const map = Map1.getMap();
    const features = props.features;

    return <>
        <div style={{
            zIndex: 1,
            position: "absolute",
            top: "10%",
            right: 0,
            maxWidth: "320px",
            background: "#fff",
            padding: "12px 24px",
            margin: "20px",
            fontSize: "13px",
            lineHeight: "2",
            color: "#6b6b76",
            textTransform: "uppercase",
            outline: "none",
            display: "flex",
            flexDirection: "column"
        }}>
            <input type="text"
                id="offset"
                placeholder="offSet-> 1=1km"
                style={{
                    width: "100px"
                }} />
            <button onClick={()=>addParallels(map, features, parseFloat(document.getElementById("offset").value)) }>
                add Parallels
            </button>
            <button onClick={() => { addCircle(map, features) }}>
                add Circles
            </button>
            <NavigateButton />
        </div>
    </>


}

const featureFilter = (features, typeFeature) => {
    if (typeFeature !=="Point"  && typeFeature !== "LineString") return [];
    if (features.length === 0) return [];
    return features.filter(ft => ft.geometry.type === typeFeature);
}

const addParallels = (map, features, offset) => {
    
    const lines = featureFilter(features, "LineString");


        for (const ft of lines) {
            if(map.getSource(ft.id)) {
                map.removeSource(ft.id);
                map.removeLayer(ft.id);
            }
            const geojson = {
                'type': 'FeatureCollection',
                'features': {}
            }
            const leftLine = turf.lineOffset(ft, offset, { units: "kilometers" });
            const rightLine = turf.lineOffset(ft, -offset, { units: "kilometers" });
            let parallel = [leftLine, rightLine];
            //console.log(JSON.stringify(parallel, null, 1), offset);
            geojson.features = parallel
            
            map.addSource(`${ft.id}`, {
                "type": 'geojson',
                "data": geojson
            });

            map.addLayer({
                id: `${ft.id}`,
                type: 'line',
                source: `${ft.id}`,
                paint: {
                    "line-color": "red",
                    "line-width": 2
                }
            });
    }


    // if (lines && Map1) {

    //     const leftLine = turf.lineOffset(lines, offset, { units: "kilometers" });
    //     const rightLine = turf.lineOffset(lines, -offset, { units: "kilometers" });
    //     let parallel = [leftLine, rightLine];
    //     console.log(JSON.stringify(parallel, null, 1), offset);
    //     geojson.features = parallel
    // }

    // map.addSource('my-data', {
    //     "type": 'geojson',
    //     "data": geojson
    // });

    // map.addLayer({
    //     id: 'my-data',
    //     type: 'line',
    //     source: 'my-data',
    //     paint: {
    //         "line-color": "red",
    //         "line-width": 2
    //     }
    // });
    return null;
}
const addCircle = (map, features) => {
    const points = featureFilter(features, "LineString");
    console.log(points);
}


function Coordinates(props) {
    const { Map1 } = useMap();
    const lng2 = Map1.getCenter().lng.toFixed(4);
    const lat2 = Map1.getCenter().lat.toFixed(4);
    const zoom2 = Map1.getZoom().toFixed(2);

    return (
        <div className="sidebar">
            Longitude: {lng2} | Latitude: {lat2} | Zoom: {zoom2}
        </div>
    );
}

function DrawControl(props) {
    const { Map1 } = useMap();
    useControl(() => new MapboxDraw(props),
        () => {

            Map1.on('draw.create', props.onCreate);
            Map1.on('draw.update', props.onUpdate);
            Map1.on('draw.delete', props.onDelete);
        },
        () => {

            Map1.off('draw.create', props.onCreate);
            Map1.off('draw.update', props.onUpdate);
            Map1.off('draw.delete', props.onDelete);
        },
        {
            position: props.position
        }
    );
    return null;
}

function NavigateButton() {
    const { Map1 } = useMap();

    const onClick = () => {
        Map1.flyTo({ center: [-76.5297, 3.3756] });
    };

    return <button onClick={onClick} style={{
        background: "#444",
        color: "#fff",

    }}>Home!</button>;
}

export default Map2;