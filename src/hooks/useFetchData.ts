import { useState, useEffect } from 'react';

interface FetchDataOptions<T> {
    apiFunction: () => Promise<T>; // Función para obtener los datos
}

const useFetchData = <T>({ apiFunction }: FetchDataOptions<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState <Error | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunction();
            setData(result);
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error, fetchData };
};

export default useFetchData;
