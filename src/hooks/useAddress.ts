// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import { addressWorker } from '../services/workerApi';

export const useAddress = (lat: string, lon: string) => {
    const [data, setData] = useState("ubicacion");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchdata = async ()=>{
            setLoading(true);
            try {
                const result: Address = await addressWorker(lat, lon)
                if(result){
                    const res = result.road + ", " + result.neighbourhood
                    setData(res);
                    setLoading(false);
                }
            } catch (error) {
                console.log("error en el hook address", error)
                setLoading(false);
            }
        }
        fetchdata();
    }, [lat, lon]);

    return { data, loading };
};

export interface Address {
    road: string;
    neighbourhood: string;
    suburb: string;       
    county: string;        
    state: string;         
    ISO3166_2_lvl4: string; 
    country: string;       
    country_code: string;  
}