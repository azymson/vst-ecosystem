import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./DispatchAnalyze.css"
import useHTTP from "../../hooks/useWeb";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import ListOfOrders from "../../components/listOfOrders/listOfOrders";


export default function DispatchAnalyze() {
    const [dispatchers, setDispatchers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [current, setCurrent] = useState("orders")
    const { sendRequest } = useHTTP();


    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-all-dispatchers.php", "POST", 
        {start:1693804659791, end:Date.now()})
            .then(e => {setDispatchers(JSON.parse(e))
            console.log(e);
            })
    }, [])
    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-all-request.php", "POST").then(e => setRequests(JSON.parse(e)))
    }, [])
    // functions 

    return <>
        <Header></Header>
        <main className="dispatch-analyze p-20 mt-70">
            <div>

            <aside className="nav p-20 border mb-20">
                <div className="cursor-pointer" onClick={() => setCurrent("orders")}><i className="fi fi-rr-briefcase mr-20 "></i>Sorvolar</div>
                <div className="cursor-pointer" onClick={() => setCurrent("dispatch")}><i className="fi fi-rr-user mr-20 "></i>Dispetcherlar statistikasi</div>
            </aside>
            
            
            {(current !== "dispatch") || <div className="row  border p-20">
                    <div>
                        <div className="mb-20">
                            Start
                        </div>
                        <input type="date" />
                    </div>
                    <div>
                        <div className="mb-20">

                            Finish
                        </div>
                        <input type="date" />
                    </div>
                    <button>Ko`rsatish</button>
                </div>}
            </div>
            {(current !== "orders") || <div className="mb-20">
                <ListOfOrdersNext rejectable={true} arrayOforders={requests}></ListOfOrdersNext>
            </div>}
            {(current !== "dispatch") ||
                <div className="list-of-dispatchers">

                    <div className="border p-20">
                        <table>
                            <tr>
                                <td>Ism</td>
                                <td>Qaytarilgan so`rovlar</td>
                                <td>Aktiv so`rovlar</td>
                            </tr>

                            {dispatchers.map(e => {
                                return <tr className="dispatchers" key={e.id}>
                                    <td>{e.name}</td>
                                    <td>{e.reject}</td>
                                    <td>{e.success}</td>
                                </tr>
                            })}
                        </table>
                    </div>
                </div>}
        </main>
    </>
}