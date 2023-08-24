import { useEffect, useState } from "react";
import useHTTP from "../../hooks/useWeb";
import "./listOforders.css";
/*eslint-disable*/
export default function ListOfOrders({
    header,
    url,
    download,
    clickFunc,
    selectable,
    payload,
    deletable,
}) {
    /*eslint-disable*/

    const { sendRequest } = useHTTP();
    const [arrayOforders, setArrayOforders] = useState([]);
    const [selectedElement, setSelectedElement] = useState();
    useEffect(() => {
        sendRequest(url, "POST", payload).then((response) => {
            return setArrayOforders(JSON.parse(response));
        });
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const interval = setInterval(
            () =>
                sendRequest(url, "POST", payload).then((response) => {
                    return setArrayOforders(JSON.parse(response));
                }),
            5000
        );
        return () => {
            clearInterval(interval);
        }; //eslint-disable-next-line
    }, [arrayOforders]);

    //eslint-disable-next-line

    function downloadOnExcel() {
        fetch("https://imbgroup.uz/get-list-excel.php", {
            method: "POST",
            body: JSON.stringify({
                login: localStorage.getItem("login"),
                password: localStorage.getItem("password"),
            }),
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Создаем ссылку для скачивания файла
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "register.xlsx";
                document.body.appendChild(a);
                a.click();

                // Очищаем ссылку после скачивания файла
                window.URL.revokeObjectURL(url);
            });
    }

    if (arrayOforders.length === 0)
        return (
            <div className="order-list">
                {" "}
                <p>{header} (Hozircha bo`sh)</p>
            </div>
        );
    let tableHeader;
    if (arrayOforders.length > 0) {
        tableHeader = Object.keys(arrayOforders[0])
            .map((e) => {
                const arrayOfHeaders = {
                    id: "id",
                    firmCode: "Firma kodi",
                    from_p: "Qayerdan",
                    to_p: "Qayerga",
                    reg_date: "Sana",
                    type: "Status",
                    carID: "Mashina raqami",
                    carType: "Mashina turi",
                    sapcode: "Sapkod",
                    orgName: "Firma nomi",
                    supCarType: "Mashina turi",
                    supCarID: "Pretsep raqami",
                    sum: "Summa",
                    tel: "Telefon raqam",
                    comment: "Qoshimcha ma`lumot",
                    dispatcher: "Dispetcher",
                    reject_comment: "Qaytarish sababi",
                    fio: "FIO",
                };
                return arrayOfHeaders[e];
            })
            .map((e, i) => <td key={i}>{e}</td>);
    }
    return (
        <div className="order-list border">
            <div className="row">
                <p>{header}</p>
                {download ? (
                    <i
                        className="fi fi-rr-download downld-btn"
                        onClick={downloadOnExcel}
                    ></i>
                ) : null}
            </div>
            <table>
                <tbody>
                    <tr>{tableHeader}</tr>

                    {arrayOforders?.map((e, i) => (
                        <Order
                            key={i}
                            context={e}
                            clickFunc={() =>
                                clickFunc !== undefined ? clickFunc(e) : () => { }
                            }
                            onSelect={() => setSelectedElement(i)}
                            selectedElement={selectedElement}
                            id={i}
                            selectable={selectable}
                            deletable={deletable}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
/*eslint-disable*/
function Order({
    context,
    clickFunc,
    onSelect,
    selectedElement,
    id,
    selectable,
    deletable,
}) {
    /*eslint-disable*/
    function changeSelectedData() {
        clickFunc();
    }
    const status = {
        0: "To`ldirilshi kutilmoqda",
        1: "Tekshirilishi kutilmoqda",
        2: "Reyestr",
        3: "Qaytarilgan",
    };
    const colors = {
        0: "yellow",
        1: "green",
        2: "blue",
        3: "red",
    };
    const cancelFunc = (elem) => {
        const { sendRequest } = useHTTP();
        sendRequest("https://imbgroup.uz/cancel-request.php", "POST", {
            id: elem,
            reject_latter: "So`rov menedjer tomonidan qaytarildi",
        }).then((e) => console.log(e));
    };
    const styleSelected =
        id === selectedElement && selectable ? "order selected" : "order";
    return (
        <tr className={styleSelected} onClick={changeSelectedData}>
            {Object.entries(context).map(([k, e], i) => {
                if (deletable && i === Object.entries(context).length - 1) {
                    if (k === "type")
                        return (
                            <>
                                <td key={i} onClick={onSelect} className={colors[e]}>
                                    {status[e]}
                                </td>
                                <td>
                                    <button
                                        style={{ width: "100%" }}
                                        onClick={() => cancelFunc(context.id)}
                                    >
                                        Qaytarish
                                    </button>
                                </td>
                            </>
                        );
                    return (
                        <>
                            <td key={i} onClick={onSelect}>
                                {e}
                            </td>
                            <td>
                                <button
                                    style={{ width: "100%" }}
                                    onClick={() => cancelFunc(context.id)}
                                >
                                    Qaytarish
                                </button>
                            </td>
                        </>
                    );
                } else {
                    if (k === "type")
                        return (
                            <td key={i} onClick={onSelect} className={colors[e]}>
                                {status[e]}
                            </td>
                        );
                    return (
                        <td key={i} onClick={onSelect}>
                            {e}
                        </td>
                    );
                }
            })}
        </tr>
    );
}
