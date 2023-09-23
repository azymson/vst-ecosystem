import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./DispatchAnalyze.css"
import useHTTP from "../../hooks/useWeb";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import ListOfOrders from "../../components/listOfOrders/listOfOrders";


export default function DispatchAnalyze() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1 and pad with '0' if needed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [dispatchers, setDispatchers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [current, setCurrent] = useState("orders");
    const [startTime, setStartTime] = useState("2023-08-07");
    const [endTime, setEndTime] = useState(formattedDate);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState("odt");

    const { sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-all-dispatchers.php", "POST",
            { start: startTime, end: endTime })
            .then(e => {
                setDispatchers(JSON.parse(e))
            })
    }, [])
    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-all-request.php", "POST").then(e => setRequests(JSON.parse(e)))
    }, [])
    // functions 

    function getDispatchList(){
        console.log("works");
        sendRequest("https://imbgroup.uz/get-all-dispatchers.php", "POST",
            { start: startTime, end: endTime })
            .then(e => {
                setDispatchers(JSON.parse(e))
            })
    }
    function filterDispatcher(dispatchers){
        if(sort === "ekt")
            return ([...dispatchers].sort((a,b)=>b.success - a.success));
        if(sort === "odt")
            return dispatchers;
    }
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
                        <input type="date" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
                    </div>
                    <div>
                        <div className="mb-20">

                            Finish
                        </div>
                        <input type="date" value={endTime} onChange={(e)=>setEndTime(e.target.value)}/>
                    </div>
                    <button onClick={getDispatchList}>{(!loading)?"Ko`rsatish":"Jo`natilmoqda"}</button>
                    <button className="mt-20" onClick={()=>setSort("ekt")}>
                        Eng kop sorov yopganlar
                    </button>
                </div>}
            </div>
            {(current !== "orders") || <div className="mb-20">  
                <ListOfOrdersNext rejectable={true} arrayOforders={requests}></ListOfOrdersNext>
            </div>}
            {(current !== "dispatch") ||
                <div className="list-of-dispatchers">
                    <div className="border p-20 o-auto">
                        <table>
                            <tr>
                                <td>Ism</td>
                                <td>Qaytarilgan so`rovlar</td>
                                <td>Muvofaqiyatli so`rovlar</td>
                            </tr>

                            {filterDispatcher(dispatchers).map(e => {
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