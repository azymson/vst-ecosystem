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
    const [type, setType] = useState(4);

    const { sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-registery.php", "POST").then(
            (response) => {
                setArrayOfOrders(JSON.parse(response));
                
            }
        );
        //eslint-disable-next-line
    }, []);
    function refresh() {
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
            <main className="p-20 mt-70 status-page">
                <div className="border p-20 mb-20 row">
                    Sapkod
                    <input type="text" value={sapcode} onChange={e => setSapcode(e.target.value)} placeholder="Sapkod" />
                    Firma nomi
                    {/* <input type="text" value={OrgName} onChange={e => setOrgName(e.target.value)} placeholder="Firma nomi" /> */}
                    <select value={OrgName} onChange={e => setOrgName(e.target.value)}>
                        <option value="" selected disabled>Firma nomini tanlang</option>
                        <option value="XORAZM PULSAR SAVDO">XORAZM PULSAR SAVDO</option>
                        <option value="YASHIL VOHA SAVDO">YASHIL VOHA SAVDO</option>
                        <option value="ZAMIN DRINK WORLD">ZAMIN DRINK WORLD</option>
                        <option value="XORAZM OSIYO TRADE">XORAZM OSIYO TRADE</option>
                        <option value="XORAZM PULSAR SAVDO">XORAZM PULSAR SAVDO</option>
                        <option value="TOMIRIS WIDE">TOMIRIS WIDE</option>
                        <option value="TRADE KING">TRADE KING</option>
                        <option value="UMID">UMID</option>
                        <option value="URGENCH">URGENCH</option>
                        <option value="VODIY SALQIN ICHIMLIKLARI">VODIY SALQIN ICHIMLIKLARI</option>
                        <option value="XIVA CHINOR">XIVA CHINOR</option>
                        <option value="SANGZAR TOSH">SANGZAR TOSH</option>
                        <option value="SHINE DRINK">SHINE DRINK</option>
                        <option value="SOFT DRINKS FERGANA">SOFT DRINKS FERGANA</option>
                        <option value="SOFT DRINKS KOKAND">SOFT DRINKS KOKAND</option>
                        <option value="SOFT FINANCE TRADE">SOFT FINANCE TRADE</option>
                        <option value="SURXON MEGA FRUIT">SURXON MEGA FRUIT</option>
                        <option value="POSITTI">POSITTI</option>
                        <option value="PRODUCT WATER">PRODUCT WATER</option>
                        <option value="PRODUCTS WATER PRODUCTS WATER">PRODUCTS WATER PRODUCTS WATER</option>
                        <option value="PROMENADA PREMIUM PROGRES">PROMENADA PREMIUM PROGRES</option>
                        <option value="SAMARKAND CCI">SAMARKAND CCI</option>
                        <option value="SANDIDA TRADE">SANDIDA TRADE</option>
                        <option value="NAMANGAN CCI">NAMANGAN CCI</option>
                        <option value="NAVOIY BINAFSHA SAVDO">NAVOIY BINAFSHA SAVDO</option>
                        <option value="NIKEL-TITAN">NIKEL-TITAN</option>
                        <option value="PIAR">PIAR</option>
                        <option value="PIT-STOP PREMIUM">PIT-STOP PREMIUM</option>
                        <option value="KRISTALL VOHA SAVDO">KRISTALL VOHA SAVDO</option>
                        <option value="MARHAMAT KELAJAK NURI">MARHAMAT KELAJAK NURI</option>
                        <option value="MEGA STAR">MEGA STAR</option>
                        <option value="MEGA ZAVOD">MEGA ZAVOD</option>
                        <option value="GREEN PROCESSING">GREEN PROCESSING</option>
                        <option value="HAVAS">HAVAS</option>
                        <option value="HAYOT TRANS">HAYOT TRANS</option>
                        <option value="IDEAL BIZNES INVEST">IDEAL BIZNES INVEST</option>
                        <option value="ISTIQLOL SHIRIN BULOGI">ISTIQLOL SHIRIN BULOGI</option>
                        <option value="KOMFORT-BUXARA">KOMFORT-BUXARA</option>
                        <option value="AFA EXECUTION">AFA EXECUTION</option>
                        <option value="AGRO BREND BUSINESS">AGRO BREND BUSINESS</option>
                        <option value="AS BIZNESS KASIMOV">AS BIZNESS KASIMOV</option>
                        <option value="BARAKA INVEST">BARAKA INVEST</option>
                        <option value="BAZAR WHOLESALE">BAZAR WHOLESALE</option>
                        <option value="BENCH MARKET">BENCH MARKET</option>
                        <option value="BRAND LIFE LUX">BRAND LIFE LUX</option>
                        <option value="BUXORO CCI">BUXORO CCI</option>
                        <option value="COOL-LIFE">COOL-LIFE</option>
                        <option value="DRINK TASTY">DRINK TASTY</option>
                        <option value="FARGO MARKETING">FARGO MARKETING</option>
                        <option value="Gold Lion">Gold Lion</option>
                    </select>

                    Status
                    <select value={type} onChange={(e) => { setType(e.target.value) }}>
                        <option value="2">Start</option>
                        <option value="6">Zavodga yetib keldi</option>
                        <option value="4">Yuklab chiqdi</option>
                    </select>
                    <button onClick={editSelectedData}>{(!loading1) ? "O`zgartirish" : "Jon`atilmoqda"}</button>
                </div>
                <ListOfOrdersNext
                    select={select}
                    clickFunc={(context) => onListClick(context)}
                    setSelect={setSelect}
                    arrayOforders={arrayOfOrders}
                    selectable={true}
                    deletable={true}
                    refresh={refresh}
                    rejectable={true}
                    fixed={true}
                />
            </main>
        </>
    );
}
