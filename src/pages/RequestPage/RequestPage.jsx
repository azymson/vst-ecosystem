import "./RequestPage.css";
import Header from "../../components/header/header";
import EditablePopup from "../../components/advancedInput/advancedInput";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import useHTTP from "../../hooks/useWeb";

import customAlert from "../../hooks/useAlert";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import useHTTP1 from "../../hooks/useWeb copy";

// import { useState } from "react";
export default function RequestPage() {
    /*eslint-disable*/
    const { sendRequest1 } = useHTTP1();

    const [firmCode, setFirmCode] = useState("");
    const [selectedFromPlace, setSelectedFromPlace] = useState("Toshkent");
    const [selectedToPlace, setSelectedToPlace] = useState("Toshkent");
    const [selectedDate, setSelectedData] = useState(getCurrentDateFormatted());
    const [carCount, setCarCount] = useState(1);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [arrayOforders, setArrayOforders] = useState([]);
    const [score, setScore] = useState(0);
    const [codes, setCodes] = useState([105, 116])

    const firmCodeRef = useRef(null);
    const selectedFromPlaceRef = useRef(null);
    const selectedToPlaceRef = useRef(null);
    const selectedDateRef = useRef(null);
    const carCountRef = useRef(null);
    const commentRef = useRef(null);
    const submitRef = useRef(null);
    const socket = useRef(null);
    useEffect(() => {
        sendRequest1("https://imbgroup.uz/code-list.php", "POST")
            .then(e => {
                console.log(e);
                setCodes(JSON.parse(e).map(e => e.code));
            })
    }, [])
    useEffect(() => {
        firmCodeRef.current?.focus();
    }, []);
    useEffect(() => {
        const interval = setInterval(
            () =>
                sendRequest1("https://imbgroup.uz/get-request-list.php", "POST").then((response) => {
                    return setArrayOforders(JSON.parse(response));
                }),
            5000
        );
        return () => {
            clearInterval(interval);
        }; //eslint-disable-next-line
    }, [arrayOforders]);

    useEffect(() => {
        sendRequest1("https://imbgroup.uz/get-request-list.php", "POST")
            .then((e) => {
                setArrayOforders(JSON.parse(e));
            })
    }, []);

    useEffect(()=>{
        socket.current = io("http://localhost:3000");
        socket.current.on("order", ()=>{
            // refresh();
        })
        return ()=>{
            socket.current.disconnect();
        }
    },[]);

    function refresh() {
        sendRequest1("https://imbgroup.uz/get-request-list.php", "POST")
            .then((e) => {
                setArrayOforders(JSON.parse(e));
                socket.current.emit('order');
            })
    }


    function handleKeyPress(event, nextInputRef) {
        if (event.key === 'Enter') {
            nextInputRef.current?.focus();
        }
    };

    function getCurrentDateFormatted() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    }

    /*eslint-disable*/
    function submitForm() {

        const { sendRequest } = useHTTP();
        setLoading(true);
        sendRequest("https://imbgroup.uz/send-request.php", "POST", {
            firmCode,
            date: selectedDate,
            from: selectedFromPlace.replace(/['"]/g, '`'),
            to: selectedToPlace.replace(/['"]/g, '`'),
            counter: carCount,
            comment,
        }).then((response) => {
            setLoading(false);
            customAlert(response, "success");
            const { sendRequest } = useHTTP();
            sendRequest("https://imbgroup.uz/get-request-list.php", "POST")
                .then((e) => {
                    setArrayOforders(JSON.parse(e));
                })
        });
    }
    
    
    function validate() {
        const numberPattern = /^[0-9]+$/;
        let answer = true;
        if (firmCode.length < 1) {
            customAlert("firma kodi bo`sh bo`lishi mumkin emas", "alert");
            answer = false;
        }
        if (!numberPattern.test(firmCode)) {
            customAlert("firma kodi raqmlardan tashkil topgan", "alert");
            answer = false;
        }
        if (selectedFromPlace.length < 1) {
            customAlert("Qayerdan kelish bo`sh bo`lishi mumkin emas", "alert");
            answer = false;
        }
        if (selectedToPlace.length < 1) {
            customAlert("Qayerga borish bo`sh bo`lishi mumkin emas", "alert");
            answer = false;
        }
        if (carCount.length < 1) {
            answer = false;
            customAlert("Mashina soni bo`sh bo`lishi mumkin emas", "alert");
        }
        if (!numberPattern.test(carCount)) {
            answer = false;
            customAlert("Mashina soni raqmlardan tashkil topgan", "alert");
        }
        if (answer) {
            socket.current.emit('order');
            // submitForm();
        }

    }
    function customFrom() {
        switch (firmCode) {
            case "101": return <select onChange={(e) => setSelectedFromPlace(e.target.value)}>
                <option option disabled selected>Yonalishlar</option>
                <option value="Bektemir">Bektemir</option>
                <option value="F Toshkent">Family</option>
            </select>
            case "102": return <select onChange={(e) => setSelectedFromPlace(e.target.value)}>
                <option disabled selected>Yonalishlar</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Shaxrisabz">Shaxrisabz</option>
                <option value="Toshkent">Toshkent</option>
                <option value="Urganch">Urganch</option>
                <option value="Xorazm">Xorazm</option>
            </select>
            case "105": return <select onChange={(e) => setSelectedFromPlace(e.target.value)}>
                <option disabled selected>Yonalishlar</option>
                <option value="Xonobod">Xonobod</option>
                <option value="Qumariq">Qumariq</option>
                <option value="G`azalkent">G'azalkent</option>
            </select>
            case "116": return <select onChange={(e) => setSelectedFromPlace(e.target.value)}>
                <option disabled selected>Yonalishlar</option>
                <option value="Xonobod">Xonobod</option>
                <option value="Qumariq">Qumariq</option>
                <option value="G`azalkent">G'azalkent</option>
            </select>
            case "301": return <select onChange={(e) => setSelectedFromPlace(e.target.value)}>
                <option disabled selected>Yonalishlar</option>
                <option value="Urganch" >Urganch</option>
                <option value="Namangan" >Namangan</option>
            </select>
            case "201": return <select onChange={(e) => setSelectedFromPlace(e.target.value)}>
                <option disabled selected>Yonalishlar</option>
                <option value="Andijon" >Andijon</option>
                <option value="Buxoro" >Buxoro</option>
                <option value="Chiroqchi" >Chiroqchi</option>
                <option value="Fargona" >Farg'ona</option>
                <option value="Jizzax" >Jizzax</option>
                <option value="Denov" >Denov</option>
                <option value="Kitob" >Kitob</option>
                <option value="Namangan" >Namangan</option>
                <option value="Navoiy" >Navoiy</option>
                <option value="Ohangaron" >Ohangaron</option>
                <option value="Pop" >Pop</option>
                <option value="Qarshi" >Qarshi</option>
                <option value="Qoqon" >Qo'qon</option>
                <option value="Samarqand" >Samarqand</option>
                <option value="Sirdaryo" >Sirdaryo</option>
                <option value="Toshkent" >Toshkent</option>
                <option value="Urgench" >Urgench</option>
                <option value="Yangiyo`l" >Yangiyo'l</option>
                <option value="Zarafshon">Zarafshon</option>
                <option value="Chirchiq">Chirchiq</option>
            </select>
            default: return <EditablePopup
                Ref={selectedFromPlaceRef}
                heading={"Qayerdan"}
                onKeyDown={(event) => { { if (event.key === 'Enter') selectedToPlaceRef.current?.focus() } }}
                onSelectfunc={setSelectedFromPlace}
            />
        }
    }
    function filterCode() {
        if (codes.length === 0) {
            return <input
                type="text"
                value={firmCode}
                onChange={(e) => setFirmCode(e.target.value)}
                placeholder="Firma kodi"
                ref={firmCodeRef}
                onKeyDown={(event) => { if (event.key === 'Enter') handleKeyPress(event, selectedFromPlaceRef) }}
            />
        } else {
            return <select onChange={(d) => setFirmCode(d.target.value)}>
                <option selected disabled>Kodni tanlang</option>
                {codes.map((e, i) => <option key={i}>{e}</option>)}
            </select>
        }

    }
    return (
        <>
            <Header />
            <main className="request-page">
                <div className="nav border p-20 mb-20">
                    <div>ASOSIY SAHIFA</div>
                    <div>/</div>
                    <div>SOROV BERISH</div>
                </div>
                <div className="request-page__form border" onSubmit={submitForm}>
                    Yangi sorov ochish
                    {filterCode()}
                    <div className="row">
                        {
                            customFrom()
                        }
                        <EditablePopup
                            Ref={selectedToPlaceRef}
                            heading={"Qayerga"}
                            onSelectfunc={setSelectedToPlace}
                            onKeyDown={(event) => { { if (event.key === 'Enter') carCountRef.current?.focus() } }}
                        />
                    </div>
                    <input
                        type="text"
                        value={carCount}
                        ref={carCountRef}
                        onChange={(e) => setCarCount(e.target.value)}
                        onKeyDown={(event) => { if (event.key === 'Enter') { commentRef.current?.focus() } }}
                        placeholder="Mashina soni"
                    />
                    <input
                        type="text"
                        value={comment}
                        ref={commentRef}
                        onKeyDown={(event) => { if (event.key === 'Enter') { selectedDateRef.current?.focus() } }}
                        placeholder="Qoshimch malumot"
                        onChange={(e) => setComment(e.target.value)}
                    />

                    <input
                        type="date"
                        ref={selectedDateRef}
                        value={selectedDate}
                        onKeyDown={(event) => { if (event.key === 'Enter') { submitRef.current?.focus() } }}
                        onChange={(e) => setSelectedData(e.target.value)}
                    />
                    <button onClick={(!loading) ? validate : null} ref={submitRef}>
                        {
                            !loading ? "Yangi so'rov ochish" : "Yuborilmoqda..."
                        }
                    </button>
                </div>

                <ListOfOrdersNext
                    header={"Sorovlar jadvali"}
                    download={false}
                    deletable={true}
                    arrayOforders={arrayOforders}
                    refresh={refresh}
                />
            </main>
        </>
    );
}
