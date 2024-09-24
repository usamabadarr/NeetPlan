import { useEffect, useState } from "react";
import auth from "../utils/auth";

const FunFact = () => {

    const [fact, setFact] = useState('')


    const getFact = async ()=> {
        const data = await fetch('/api/funfact', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        });
        const funfact = await data.json()
        setFact(funfact.message)
        }
    

    useEffect(()=>{
        getFact()
    },[])

    return (
        <div className="funfact">
            <p>{fact}</p>
        </div>
    )
}

export default FunFact