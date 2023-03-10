import React, { useRef, useEffect, useState } from 'react';
import Map, { Marker, useControl } from 'react-map-gl';
import * as turf from '@turf/turf';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

const apiKey = process.env.REACT_APP_MAPBOX_API_TOKEN;

function CmpMap(params) {
    const mapRef = useRef();
    const [zoom, setZoom] = useState(14);
    const [viewState,setViewState] = useState({
        longitude: -76.5316,
        latitude: 3.3743
    });
    
    useEffect(()=>{
        if(!Map) return;
        
    }); 




    return(
        <Map
            {...viewState}
            zoom={zoom}
            onMove={evt => {
                setViewState(evt.viewState);
                setZoom(evt.target.getZoom().toFixed(2));
            }}
            style={{width: "100%", height: "80%"}}
            mapStyle="mapbox://styles/mapbox/dark-v10"
            mapboxAccessToken={apiKey}
        >
            <DrawControl 
                position="top-left"
                displayControlsDefault={false}
                controls={{
                    polygon: true,
                    trash: true
                }}

            />
        </Map>
    )
}

function DrawControl(props){
    useControl(() => new MapboxDraw(props),{
        position: props.position
    })
}

function drawCircle(latLong, rad){
    return turf.circle({...latLong}, rad, {units:'miles'});
}

export default CmpMap;