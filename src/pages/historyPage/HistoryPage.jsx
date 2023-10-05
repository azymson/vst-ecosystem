import { useEffect, useState } from "react";
import Header from "../../components/header/header"
import useHTTP from "../../hooks/useWeb";
import "./HistoryPage.css";

export default function HistoryPage() {
    const [data, setData] = useState([]);
    const [incomeData, setIncomeData] = useState([]);
    const [mode, setMode] = useState("all");
    const { sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-history.php", "POST")
            .then(e => setData(JSON.parse(e)))
    }, []);
    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-income-history.php", "POST")
            .then(e => setIncomeData(JSON.parse(e)))
    }, []);
    return <>
        <Header></Header>
        <main className="mt-70 p-20 history-page">
            <aside className="p-20">
                <div className="heading cursor-pointer" onClick={()=>setMode("income")}>Kirim tarixi</div>
                <div className="heading cursor-pointer" onClick={()=>setMode("all")}>Sorovlar tarixi</div>

            </aside>
            {mode==="all" && <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Ism</td>
                        <td>Familiya</td>
                        <td>Summa</td>
                        <td>O'tkazish vaqti</td>
                        <td>So'rov ID</td>
                        <td>To'lov turi</td>

                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.second_name}</td>
                            <td>{item.sum.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS</td>
                            <td>{item.created_date}</td>
                            <td>{item.order_id}</td>
                            <td>{item.type === "0"?"Naqd": "Plastik"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            {mode==="income" && <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Ism</td>
                        <td>Familiya</td>
                        <td>Summa</td>
                        <td>Otkazish vaqti</td>

                    </tr>
                </thead>
                <tbody>
                    {incomeData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.second_name}</td>
                            <td>{item.sum.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS</td>
                            <td>{item.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
            
        </main>
    </>
}