import { useState } from "react";
import Order from "../Orders/orders";
import "./ListOfOrdersForce.css";
import OrderForce from "../OrdersForce/orders";
import Filter from "../filter/filter";
import { useEffect } from "react";
/*eslint-disable*/
export default function ListOfOrdersForce({
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
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState("");
    const [filterState, setFilterState] = useState([]);
    useEffect(() => {
        const newFilters = {};

        arrayOforders.forEach((element) => {
            for (const key in element) {
                if (element.hasOwnProperty(key)) {
                    if (!newFilters[key]) {
                        newFilters[key] = [...new Set(arrayOforders.map((elem) => (elem[key])))];
                    }
                }
            }
        });
        
        setFilters(newFilters);
    }, [arrayOforders]);
    useEffect(() => {
        let obj = {};
        Object.keys(filters).map(e => {
            return { [e]: filters[e]?.map(x => ({ [x]: true })) }
        }).forEach(e => {
            obj = { ...obj, ...e }
        })
        setFilterState(obj);
    }, [arrayOforders]);
    const downloadButton = download ? (
        <i className="fi fi-rr-download downld-btn" onClick={downloadOnExcel}></i>
    ) : null;
    const style = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };
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
    function filterData(arrayOfOrders) {
        // arrayOfOrders = arrayOfOrders.filter(e => Object.values(e).join(" ").toLowerCase().includes(search.toLowerCase()))
        // console.log(arrayOfOrders);
        // arrayOfOrders = arrayOfOrders.filter(e => {
        //     let access = true;
        //     Object.keys(e).forEach(val => {
        //         const arrayOfAccess = filterState[val]
        //             ?.filter(elem => Object.values(elem)[0])
        //             ?.map(elem => Object.keys(elem)[0])
        //         // ?.forEach(elem=>console.log(elem));
        //         if (e[val] === null) e[val] = "null";
        //         access = arrayOfAccess?.includes(e[val]) && access;
        //     })
        //     return access;
        // })
        return arrayOfOrders;
    }
    console.log(filterState);

    if (arrayOforders.length === 0)
        return <div className="order-list">{header} (Hozircha bo`sh)</div>;

    const tableHeader = Object.keys(arrayOforders[0]).map((e, i) => {
        return (
            <Filter
                arrayOfHeaders={arrayOfHeaders}
                arrayOforders={arrayOforders}
                style={style}
                filters={filters}
                keys={e}
                filterState={filterState}
                setFilterState={setFilterState}
            />
        )
    });

    return (
        <div className="order-list border">
            <input type="text" placeholder="Qidiruv" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="row">
                <p>{header}</p>
                {downloadButton}
            </div>

            <table style={{ position: "relative" }}>
                <tbody>
                    <tr style={{ position: "sticky" }}><td>№</td>{tableHeader}</tr>

                    {filterData(arrayOforders)?.map((e, i) => (
                        <><OrderForce
                            key={i}
                            context={e}
                            clickFunc={() => clickFunc !== undefined ? clickFunc(e) : () => { }}
                            onSelect={() => setSelect(e.id)}
                            selectedElement={select}
                            id={i}
                            selectable={selectable}
                            deletable={deletable}
                            refresh={refresh}
                        /></>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
