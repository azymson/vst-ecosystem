import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/header";
import "./Registry.css";
import useHTTP from "../../hooks/useWeb";
import ListOfOrders from "../../components/listOfOrders/listOfOrders";
import customAlert from "../../hooks/useAlert";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";

export default function RegistryPage() {
    const supRef = useRef(null);
    const carNameRef = useRef(null);

    if (
        localStorage.getItem("login") === null &&
        localStorage.getItem("password") === null
    ) {
        window.location.href = "./";
    }

    const { sendRequest } = useHTTP();
    const [arrayOforders, setArrayOforders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [carID, setCarID] = useState("");
    const [carType, setCarType] = useState("Fura");
    const [orgName, setOrgName] = useState("");
    const [supCarType, setSupCarType] = useState("REF");
    const [supCarID, setSupID] = useState("");
    const [sum, setSum] = useState("");
    const [carName, setCarName] = useState("");
    const [fio, setFio] = useState("");
    const [tel, setTel] = useState("");
    const [id, setID] = useState("");
    const [select, setSelect] = useState("");

    function sendMessageToBot() {
        const numberPattern = /^[0-9]+$/;
        let answer = true;
        if (carID.length === 0) {
            customAlert("Mashina raqamini kiritish kerak");
            answer = false;
        }
        if (supCarID.length === 0) {
            customAlert("Mashina pretsep raqamini kiritish kerak");
            answer = false;
        }
        if (carName.length === 0) {
            customAlert("Mashina rusumini kiritish kerak");
            answer = false;
        }
        if (fio.length === 0) {
            customAlert("Familiya ismni kiritish kerak");
            answer = false;
        }
        if (numberPattern.test(fio)) {
            customAlert("Familiya ism faqat hariflardan tashkil topgan");
            answer = false;
        }
        if (tel.length === 0) {
            customAlert("Telefon raqmini kiritish kerak");
            answer = false;
        }
        if (sum.length === 0) {
            customAlert("Summani kiritish kerak");
            answer = false;
        }
        if (!numberPattern.test(tel)) {
            customAlert("Telefon raqami faqat raqamlardan tashkil topishi kerak");
            answer = false;
        }
        if (!(tel.length === 9)) {
            customAlert("Telefon raqami uzunligi 9 ta bo'lishi kerak");
            answer = false;
        }

        if (id === "" || id === undefined || id === null) {
            customAlert("So'rov tanlanmagan. Iltimos so'rovni tanlang");
            answer = false;
        }

        if (!numberPattern.test(sum)) {
            customAlert("Summa raqamlardan tashkil topgan bolishi kerak");
            answer = false;
        }

        if (answer){
            setLoading(true);
            sendRequest("https://imbgroup.uz/post-product.php", "POST", {
                carType,
                orgName,
                supCarType,
                supCarID,
                sum,
                carName,
                fio,
                tel,
                id,
                carID
            }).then((e) => {
                setLoading(false);
                customAlert(e, "success");
                setID("");
                sendRequest("https://imbgroup.uz/get-request-dispatch.php", "POST")
                    .then(e => {
                        setArrayOforders(JSON.parse(e));
                    })
            });}
    }

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-request-dispatch.php", "POST")
            .then(e => {
                console.log(e);
                setArrayOforders(JSON.parse(e));
            })
    }, []);

    useEffect(() => {
        const interval = setInterval(
            () =>
                sendRequest("https://imbgroup.uz/get-request-dispatch.php", "POST")
                    .then(e => {
                        console.log(e);

                        setArrayOforders(JSON.parse(e));
                    }),
            5000
        );
        return () => {
            clearInterval(interval);
        }; //eslint-disable-next-line
    }, [arrayOforders]);


    return (
        <>
            <Header />
            <main className="p-20 grid-row mt-70">
                <div className="registry-page border">
                    {/* <img src={headset} alt="" width={100}/> */}
                    <p>Buyurtmani tasdiqlash</p>

                    <div className="row">
                        <input

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
                            onKeyDown={e => (e.key === "Enter") ? supRef.current.focus() : null}
                        />
                    </div>
                    <div className="row">
                        <input
                            onChange={(e) => setSupID(e.target.value)}
                            type="text"
                            id="supCarID"
                            name="supCarID"
                            placeholder="Pretsep raqmi"
                            value={supCarID}
                            ref={supRef}
                            onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                        />

                        <select
                            name="pretcepturi"
                            id="dfdfs"
                            value={supCarType}
                            onChange={(e) => setSupCarType(e.target.value)}
                            onKeyDown={e => (e.key === "Enter") ? carNameRef.current.focus() : null}
                        >
                            <option value="TENT">TENT</option>
                            <option value="REF">REF</option>
                        </select>
                    </div>
                    <input
                        ref={carNameRef}
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
                        name="sapkod"
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
                        onChange={(e) => setOrgName(e.target.value)}
                        type="text"
                        placeholder="Firma nomi"
                        value={orgName}
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                    />
                    <input
                        onChange={(e) => setSum(e.target.value)}
                        type="text"
                        name="sapkod"
                        placeholder="Summa"
                        value={sum}
                        onKeyDown={e => (e.key === "Enter") ? e.target.nextSibling.focus() : null}
                    />
                    <button onClick={sendMessageToBot}>{loading ? "Jonatilmoqda..." : "Jonatish"}</button>

                </div>
                <div>
                    <div className="border p-20">
                        <ListOfOrdersNext
                            arrayOforders={arrayOforders}
                            header={"Sorovlar"}
                            clickFunc={(e) => setID(e.id)}
                            selectable={true}
                            select={select}
                            setSelect={setSelect}
                        />
                    </div>
                    
                </div>
            </main>
        </>
    );
}
