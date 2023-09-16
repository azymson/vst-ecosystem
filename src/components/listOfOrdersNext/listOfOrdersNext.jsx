import { useEffect, useState } from "react";
import Filter from "../filter/filter";
import Order from "../Orders/orders";
// import "./listOfordersNext.css";

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
    select,
    rejectable,
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
        request_time: "So'rov vaqti",
    };
    const style = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };
    const [selectedElement, setSelectedElement] = useState();
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     const newFilters = {};
    
    //     arrayOforders.forEach((element) => {
    //       for (const key in element) {
    //         if (element.hasOwnProperty(key)) {
    //           if (!newFilters[key]) {
    //             newFilters[key] = [...new Set(arrayOforders.map((elem) => (elem[key])))];
    //           }
    //         }
    //       }
    //     });
    //     setFilters(newFilters);
    //   }, [arrayOforders]);
    // for(const e in filters){
    //     console.log(filters[e]?.map(e=>({[e]:true})))
    // }
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

    function filterData(arrayOfOrders){
        return arrayOfOrders.filter(e=>Object.values(e).join(" ").toLowerCase().includes(search.toLowerCase()));
    }
    if (arrayOforders.length === 0)
        return <div className="order-list">{header} (Hozircha bo`sh)</div>;
    const tableHeader = Object.keys(arrayOforders[0]).map((e, i) => {
        return (
            <td key={i}>
                <div style={style} className="headers">
                    {arrayOfHeaders[e]} <i className="fi fi-rr-angle-small-down"></i>
                    {/* <div className="filters border p-20">
                        {filters[e]?.map(z => <label style={{display: "flex"}}>
                                <input type="checkbox" checked/>{z}
                            </label>)}
                    </div> */}
                </div>
            </td>
            // <Filter 
            //     arrayOfHeaders={arrayOfHeaders} 
            //     arrayOforders={arrayOforders}
            //     style={style}
            //     filters={filters}
            //     keys={e}
            // />
            )
    });


    return (
        <div className="order-list border">
            <input type="text" placeholder="Qidiruv" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            <div className="row">
                <p>{header}</p>
                {downloadButton}
            </div>

            <table style={{display: "block", widith: "100%"}}>
                <tbody style={{display:"block",maxHeight:"100vh",overflow: "auto"}}>
                    <tr style={{position:"sticky", top:0, backgroundColor:"white"}}>
                        <td>№</td>
                        {tableHeader}
                        {(!rejectable)||<td>O</td>}
                        {(!deletable)||<td>Q</td>}
                    </tr>

                    {filterData(arrayOforders)?.map((e, i) => (
                        <>
                            <Order
                                key={e.id}
                                context={e}
                                clickFunc={() =>
                                    clickFunc !== undefined ? clickFunc(e) : () => { }
                                }
                                onSelect={() => setSelect(e.id)}
                                selectedElement={select}
                                id={i}
                                selectable={selectable}
                                deletable={deletable}
                                refresh={refresh}
                                rejectable={rejectable}
                            />
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
