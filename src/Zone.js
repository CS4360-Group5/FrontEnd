import React, { useEffect , useState } from 'react';
import axios from 'axios';

const Zone = ( {setzoneResponseData} ) => {
    const [zone, setZones] = useState([]);

    const handleZone = (e) => {
        e.preventDefault();
        axios
            .get('http://localhost:8080/zone')
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                }
                setZones(response.data);
                console.log(response.data);
                setzoneResponseData(zone);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return handleZone();
}

export default Zone;
