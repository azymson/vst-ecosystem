import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./AccountPage.css";
import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";

export default function AccountPage() {
    const { sendRequest } = useHTTP();
    const [newLogin, setNewLogin] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [name, setName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [arrayOfUsers, setArrayOfUsers] = useState([]);
    const [mode, setMode] = useState("create");
    const [func0, setFunc0] = useState(false);
    const [func1, setFunc1] = useState(false);
    const [func2, setFunc2] = useState(false);
    const [func3, setFunc3] = useState(false);
    const [func4, setFunc4] = useState(false);
    const [func5, setFunc5] = useState(false);
    const [func6, setFunc6] = useState(false);
    const [func7, setFunc7] = useState(false);
    const [func8, setFunc8] = useState(false);
    const [func9, setFunc9] = useState(false);
    const [func10, setFunc10] = useState(false);

    const [loading, setLoading] = useState(false);
    const [arrayOfOrders, setArrayOfOrders] = useState([]);
    const [newCode, setNewCode] = useState("");
    //eslint-disable-next-line
    useEffect(() => getListOfAccounts(), []);

    const createAccount = () => {
        let answer = true;
        if (name.length === 0) {
            customAlert("Ism bo'sh bo'lishi mumkin emas");
            answer = false;
        }
        if (secondName.length === 0) {
            customAlert("Familiya bo'sh bo'lishi mumkin emas");
            answer = false;
        }
        if (newLogin.length < 6) {
            customAlert("Login uzunligi 6 ta belgidan kam bo'lishi mumkin emas");
            answer = false;
        }
        if (newPassword.length < 6) {
            customAlert("Parol uzunligi 6 ta belgidan kam bo'lishi mumkin emas");
            answer = false;
        }
        if (newPassword !== newPassword2) {
            customAlert("Parollar mos kelmayapti");
            answer = false;
        }

        if (answer)
            sendRequest("https://imbgroup.uz/create-account.php", "POST", {
                name: name,
                second_name: secondName,
                vacancy: 0,
                new_login: newLogin,
                new_password: newPassword,
                fuctions: {
                    func0,
                    func1,
                    func2,
                    func3,
                    func4,
                    func5,
                    func6,
                    func7,
                    func8,
                    func9,
                    func10
                },codes: arrayOfOrders
            }).then((e) => {
                console.log(e);
                if (e.split(" ")[0] === "Duplicate") {
                    customAlert("Bunday login mavjud");
                } else {
                    customAlert(e, "success");
                }
                sendRequest("https://imbgroup.uz/get-all-user.php", "POST").then(
                    (e) => {
                        setArrayOfUsers(JSON.parse(e));
                    }
                );
            });
    };

    const editAccount = () => {
        sendRequest("https://imbgroup.uz/edit-account.php", "POST", {
            name: name,
            second_name: secondName,
            vacancy: 0,
            new_login: newLogin,
            new_password: newPassword,
            fuctions: {
                func0,
                func1,
                func2,
                func3,
                func4,
                func5,
                func6,
                func7,
                func8,
                func9,
                func10,
            },
            codes: arrayOfOrders
        }).then((response) => {
            
            customAlert(response, "success");
            console.log(response);
            sendRequest("https://imbgroup.uz/get-all-user.php", "POST").then((e) => {
                setArrayOfUsers(JSON.parse(e));
            });
        });
    };

    const getListOfAccounts = () => {
        sendRequest("https://imbgroup.uz/get-all-user.php", "POST").then((e) => {
            setArrayOfUsers(JSON.parse(e));
        });
    };
    const deleteAccount = (login) => {
        sendRequest("https://imbgroup.uz/delete-account.php", "POST", {
            new_login: login,
        }).then((e) => {
            customAlert(e, "success");
            sendRequest("https://imbgroup.uz/get-all-user.php", "POST").then((e) => {
                setArrayOfUsers(JSON.parse(e));
            });
        });
    };

    const setRecivedData = ({ name, second_name, login }) => {
        sendRequest("https://imbgroup.uz/get-functions.php", "POST", {
            selectedId: login,
        }).then((response) => {
            setFunc0(false);
            setFunc1(false);
            setFunc2(false);
            setFunc3(false);
            setFunc4(false);
            setFunc5(false);
            setFunc6(false);
            setFunc7(false);
            setFunc8(false);
            setFunc9(false);
            setFunc10(false);
            const data = JSON.parse(response);
            data
                .map((e) => e.prev)
                .forEach((e) => {
                    switch (e) {
                        case "0":
                            setFunc0(true);
                            break;
                        case "1":
                            setFunc1(true);
                            break;
                        case "2":
                            setFunc2(true);
                            break;
                        case "3":
                            setFunc3(true);
                            break;
                        case "4":
                            setFunc4(true);
                            break;
                        case "5":
                            setFunc5(true);
                            break;
                        case "6":
                            setFunc6(true);
                            break;
                        case "7":
                            setFunc7(true);
                            break;
                        case "8":
                            setFunc8(true);
                            break;
                        case "9":
                            setFunc9(true);
                            break;
                        case "10":
                            setFunc10(true)
                    }
                });
        });
        sendRequest("https://imbgroup.uz/code-list-id.php", "POST",{
            logins:login
        }).then(
            (e) => {
                console.log(e);
                // setArrayOfOrders(JSON.parse(e));
                setArrayOfOrders(JSON.parse(e).map(z=>z.code));
            }
        );
        setName(name);
        setSecondName(second_name);
        setNewLogin(login);
        setMode("edit");
    };
    return (
        <>
            <Header></Header>
            <main className="account-page">
                <div className="heading">Yangi akkaunt</div>
                <div className="border add-accaunt">
                    <input
                        type="text"
                        value={newLogin}
                        onChange={(e) => setNewLogin(e.target.value)}
                        placeholder="login"
                    />
                    <input
                        type="text"
                        value={newPassword}
                        placeholder="parol"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value)}
                        placeholder="parolni tasdiqlang"
                    />
                    <div className="row">
                        <input
                            type="text"
                            placeholder="Ism"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Familiya"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                        />
                    </div>
                    <div className="border priveileges p-20">
                        <label className="priveilege">
                            <input
                                checked={func0}
                                onChange={(e) => setFunc0(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            So`rov ochish
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func1}
                                onChange={(e) => setFunc1(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            So`rov to`ldirish
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func2}
                                onChange={(e) => setFunc2(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            So`rov analiz
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func3}
                                onChange={(e) => setFunc3(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Reyestr
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func4}
                                onChange={(e) => setFunc4(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Qaytarib yuborilganlar
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func5}
                                onChange={(e) => setFunc5(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Dispetcherlik
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func6}
                                onChange={(e) => setFunc6(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Akkaunt menedjer
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func7}
                                onChange={(e) => setFunc7(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Dispetcherlar nazorati
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func8}
                                onChange={(e) => setFunc8(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Status
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func9}
                                onChange={(e) => setFunc9(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Lokatsiya
                        </label>
                        <label className="priveilege">
                            <input
                                checked={func10}
                                onChange={(e) => setFunc10(e.target.checked)}
                                type="checkbox"
                                id="privilege_request"
                            />
                            Pul tarqatish
                        </label>
                    </div>
                    {func0||func8 ? (
                        <div className="border p-20">
                            <div className="mb-20">Kodlar</div>
                            <div className="div mb-20">
                                <input type="text" value={newCode} onChange={elem=>setNewCode(elem.target.value)}/>
                                <button onClick={()=>{
                                            if(newCode !== "" && !arrayOfOrders.includes(newCode)){
                                                setArrayOfOrders([...arrayOfOrders, newCode])
                                            }
                                        }}>
                                    <i className="fi fi-rr-plus"></i>
                                </button>
                            </div>
                            <div className="row">
                                {
                                    <div className="codes">
                                        {arrayOfOrders.map((e, k) => (
                                            <div key={k} className="code p-20 border">
                                                <div className="code-heading">{e}</div>{" "}
                                                <i className="fi fi-rr-cross" 
                                                onClick={()=>setArrayOfOrders(arrayOfOrders.filter(x=>x!==e))}
                                                ></i>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    ) : null}
                    {mode === "create" ? (
                        <button onClick={createAccount}>Yangi akkaunt qo`shish</button>
                    ) : (
                        <div className="row">
                            <button onClick={editAccount}>Akkaunt tahrirlash</button>
                            <button onClick={() => setMode("create")}>Orqaga qaytish</button>
                        </div>
                    )}
                </div>
                <div className="list-of-users mt-20 border p-20">
                    {arrayOfUsers.map((e, i) => (
                        <div className="border p-20 mb-20 user-data" key={i}>
                            <div className="user">
                                <div className="username border">
                                    <img
                                        src={e.image}
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="fullname">{e.name + " " + e.second_name}</div>
                            </div>
                            <div className="control">
                                <button className="edit" onClick={() => setRecivedData(e)}>
                                    <i className="fi fi-rr-pencil"></i>
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => deleteAccount(e.login)}
                                >
                                    <i className="fi fi-rr-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}
