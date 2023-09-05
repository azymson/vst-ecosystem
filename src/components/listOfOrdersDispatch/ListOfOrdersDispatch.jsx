import { useEffect, useState } from "react";
import useHTTP from "../../hooks/useWeb";
import "./listOfordersDispatch.css";
import Timer from "../timer/Timer";
//eslint-disable-next-line
export default function ListOfOrdersDispatch({header,url,download,clickFunc,selectable,payload}) {
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
        };
        //eslint-disable-next-line
    }, [arrayOforders]);

    //eslint-disable-next-line

    function downloadOnExcel() {
        fetch("https://imbgroup.uz/get-list-excel.php", {
            method: "POST",
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
    return (
        <div className="order-list">
            <div className="row">
                <p>{header}</p>
                {download ? (
                    <i
                        className="fi fi-rs-download downld-btn"
                        onClick={downloadOnExcel}
                    ></i>
                ) : null}
            </div>
            <table>
                <tbody>
                    {/*eslint-disable-next-line*/}
                    <tr>
                    <td>Buyurtma ID</td>
                    <td>Qayerdan</td>
                    <td>Qayerga</td>
                    <td>So`rov statusi</td>
                    <td>Qolgan vaqt</td>
                    </tr>
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
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
//eslint-disable-next-line
function Order({context,clickFunc,onSelect,selectedElement,id,selectable,}) {
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
    const styleSelected =
        id === selectedElement && selectable ? "order selected" : "order";
    return (
        <tr className={styleSelected} onClick={changeSelectedData}>
            {Object.entries(context)
                .filter(([, e], i) => {
                    return e !== null && i !== 0;
                })
                .map(([k, e], i) => {
                    if (k !== "type")
                        return (
                            <td key={i} onClick={onSelect}>
                                {e}
                            </td>
                        );
                    return (
                        <>
                            <td key={i} onClick={onSelect} className={colors[e]}>
                                {status[e]}
                            </td>
                        </>
                    );
                })}
            {Object.entries(context)
                .filter(([e]) => {
                    return e === "start_time";
                })
                .map(([, i]) => (
                    //eslint-disable-next-line
                    <td className="timer-stroke" key={context.id}>
                        <Timer startTime={i} />
                    </td>
                ))}
        </tr>
    );
}
