import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./DispatchAnalyze.css"
import useHTTP from "../../hooks/useWeb";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";

export default function DispatchAnalyze() {
    const [dispatchers, setDispatchers] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [visable, setVisable] = useState(false);
    const { sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-all-dispatchers.php", "POST").then(e => setDispatchers(JSON.parse(e)))
    }, [])

    // functions 

    function openModal(id){
        setVisable(true);
        sendRequest("https://imbgroup.uz/get-dispatch-data.php", "POST", {id})
            .then(e => setModalData(JSON.parse(e)));
    }
    return <>
        <Header></Header>
        <main className="dispatch-analyze p-20 mt-70">
            <div className="list-of-dispatchers">
                {(visable)?<div className="modal">
                <div className="modal-body p-20 border">
                    <i style={{marginLeft: "100%", cursor:"pointer"}} onClick={()=>setVisable(false)} className="fi fi-rr-cross"></i>
                    <ListOfOrdersNext arrayOforders={modalData}></ListOfOrdersNext>
                </div>
            </div>:null}
                
                <table>
                    <tr>
                        <td>Ism</td>
                        <td>Qaytarilgan so`rovlar</td>
                        <td>Aktiv so`rovlar</td>
                        <td>Yakunlangan so`rovlar</td>
                    </tr>

                    {dispatchers.map(e => {
                        return <tr className="dispatchers" key={e.id}>
                            <td>{e.name}</td>
                            <td>{e.reject}</td>
                            <td>{e.current}</td>
                            <td>{e.success}</td>
                            <td onClick={() =>openModal(e.id)}>
                                <i className="fi fi-rr-menu-burger"></i>
                            </td>
                        </tr>
                    })}
                </table>
            </div>
        </main>
    </>
}