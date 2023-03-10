import MapComponent from "../components/cmp-map/cmpMap";
import useSWR from 'swr';
import '../styles/map.css';
import axios from "axios";
import Feature from "../components/cmp-feature/feature";
import { useEffect, useState } from "react";

const urlMarkers = process.env.REACT_APP_BACKEND_API_URL_LOCAL_MARK;

/* make request for markers and distribute them to list container and map element */

const fetcher = async (url) => {
    const data = await axios.get(url, {
        headers: {
            'x_access_token': localStorage.getItem('x_access_token')
        }
    })
        .then(response => response.data || [])
        .catch(console.error);
    console.log("data from database", data);
    return data;
}

function Map() {


    const { data } = useSWR(urlMarkers, fetcher, {
        refreshInterval: 10000
    });
    const [list, setList] = useState(data);

    useEffect(() => {
        setList(data);
    }, [data]);




    return (
        <div id="maplist-container">

            {/* <div id="list-container" >
                <div id="lista">
                    {
                        markerList && markerList.forEach((element, index) => <Feature key={index} value={element}></Feature>)
                    }
                </div>
            </div> */}

            <div id="map-content">
                <MapComponent markerList={list} ></MapComponent>
            </div>

        </div>
    );
}

export default Map;