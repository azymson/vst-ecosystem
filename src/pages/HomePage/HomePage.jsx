import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import useHTTP from "../../hooks/useWeb";
import "./HomePage.css";
import { Link } from "react-router-dom";
export default function HomePage() {
    if (
        localStorage.getItem("login") === null &&
        localStorage.getItem("password") === null
    ) {
        window.location.href = "./";
    }
    const [table, setTable] = useState([]);

    const fullName = localStorage.getItem("name") + " " + localStorage.getItem("second_name");
    const { sendRequest } = useHTTP();
    useEffect(() => {
        sendRequest("https://imbgroup.uz/prev-list.php", "POST").then(e => {
            const data = JSON.parse(e).map(({ prev }) => prev);
            setTable(data)
        });
    }, [])

    return (
        <>  
            <Header></Header>
            
            <main className="home-page p-20">
                <div className="box-grid">
                    <div className="box account">
                        <h2>
                            <i className="fi fi-rr-user"></i>
                        </h2>
                        <h3>{fullName}</h3>
                        <h4>Akkaunt haqida</h4>
                    </div>
                    {(!table.includes("0")) ? null : <Link to={"/request"}>
                        <div className="box ">
                            <h2>
                                <i className="fi fi-rr-pencil"></i>
                            </h2>
                            <h3>Sorov berish</h3>
                            <h4>Yangi so`rov ochish</h4>
                        </div>
                    </Link>}
                    {(!table.includes("1")) ? null : <Link to={"/register"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-settings-sliders"></i>
                            </h2>
                            <h3>Sorovni toldirish</h3>
                            <h4>Qo’shimcha ma’lumot kiritish</h4>
                        </div>
                    </Link>}
                    {(!table.includes("2")) ? null : <Link to={"/analyze"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-microscope"></i>
                            </h2>
                            <h3>Sorovni analiz qilish</h3>
                            <h4>So’ngi analiz</h4>
                        </div>
                    </Link>}
                    {(!table.includes("4")) ? null : <Link to={"/reject"}>
                        <div className="box">
                            <h3>QAYTARIB YUBORILGAN SO’ROVLAR</h3>
                            <h4>Qaytarib yuborilgan so’rovlar analizi</h4>
                            <h2>
                                <i className="fi fi-rr-cross"></i>
                            </h2>
                        </div>
                    </Link>}
                    {(!table.includes("5")) ? null : <Link to={"/dispatch"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-headset"></i>
                            </h2>
                            <h3>Dispetcherlik</h3>
                            <h4>Dispetcherlar bo’limi</h4>
                        </div>
                    </Link>}
                    {(!table.includes("8")) ? null : <Link to={"/status"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-eye"></i>
                            </h2>
                            <h3>Status</h3>
                            <h4>Yuk statusi</h4>
                        </div>
                    </Link>}
                    {(!table.includes("3")) ? null : <Link to={"/overview"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-list-check"></i>
                            </h2>
                            <h3>Reyestr</h3>
                            <h4>Umumiy reyestr</h4>
                        </div>
                    </Link>}
                    {(!table.includes("6")) ? null : <Link to={"/account"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-key"></i>
                            </h2>
                            <h3>Akkauntlar nazorati</h3>
                            <h4>Akkaunt qo`shish va o`chirish</h4>
                        </div>
                    </Link>}
                    {(!table.includes("7")) ? null : <Link to={"/dispatch-analyze"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-users"></i>
                            </h2>
                            <h3>Dispetcherlar nazorati</h3>
                            <h4>Dispetcherlar so`ro`vlar davomati</h4>
                        </div>
                    </Link>}
                    {(!table.includes("9")) ? null : <Link to={"/location"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-marker"></i>
                            </h2>
                            <h3>Lokatsiya</h3>
                            <h4>Lokatsiya berish</h4>
                        </div>
                    </Link>}
                    {(!table.includes("99")) ? null : <Link to={"/force"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-flame"></i>
                            </h2>
                            <h3>Fors major</h3>
                            <h4>Noodatiy holatlar</h4>
                        </div>
                    </Link>}
                    {(!table.includes("10")) ? null :<Link to={"/cash"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-coins"></i>
                            </h2>
                            <h3>Pul tarqatish</h3>
                            <h4>Pul tarqatish bo`limi</h4>
                        </div>
                    </Link>}
                    {(!table.includes("14")) ? null :<Link to={"/card"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-coins"></i>
                            </h2>
                            <h3>Pul tarqatish (Plastik)</h3>
                            <h4>Pul tarqatish bo`limi</h4>
                        </div>
                    </Link>}
                    {(!table.includes("11")) ? null :<Link to={"/money"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-dollar"></i>
                            </h2>
                            <h3>Kassa</h3>
                            <h4>Pul tarqatish bo`limi</h4>
                        </div>
                    </Link>}
                    {(!table.includes("13")) ? null :<Link to={"/history"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-time-past"></i>
                            </h2>
                            <h3>Tarix</h3>
                            <h4>Pul tarqatish bo`limi</h4>
                        </div>
                    </Link>}
                     {(!table.includes("12")) ? null :<Link to={"/fill"}>
                        <div className="box">
                            <h2>
                                <i className="fi fi-rr-sack-dollar"></i>
                            </h2>
                            <h3>Bosh kassa</h3>
                            <h4>Pul tarqatish bo`limi</h4>
                        </div>
                    </Link>}
                    
                </div>
            </main>
        </>
    );
}
