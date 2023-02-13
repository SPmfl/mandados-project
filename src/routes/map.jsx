import MapComponent from "../components/cmp-map/cmpMap";
import geojson from '../utils/geojson';
import useSWR from 'swr';
import '../styles/map.css';
import axios from "axios";
import { useEffect } from "react";
import Feature from "../components/cmp-feature/feature";


const lista = ["algo1", "algo1", "algo1", "algo1", "algo1", "algo1", "algo1"];


/* make request for markers and distribute them to list container and map element */

/**
 * 
 *  useEffect → bring markers data
 *  put data in a useState
 *  deploy a list of markers on list component
 *  pass markers array to map component adding to map
 */


const fetcher = async (url)=> {
    await axios.get(url, {
        headers: {
            'x_access_token': localStorage.getItem('x_access_token')
        }
    }).then(response => response.data)
}

function Map() {

    //const { data, error, isLoading } = useSWR('http://localhost:4500/api/operator/marks', fetcher);


    useEffect(()=>{
        console.log("hola maplist");
    })
    
    console.log(geojson);

    return (
        <div id="maplist-container">

            <div id="list-container" >
                <div id="lista">{geojson.features.map(e => <Feature {...e}></Feature>  )}</div>
            </div>

            <div id="map-content">
                <MapComponent markerList={geojson} ></MapComponent>
            </div>

        </div>
    );
}

export default Map;