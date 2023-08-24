import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import "./StatusPage.css"
import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";
export default function StatusPage() {
    const [arrayOfOrders, setArrayOfOrders] = useState([]);
    const [select, setSelect] = useState("");
    const [loading1, setLoading1] = useState(false)
    const { sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-registery.php", "POST")
            .then(response => setArrayOfOrders(JSON.parse(response)));
        //eslint-disable-next-line
    }, []);

    function setLoad() {
        setLoading1(true);
        sendRequest("https://imbgroup.uz/status-change.php", "POST", { id: select, hi: "hi" })
            .then(response => {
                customAlert(response, "success");
                setLoading1(false);
            })
    }
    function setAfterLoad(){
        sendRequest("https://imbgroup.uz/set-loaded.php", "POST", { id: select, hi: "hi" })
            .then(response => {
                customAlert(response, "success");
                setLoading1(false);
            })
    }
    function sendToRegistery(){
        sendRequest("https://imbgroup.uz/send-to-registry.php", "POST", { id: select, hi: "hi" })
            .then(response => {
                customAlert(response, "success");
                setLoading1(false);
            })
    }
    return (
        <>
            <Header />
            <main className="p-20 mt-70">
                <div className="row mb-20">
                    <button onClick={setLoad}>{(!loading1)?"Start":"Yuborilmoqda"}</button>
                    <button onClick={setAfterLoad}>Yuklap chiqdi</button>
                    <button onClick={sendToRegistery}>Finish</button>
                </div>
                <ListOfOrdersNext select={select} clickFunc={(context) => setSelect(context.id)} setSelect={setSelect} arrayOforders={arrayOfOrders} selectable={true} />
            </main>
        </>
    );
}
