import { useState } from "react";
import { useEffect } from "react";
import CashList from "../../components/cashList/cashList";
import Header from "../../components/header/header";
import useHTTP from "../../hooks/useWeb";
import "./CashPage.css";

export default function CashPage(){
    const {sendRequest} = useHTTP();
    const [cashList, setCashList] = useState([]);
    useEffect(()=>{
        sendRequest("/get-cash-list.php", "POST")
            .then(e=>setCashList(JSON.parse(e)));
            // eslint-disable-next-line
    }, [])

    return <>
        <Header/>
        <main className="cash-page mt-70 p-20">
            <div className="border p-20 mb-20">Balans: 20 000 000 UZS</div>
            <div>
                <CashList cashList={cashList}/>
            </div>
        </main>
    </>
}