import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending,setIsPending] = useState(true); 
    const navigate = useNavigate();
    
    useEffect(() => {
                fetch(url)
                    .then(res => {
                        if (!res.ok ){
                            navigate('Notfound');
                            throw Error('Could not fetch data');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setData(data);
                        setIsPending(false);
                    })
                    .catch(err =>{
                        console.log(err.message)
                    })
    }, [url]);

    return {data, isPending}
}

export default useFetch;