import { useEffect, useState } from "react"
import Header from "../../components/header/header"
import useHTTP from "../../hooks/useWeb";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import customAlert from "../../hooks/useAlert";
export default function LocationPage(){
    const [data, setData] = useState([]);
    const {sendRequest} = useHTTP();
    const [select, setSelect] = useState("");
    const [loading1, setLoading1] = useState(false);
    const [type, setType] = useState(5);
    useEffect(()=>{
        sendRequest("https://imbgroup.uz/get-location-list.php","POST")
            .then(e=>{
                setData(JSON.parse(e));
            })
    }, [])
    function editSelectedData() {
        setLoading1(true);
        sendRequest("https://imbgroup.uz/location.php", "POST", {
            id: select,
            type: type,
        }).then((response) => {
            setLoading1(false);
            sendRequest("https://imbgroup.uz/get-location-list.php", "POST").then(
                (response1) => {
                    setData(JSON.parse(response1));
                    customAlert(response, "success");
                }
            );
        });
    }
    function onListClick({ id }) {
        setSelect(id);
    }
    return <>
        <Header></Header>
        
        <main className="p-20 mt-70">
        <div className="border p-20 mb-20 row">
                    
                    {/* <input type="text" value={OrgName} onChange={e => setOrgName(e.target.value)} placeholder="Firma nomi" /> */}
                    Status
                    <select value={type} onChange={(e) => { setType(e.target.value) }}>
                        <option value="4">Yuklab chiqdi</option>
                        <option value="5">Lokatsiya berildi</option>
                        <option value="6">Zavodga yetib keldi</option>
                        <option value="7">Finish</option>
                    </select>
                    <button onClick={editSelectedData}>{(!loading1) ? "O`zgartirish" : "Jon`atilmoqda"}</button>
                </div>
            <ListOfOrdersNext 
            arrayOforders={data} 
            setSelect={setSelect} 
            selectable={true}
            select={select}
            clickFunc={(context) => onListClick(context)}
            />
        </main>
        
    </>
}