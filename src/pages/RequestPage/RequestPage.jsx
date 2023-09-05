import "./RequestPage.css";
import Header from "../../components/header/header";
import EditablePopup from "../../components/advancedInput/advancedInput";
import { useEffect, useRef, useState } from "react";
import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
// import { useState } from "react";
export default function RequestPage() {
    /*eslint-disable*/
    const { sendRequest } = useHTTP();

    const [firmCode, setFirmCode] = useState("");
    const [selectedFromPlace, setSelectedFromPlace] = useState("Toshkent");
    const [selectedToPlace, setSelectedToPlace] = useState("Toshkent");
    const [selectedDate, setSelectedData] = useState(getCurrentDateFormatted());
    const [carCount, setCarCount] = useState(1);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [arrayOforders, setArrayOforders] = useState([]);
    const [score, setScore] = useState(0);

    const firmCodeRef = useRef(null);
    const selectedFromPlaceRef = useRef(null);
    const selectedToPlaceRef = useRef(null);
    const selectedDateRef = useRef(null);
    const carCountRef = useRef(null);
    const commentRef = useRef(null);
    const submitRef = useRef(null);

    
    useEffect(() => {
        firmCodeRef.current.focus();
    }, []);
    useEffect(() => {
        const interval = setInterval(
            () =>
                sendRequest("https://imbgroup.uz/get-request-list.php", "POST").then((response) => {
                    return setArrayOforders(JSON.parse(response));
                }),
            5000
        );
        return () => {
            clearInterval(interval);
        }; //eslint-disable-next-line
    }, [arrayOforders]);

    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-request-list.php", "POST")
            .then((e) => {
                setArrayOforders(JSON.parse(e));
            })
    }, [])

    function refresh() {
        sendRequest("https://imbgroup.uz/get-request-list.php", "POST")
            .then((e) => {
                setArrayOforders(JSON.parse(e));
            })
    }


    function handleKeyPress(event, nextInputRef) {
        if (event.key === 'Enter') {
            nextInputRef.current.focus();
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

            submitForm();
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
                    <input
                        type="text"
                        value={firmCode}
                        onChange={(e) => setFirmCode(e.target.value)}
                        placeholder="Firma kodi"
                        ref={firmCodeRef}
                        onKeyDown={(event) => { if (event.key === 'Enter') handleKeyPress(event, selectedFromPlaceRef) }}
                    />
                    
                    <div className="row">
                        {(firmCode === "101")?
                        <select onChange={(e)=>setSelectedFromPlace(e.target.value)}>
                            <option value="Toshkent">Bektemir</option>
                            <option value="F Toshkent">Family</option>
                        </select>:
                        <EditablePopup
                            Ref={selectedFromPlaceRef}
                            heading={"Qayerdan"}
                            onKeyDown={(event) => { { if (event.key === 'Enter') selectedToPlaceRef.current.focus() } }}
                            onSelectfunc={setSelectedFromPlace}
                        />}
                        <EditablePopup
                            Ref={selectedToPlaceRef}
                            heading={"Qayerga"}
                            onSelectfunc={setSelectedToPlace}
                            onKeyDown={(event) => { { if (event.key === 'Enter') carCountRef.current.focus() } }}
                        />
                    </div>
                    <input
                        type="text"
                        value={carCount}
                        ref={carCountRef}
                        onChange={(e) => setCarCount(e.target.value)}
                        onKeyDown={(event) => { if (event.key === 'Enter') { commentRef.current.focus() } }}
                        placeholder="Mashina soni"
                    />
                    <input
                        type="text"
                        value={comment}
                        ref={commentRef}
                        onKeyDown={(event) => { if (event.key === 'Enter') { selectedDateRef.current.focus() } }}
                        placeholder="Qoshimch malumot"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <input
                        type="text"
                        value={score}
                        placeholder="ball"
                        onChange={(e) => setScore(e.target.value)}
                    />
                    <input
                        type="date"
                        ref={selectedDateRef}
                        value={selectedDate}
                        onKeyDown={(event) => { if (event.key === 'Enter') { submitRef.current.focus() } }}
                        onChange={(e) => setSelectedData(e.target.value)}
                    />
                    <button onClick={(!loading) ? validate : null} ref={submitRef}>
                        {
                            !loading ? "Yangi so'rov ochish" : "Yuborilmoqda..."
                        }
                    </button>
                </div>
                {/* <ListOfOrders
                    url={"https://imbgroup.uz/get-request-list.php"}
                    header={"Sorovlar jadvali"}
                    download={false}
                    deletable={true}
                /> */}

                <ListOfOrdersNext
                    url={"https://imbgroup.uz/get-request-list.php"}
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
