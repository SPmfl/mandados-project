import React, { useRef, useState, useCallback } from 'react';
import Map, { useMap, MapProvider, Source, FullscreenControl, Marker, useControl, Popup, GeolocateControl, Layer, NavigationControl, ScaleControl } from 'react-map-gl';
import * as turf from '@turf/turf';
import MapboxDraw from '@mapbox/mapbox-gl-draw';


const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;

function CmpMap(params) {
    const mapRef = React.useRef();

    const [lng, setLng] = useState(-76.5297);
    const [lat, setLat] = useState(3.3756);
    const [zoom, setZoom] = useState(12);

    const initialView = {
        longitude: lng,
        latitude: lat,
        zoom: zoom
    }

    const [features, setFeatures] = useState({});


    const onMove = () => {
        mapRef.current.on('move', () => {
            setLng(mapRef.current.getCenter().lng.toFixed(4));
            setLat(mapRef.current.getCenter().lat.toFixed(4));
            setZoom(mapRef.current.getZoom().toFixed(2));
        });
    }
    // const onLoad = React.useCallback(() => {
    //     mapRef.current.on('move', () => {
    //         setLng(mapRef.current.getCenter().lng.toFixed(4));
    //         setLat(mapRef.current.getCenter().lat.toFixed(4));
    //         setZoom(mapRef.current.getZoom().toFixed(2));
    //     });
    // }, [mapRef]);



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

    const createParallelLines = useCallback((line, offset) => {
        if (!line) return [[0, 0], [0, 0]];
        const leftLine = turf.lineOffset(line, offset, { units: "kilometers" });
        const rightLine = turf.lineOffset(line, -offset, { units: "kilometers" });
        console.log(leftLine);
        return [leftLine, rightLine];
    }, []);

    const DrawParallelLine = useCallback((params) => {
        const items = params.items;
        items.map((item, index) => {
            const lines = createParallelLines(item, 0.1);
            return (
                <Source
                    id="parallelLines"
                    type="geojson"
                    data={lines}
                >
                    <Layer
                        id="parallelLinesLayer"
                        type="line"
                        cursor="pointer"
                        source={lines}
                        paint={{
                            "line-color": "red",
                            "line-width": 2,
                        }}
                    />
                </Source>
            );
        }
        );
    }, [createParallelLines]);


    // const line = {
    //     type: "Feature",
    //     geometry: {
    //         type: "LineString",
    //         coordinates: [
    //             [-76.5276, 3.3691],
    //             [-76.5449, 3.4300],
    //             [-76.5418, 3.4473]
    //         ],
    //     },
    // };

    //const parallelLines = createParallelLines(line, 0.05);


    return (
        <MapProvider>
            <Map
                // ref={mapRef}
                id="Map1"
                onMove={onMove}
                initialViewState={initialView}
                style={{ width: "100vw", height: "70%" }}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                mapboxAccessToken={apiKey}
                doubleClickZoom={true}
            >
                <Coordinates data={{ lng, lat, zoom }} />
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



                {/* <DrawParallelLine map={mapRef} items={Object.values(features)}></DrawParallelLine> */}

                {/* {features && (features.map((item, index) => {
                    console.log(`itemmmm: ${item}`);
                    const parallelLines = createParallelLines(item, 0.05);
                    return (
                        <Source
                            // id="parallelLines"
                            id={index}
                            type="geojson"
                            data={{
                                type: "FeatureCollection",
                                features: parallelLines
                            }}
                        >
                            <Layer
                                id="parallelLinesLayer"
                                type="line"
                                cursor="pointer"
                                source={parallelLines}
                                paint={{
                                    "line-color": "red",
                                    "line-width": 2,
                                }}
                            // onClick={handleLineClick}
                            />
                        </Source>);
                }))} */}

                {/* {features && (<Source
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
                        cursor="pointer"
                        source={parallelLines}
                        paint={{
                            "line-color": "red",
                            "line-width": 2,
                        }}
                    // onClick={handleLineClick}
                    />
                </Source>)} */}
                {/* Map1.addSource('my-data', {
                //     "type": 'geojson',
                //     "data": geojson
                // });

                // Map1.addLayer({
                //     id: 'my-data',
                //     type: 'line',
                //     source: 'my-data',
                //     paint: {
                //         "line-color": "red",
                //         "line-width": 2
                //     }
                // });*/}
                <ControlsDiv></ControlsDiv>

            </Map>
        </MapProvider>
    );
}

function Coordinates(props) {
    const { lng, lat, zoom } = props.data;
    return (
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
    );
}

function ControlsDiv(props) {
    const { Map1 } = useMap();

    const onClick = () => {
        Map1.flyTo({ center: [-76.5297, 3.3756] });
    };
    return (
        <div style={
            {
                zIndex: 1,
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
            }
        }>
            <button onClick={onClick} >Home!</button>

        </div >
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




export default CmpMap;



/*
const Route = ()=>{
        const { Map1 } = useMap();
        
        const geojson = {
            'type': 'FeatureCollection',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [-122.483696, 37.833818],
                        [-122.483482, 37.833174],
                        [-122.483396, 37.8327],
                        [-122.483568, 37.832056],
                        [-122.48404, 37.831141],
                        [-122.48404, 37.830497],
                        [-122.483482, 37.82992],
                        [-122.483568, 37.829548],
                        [-122.48507, 37.829446],
                        [-122.4861, 37.828802],
                        [-122.486958, 37.82931],
                        [-122.487001, 37.830802],
                        [-122.487516, 37.831683],
                        [-122.488031, 37.832158],
                        [-122.488889, 37.832971],
                        [-122.489876, 37.832632],
                        [-122.490434, 37.832937],
                        [-122.49125, 37.832429],
                        [-122.491636, 37.832564],
                        [-122.492237, 37.833378],
                        [-122.493782, 37.833683]
                    ]
                }
            }
        }
        const layer = {
            'id': 'parallelLines',
            'type': 'line',
            'source': 'parallelLines',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': 'red',
                'line-width': 8
            }
        }
        return (
            <Source 
                id="parallelLines"
                type="geojson"
                data={geojson}>
                    <Layer {...layer}></Layer>
            </Source>
        )
    }
*/