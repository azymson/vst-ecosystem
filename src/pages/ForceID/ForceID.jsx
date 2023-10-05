import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import customAlert from "../../hooks/useAlert";
import useHTTP from "../../hooks/useWeb";
import "./ForceID.css";

export default function ForceID() {
    const { id } = useParams();
    const { sendRequest } = useHTTP();
    const [data, setData] = useState({});

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-order.php", "POST", { id }).then((e) =>
           { setData(JSON.parse(e))
            console.log(e);}
            );
    },[]);
    function forsChange() {
        sendRequest("https://imbgroup.uz/force-change.php", "POST", data).then(
            (e) => {
                customAlert(e, "success");
                sendRequest("https://imbgroup.uz/get-order.php", "POST", { id }).then(
                    (e) => setData(JSON.parse(e))
                );
            }
        );
    }
    const arrayOfHeaders = {
        id: "id",
        firmCode: "Firma kodi",
        from_p: "Qayerdan",
        to_p: "Qayerga",
        reg_date: "Sana",
        type: "Status",
        carID: "Mashina raqami",
        carType: "Mashina turi",
        carName: "Mashina nomi",
        sapcode: "Sapkod",
        orgName: "Firma nomi",
        supCarType: "Pretsep turi",
        supCarID: "Pretsep raqami",
        sum: "Summa",
        tel: "Telefon raqam",
        comment: "Qoshimcha ma`lumot",
        dispatcher: "Dispetcher",
        reject_comment: "Qaytarish sababi",
        fio: "FIO",
        request_time: "So'rov vaqti",
    };
    return (
        <>
            <Header></Header>
            <main className="mt-70 p-20">
                <div className="nav border p-20 mb-20">
                    <a href="/">ASOSIY SAHIFA</a>
                    <div>/</div>
                    <a href="/force">FORS MAJOR</a>
                    <div>/</div>
                    <div>{id}</div>
                </div>
                <div className="border p-20 groups">
                    {Object.keys(data).map((e) => (
                        <div className="input-block" key={e}>
                            {arrayOfHeaders[e] !== undefined?arrayOfHeaders[e]:e}
                            <input
                                type={"text"}
                                onChange={(j) => setData({ ...data, [e]: j.target.value })}
                                value={data[e]}
                            />
                        </div>
                    ))}
                    <button onClick={forsChange}>Jonatish</button>
                    <button onClick={()=>window.location.href = "/force"}>Orqaga qaytish</button>
                </div>
            </main>
        </>
    );
}
