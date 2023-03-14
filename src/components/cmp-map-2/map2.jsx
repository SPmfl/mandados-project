import { Map, useMap, MapProvider } from "react-map-gl";
import { useControl, Marker, GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from "react-map-gl";

import MapboxDraw from '@mapbox/mapbox-gl-draw';
import React, { useRef, useState, useCallback } from "react";

const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;



function Map2() {
    const mapRef = useRef();

    const [lng, setLng] = useState(-76.5297);
    const [lat, setLat] = useState(3.3756);
    const [zoom, setZoom] = useState(12);

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
            console.log(newFeatures);
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
                initialViewState={initialView}
                style={{ width: "100vw", height: "70%" }}
                mapStyle="mapbox://styles/mapbox/dark-v10"
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

                <NavigateButton />

            </Map>
        </MapProvider>
    );
}

function Coordinates(props) {
    const { Map1 } = useMap();
    const  lng2 = Map1.getCenter().lng.toFixed(4);
    const  lat2 = Map1.getCenter().lat.toFixed(4);
    const  zoom2 = Map1.getZoom().toFixed(2);

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
        zIndex: 1,
        backgroundColor: "black",
        position: "absolute",
        top: "10%",
        right: 0,
        maxWidth: "320px",
        background: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
        padding: "12px 24px",
        margin: "20px",
        fontSize: "13px",
        lineHeight: "2",
        color: "#6b6b76",
        textTransform: "uppercase",
        outline: "none"
    }}>Home!</button>;
}

export default Map2;