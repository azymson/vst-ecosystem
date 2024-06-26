import { useEffect, useState } from "react";
import customAlert from "../../hooks/useAlert";
import useHTTP from "../../hooks/useWeb";
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
    fixed,
    socket
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
        supCarType: "Pretsep turi",
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
    const styleForTable = {
        overflowX: "auto",
        maxWidth: "100%",
        display: "block",
        maxHeight: "90vh",
        minHeight: "200px",
    };
    const [selectedElement, setSelectedElement] = useState();
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState("");
    const [filterState, setFilterState] = useState([]);
    const [multiselect, setMultiselect] = useState([]);

    useEffect(() => {
        const newFilters = {};

        arrayOforders.forEach((element) => {
            for (const key in element) {
                if (element.hasOwnProperty(key)) {
                    if (!newFilters[key]) {
                        newFilters[key] = [
                            ...new Set(arrayOforders.map((elem) => elem[key])),
                        ];
                    }
                }
            }
        });
        setFilters(newFilters);
    }, [arrayOforders]);
    useEffect(() => {
        let obj = {};
        Object.keys(filters)
            .map((e) => {
                return { [e]: filters[e]?.map((x) => ({ [x]: true })) };
            })
            .forEach((e) => {
                obj = { ...obj, ...e };
            });
        setFilterState(obj);
    }, [arrayOforders]);
    // for(const e in filters){
    //     console.log(filters[e]?.map(e=>({[e]:true})))
    // }
    useEffect(()=>{console.log(JSON.stringify(multiselect))},[multiselect]);
    const downloadButton = download ? (
        <i className="fi fi-rr-download downld-btn" onClick={downloadOnExcel}></i>
    ) : null;

    const cancelFunc = () => {
        let reject_latter = prompt("Sababi");
        if (reject_latter) {
            if (confirm("Tasdiqlaysizmi?")) {
                const { sendRequest } = useHTTP();
                sendRequest("https://imbgroup.uz/multi-cancel-request.php", "POST", {
                    ids: multiselect,
                    reject_latter
                }).then((e) => {
                    customAlert(e, "success");
                    refresh();
                    socket.emit("order");
                    setMultiselect([]);
                });
            }
        }
        else customAlert("Sababi bo'lishi shart");
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
        arrayOfOrders = arrayOfOrders.filter((e) =>
            Object.values(e).join(" ").toLowerCase().includes(search.toLowerCase())
        );
        // console.log(arrayOfOrders);
        // arrayOfOrders = arrayOfOrders.filter(e=>{
        //     let access = true;
        //     Object.keys(e).forEach(val=>{
        //         const arrayOfAccess = filterState[val]
        //             ?.filter(elem=>Object.values(elem)[0])
        //             ?.map(elem=>Object.keys(elem)[0])
        //             // ?.forEach(elem=>console.log(elem));
        //             if(e[val] === null) e[val] = "null";
        //         access = arrayOfAccess?.includes(e[val]) && access;
        //     })
        //     return access;
        // })
        return arrayOfOrders;
    }
    if (arrayOforders.length === 0)
        return <div className="order-list">{header} (Hozircha bo`sh)</div>;
    const tableHeader = Object.keys(arrayOforders[0]).map((e, i) => {
        return (
            // <td key={i}>
            //     <div style={style} className="headers">
            //         {arrayOfHeaders[e]} <i className="fi fi-rr-angle-small-down"></i>
            //         <div className="filters border p-20">
            //             {filters[e]?.map(z => <label style={{display: "flex"}}>
            //                     <input type="checkbox" checked/>{z}
            //                 </label>)}
            //         </div>
            //     </div>
            // </td>
            <Filter
                arrayOfHeaders={arrayOfHeaders}
                arrayOforders={arrayOforders}
                style={style}
                filters={filters}
                keys={e}
                filterState={filterState}
                setFilterState={setFilterState}
            />
        );
    });

    return (
        <div className="order-list border">
            <input
                type="text"
                placeholder="Qidiruv"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="row">
                <p>{header}</p>
                {downloadButton}
            </div>

{deletable&&<span className="cursor-pointer" onClick={cancelFunc}><i className="fi fi-rr-trash" ></i> Belgilanganlarni o`chirib yuborish</span>}
            <table style={fixed ? styleForTable : {}}>
                <tr style={{ position: "sticky", top: 0, backgroundColor: "white" }}>
                    {deletable&&<td onClick={()=>{
                        if(multiselect.length !== arrayOforders.length){
                            setMultiselect(arrayOforders.map(e=>e.id));
                        }else{
                            setMultiselect([]);
                        }
                    }}><input type="checkbox" checked={multiselect.length === arrayOforders.length} name="" id="" onChange={()=>{
                        if(multiselect.length !== arrayOforders.length){
                            setMultiselect(arrayOforders.map(e=>e.id));
                        }else{
                            setMultiselect([]);
                        }
                    }}/></td>}
                    <td>№</td>
                    {tableHeader}
                    {!rejectable || <td>O</td>}
                    {!deletable || <td>Q</td>}
                </tr>

                {filterData(arrayOforders)?.map((e, i) => (
                    <>
                        <Order
                            multiselect={multiselect}
                            setMultiselect={setMultiselect}
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
                            socket={socket}
                        />
                    </>
                ))}
            </table>
        </div>
    );
}
