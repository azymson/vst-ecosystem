import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import "./StatusPage.css";
import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";
export default function StatusPage() {
    const [arrayOfOrders, setArrayOfOrders] = useState([]);
    const [select, setSelect] = useState("");
    const [loading1, setLoading1] = useState(false);
    const [sapcode, setSapcode] = useState("");
    const [OrgName, setOrgName] = useState("");
    const [type, setType] = useState("");

    const { sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-registery.php", "POST").then(
            (response) => {
                console.log(response);
                setArrayOfOrders(JSON.parse(response));
            }
        );
        //eslint-disable-next-line
    }, []);
    function refresh(){
        sendRequest("https://imbgroup.uz/get-registery.php", "POST").then(
            (response) => {
                setArrayOfOrders(JSON.parse(response));
            }
        );
    }

    function onListClick({ sapcode, id, orgName, type }) {
        setOrgName(orgName);
        setSapcode(sapcode);
        setSelect(id);
        setType(type);
    }
    function editSelectedData() {
        setLoading1(true);
        sendRequest("https://imbgroup.uz/set-loaded.php", "POST", {
            id: select,
            type: type,
            sapcode: sapcode,
            orgName: OrgName
        }).then((response) => {
            setLoading1(false);
            sendRequest("https://imbgroup.uz/get-registery.php", "POST").then(
                (response1) => {
                    setArrayOfOrders(JSON.parse(response1));
                    customAlert(response, "success");
            }
        );
        });
    }
    return (
        <>
            <Header />
            <main className="p-20 mt-70">
                <div className="border p-20 mb-20 row">
                    Sapkod
                    <input type="text" value={sapcode} onChange={e=>setSapcode(e.target.value)} placeholder="Sapkod" />
                    Firma nomi
                    <input type="text" value={OrgName} onChange={e=>setOrgName(e.target.value)} placeholder="Firma nomi" />
                    Status
                    <select value={type} onChange={(e)=>{setType(e.target.value)}}>
                        <option value="2">Start</option>
                        <option value="4">Yuklab chiqdi</option>
                        <option value="5">Finish</option>
                    </select>
                    <button onClick={editSelectedData}>{(!loading1)?"O`zgartirish":"Jon`atilmoqda"}</button>
                </div>
                <ListOfOrdersNext
                    select={select}
                    clickFunc={(context) => onListClick(context)}
                    setSelect={setSelect}
                    arrayOforders={arrayOfOrders}
                    selectable={true}
                    deletable={true}
                    refresh={refresh}
                />
            </main>
        </>
    );
}
