import { useRef, useState } from "react";
import Header from "../../components/header/header";
// import ListOfOrders from "../../components/listOfOrders/listOfOrders";
import "./AnalyzePage.css";
import useHTTP from "../../hooks/useWeb";
import { useEffect } from "react";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import customAlert from "../../hooks/useAlert";

export default function AnalyzePage() {

    const [loading, setLoading] = useState(false);
    const { sendRequest } = useHTTP();
    const [select, setSelect] = useState("");
    const [reject, setReject] = useState(false);
    const [rejectLatter, setRejectLatter] = useState("");
    const [carName, setCarName] = useState("");
    const [carID, setCarID] = useState("");
    const [supCarID, setSupID] = useState("");
    const [supCarType, setSupCarType] = useState("");
    const [fio, setFio] = useState("");
    const [tel, setTel] = useState("");
    const [carType, setCarType] = useState("");
    const [sapcode, setSapcode] = useState("");
    const [orgName, setOrgName] = useState("");
    const [sum, setSum] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [arrayOforders, setArrayOforders] = useState([]);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);


    useEffect(() => {
        if (
            localStorage.getItem("login") === null &&
            localStorage.getItem("password") === null
        ) {
            window.location.href = "./";
        }
        sendRequest("https://imbgroup.uz/get-list.php", "POST")
            .then(e => {
                setArrayOforders(JSON.parse(e));
            })
        //eslint-disable-next-line
    }, []);


    function acceptFunction() {
        setLoading(true);
        if (select !== "")
            sendRequest("https://imbgroup.uz/accept-request.php", "POST", {
                id: select,
                carID,
                from,
                to,
                carType,
                sapcode,
                orgName,
                supCarType,
                supCarID,
                sum,
                carName,
                fio,
                tel
            }).then((x) => {
                customAlert(x, "success");
                setLoading(false);
                setSelect("");
                sendRequest("https://imbgroup.uz/get-list.php", "POST")
                    .then(e => {
                        setArrayOforders(JSON.parse(e));
                    })
            });
        else {
            customAlert("Sorovni tanlang")
            setLoading(false);
        }
    }
    function rejectFunction() {
        sendRequest("https://imbgroup.uz/reject-request.php", "POST", {
            id: select,
            reject_latter: rejectLatter
        }).then((e) => alert(e));
    }
    function setAllData({ id, carName, carID, supCarID, supCarType, fio, tel, carType, sapcode, orgName, sum, from_p, to_p }) {
        console.log(carName);
        setSelect(id);
        setCarName(carName);
        setCarID(carID);
        setSupID(supCarID);
        setSupCarType(supCarType);
        setFio(fio);
        setTel(tel);
        setCarType(carType)
        setSapcode(sapcode ? sapcode : 0)
        setOrgName(orgName)
        setSum(sum);
        setFrom(from_p);
        setTo(to_p);
    }
    return (
        <>
            <Header></Header>

            <main className="analyze-page">

                <div className="registry-page border" onSubmit={(e) => e.preventDefault()}>
                    {/* <img src={headset} alt="" width={100}/> */}
                    <p>Buyurtmani tasdiqlash</p>
                    <input
                        onChange={(e) => setFrom(e.target.value)}
                        type="text"
                        id="Qayerdan"
                        name="Qayerdan"
                        placeholder="Qayerdan"
                        value={from}
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                    />
                    <input
                        onChange={(e) => setTo(e.target.value)}
                        type="text"
                        id="avtonumber"
                        name="avtonumber"
                        placeholder="Qayerga"
                        value={to}
                        onKeyDown={e => (e.key === "Enter") ? ref1.current.focus() : null}
                    />
                    <div className="row">
                        <input
                            ref={ref1}
                            onChange={(e) => setCarName(e.target.value)}
                            type="text"
                            id="avtonumber"
                            name="avtonumber"
                            placeholder="Avtomobil rusumi"
                            value={carName}
                            onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                        />
                        <input
                            onChange={(e) => setCarID(e.target.value)}
                            type="text"
                            id="carID"
                            name="carID"
                            placeholder="Avtomobil raqami"
                            value={carID}
                            onKeyDown={e => (e.key === "Enter") ? ref2.current.focus() : null}
                        />
                    </div>
                    <div className="row">
                        <input
                            ref={ref2}
                            onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                            onChange={(e) => setSupID(e.target.value)}
                            type="text"
                            id="supCarID"
                            name="supCarID"
                            placeholder="Pretsep raqmi"
                            value={supCarID}
                        />

                        <select
                            name="pretcepturi"
                            id="dfdfs"
                            value={supCarType}
                            onChange={(e) => setSupCarType(e.target.value)}
                            onKeyDown={e => (e.key === "Enter") ? ref3.current.focus() : null}>
                            <option value="TENT">TENT</option>
                            <option value="REF">REF</option>
                        </select>
                    </div>
                    <input
                        ref={ref3}
                        onChange={(e) => setFio(e.target.value)}
                        type="text"
                        name="sapkod"
                        placeholder="FIO"
                        value={fio}
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                    />
                    <input
                        onChange={(e) => setTel(e.target.value)}
                        type="text"
                        placeholder="Telefon raqami"
                        value={tel}
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                    />

                    <select
                        onChange={(e) => setCarType(e.target.value)}
                        name="avto"
                        id="avto"
                        value={carType}
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                    >
                        <option value="fura">Fura</option>
                        <option value="Isuzu (5t)">Isuzu (5t)</option>
                        <option value="Isuzu (10t)">Isuzu (10t)</option>
                        <option value="Labo">Labo</option>
                    </select>

                    <input
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                        onChange={(e) => setSapcode(e.target.value)}
                        type="text"
                        name="sapkod"
                        placeholder="Sapkod"
                        value={sapcode}
                    />
                    <input
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}

                        onChange={(e) => setOrgName(e.target.value)}
                        type="text"
                        placeholder="Firma nomi"
                        value={orgName}
                    />
                    <input
                        onChange={(e) => setSum(e.target.value)}
                        type="text"
                        name="sapkod"
                        placeholder="Summa"
                        value={sum}
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                    />
                    <div>
                        {reject ? (
                            <div className="reject-grid">
                                <input type="text" placeholder="Qaytarish sababi" value={rejectLatter} onChange={e => setRejectLatter(e.target.value)} />
                                <button onClick={rejectFunction}>OK</button>
                                <button onClick={() => setReject(false)}>Orqaga qaytish</button>
                            </div>
                        ) : (
                            <div className="reject-grid">
                                <button onClick={acceptFunction}>{(!loading) ? "Tasdiqlash" : "Yuborilmoqda..."}</button>
                                <button onClick={() => setReject(true)}>Qaytarish</button>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <ListOfOrdersNext
                        arrayOforders={arrayOforders}
                        header={"Tasdiqini kutayotganlar"}
                        clickFunc={(e) => { console.log(e); setAllData(e) }}
                        selectable={true}
                        select={select}
                        setSelect={setSelect}
                    />
                </div>

            </main>
        </>
    );
}
