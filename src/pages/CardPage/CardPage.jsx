import { useState } from "react";
import { useEffect } from "react";
import CashList from "../../components/cashList/cashList";
import Header from "../../components/header/header";
import useHTTP from "../../hooks/useWeb";
import "./CardPage.css";
import customAlert from "../../hooks/useAlert";

export default function CardPage() {
    const { sendRequest } = useHTTP();
    const [cashList, setCashList] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [mode, setMode] = useState("cash");
    const [search, setSearch] = useState("");


    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-card-list.php", "POST").then((e) =>
            setCashList(JSON.parse(e))
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-balalance-cash.php", "POST").then(
            (e) => setBalance(JSON.parse(e))
        );
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-transfer-list.php", "POST").then((e) =>
            setTransactions(JSON.parse(e))
        );
    }, []);

    function balanceFormat() {
        return balance.balance?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function deficit() {
        const deficit = (
            Number.parseInt(balance.balance) -
            cashList.map((e) => Number.parseInt(e.sum)).reduce((e, i) => e + i, 0)
        );
        return deficit >= 0 ? 0 : deficit.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    function reciveMoney(id){
        sendRequest("https://imbgroup.uz/recive-money.php","POST", {id})
            .then(e=>customAlert(e));
    }
    function rejectMoney(id){
        sendRequest("https://imbgroup.uz/reject-money.php","POST", {id})
            .then(e=>customAlert(e));
    }
    function filterData(e){
        return e.filter(z=>Object.values(z).join("").toLowerCase().includes(search))
    }

    return (
        <>
            <Header />
            <main className="cash-page mt-70 p-20">
                <div className="row mb-20">
                    <div className="cursor-pointer border p-20" onClick={()=>setMode("cash")}>Pul tarqatish</div>
                    <div className="p-20 border cursor-pointer" onClick={()=>setMode("transfer")}>Tranzaksiyalar</div>
                </div>
                {mode !== "cash" || 
                    <>
                        <div className="mb-20 row">
                            <div className="border p-20">
                                <div>Mening balansim</div>
                                <div className="balance ">{balanceFormat()} UZS</div>
                            </div>
                            <div className="border p-20">
                                <div>Defetsit</div>
                                <div className="deficit">{deficit()} UZS</div>
                            </div>
                            <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Qidiruv"/>
                        </div>
                        <div>
                            <CashList cashList={cashList} type={1}/>
                        </div>
                    </>
                }
                {mode !== "transfer" || <>
                    {transactions.map(e=><div 
                    key={e.id}
                    className="border p-20"
                    >
                        <div className="mb-20 cash-plus ">+ {e.amount}</div>
                        <div className="row">
                        <button onClick={()=>reciveMoney(e.id)}>Qabul qilish</button>
                        <button onClick={()=>rejectMoney(e.id)}>Qaytarish</button>
                        </div>

                    </div>)}
                </>}
            </main>
        </>
    );
}
