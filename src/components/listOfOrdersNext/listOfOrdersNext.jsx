import {useState } from "react";
import Order from "../Orders/orders";
import "./listOfordersNext.css";
/*eslint-disable*/
export default function ListOfOrdersNext({
    header,
    download,
    clickFunc,
    selectable,
    deletable,
    arrayOforders,
    refresh,
    setSelect,
    select
}) {
    /*eslint-disable*/
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
    const [selectedElement, setSelectedElement] = useState();

    
    const downloadButton = download ? (
        <i className="fi fi-rr-download downld-btn" onClick={downloadOnExcel}></i>
    ) : null;

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
        return <div className="order-list">{header} (Hozircha bo`sh)</div>;

    const tableHeader = Object.keys(arrayOforders[0]).map((e, i) => (
        <td key={i}>{arrayOfHeaders[e]}</td>
    ));
    
    return (
        <div className="order-list border">
            
            <div className="row">
                <p>{header}</p>
                {downloadButton}
            </div>

            <table>
                <tbody>
                    <tr>{tableHeader}</tr>

                    {arrayOforders?.map((e, i) => (
                        <Order
                            key={i}
                            context={e}
                            clickFunc={() =>clickFunc !== undefined ? clickFunc(e) : () => {}}
                            onSelect={() => setSelect(e.id)}
                            selectedElement={select}
                            id={i}
                            selectable={selectable}
                            deletable={deletable}
                            refresh={refresh}
                        />
                    ))}
                </tbody>
            </table>

        </div>
    );
}
