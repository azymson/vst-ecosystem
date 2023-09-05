import { useEffect, useState } from "react"
import Header from "../../components/header/header"
import useHTTP from "../../hooks/useWeb";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
export default function LocationPage(){
    const [data, setData] = useState([]);
    const {sendRequest} = useHTTP();
    
    useEffect(()=>{
        sendRequest("https://imbgroup.uz/get-location-list.php","POST")
            .then(e=>{
                setData(JSON.parse(e));
            })
    }, [])
    return <>
        <Header></Header>
        <main className="p-20 mt-70">
            <ListOfOrdersNext arrayOforders={data} setSelect={()=>{}}/>
        </main>
        
    </>
}