import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import "./OverViewPage.css"
import useHTTP from "../../hooks/useWeb";
export default function OverViwePage() {
    const {sendRequest} = useHTTP();
    if (
        localStorage.getItem("login") === null &&
        localStorage.getItem("password") === null
    ) {
        window.location.href = "./";
    }
    const [arrayOfOrders, setArrayOfOrders] = useState([]);
    useEffect(()=>{
        sendRequest("https://imbgroup.uz/registery.php", "POST")
            .then(e=>setArrayOfOrders(JSON.parse(e)));
    },[])
    return <>
        <Header>

        </Header>
        <main className="overview-page">
            <ListOfOrdersNext download={true} arrayOforders={arrayOfOrders} header={"Reyestr"} />
        </main>
    </>
}