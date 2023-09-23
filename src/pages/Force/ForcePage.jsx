import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./ForcePage.css";
import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";
import ListOfOrdersForce from "../../components/listOfOrdersForce/ListOfOrdersForce";
import { useRef } from "react";
export default function ForcePage() {
    const [arrayOfOrders, setArrayOfOrders] = useState([]);
    const [select, setSelect] = useState("");
    const [sapcode, setSapcode] = useState("");
    const [OrgName, setOrgName] = useState("");
    const [type, setType] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const searchInput = useRef(null);

    const { sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest("https://imbgroup.uz/force.php", "POST").then((response) => {
            setArrayOfOrders(JSON.parse(response));
        });
        //eslint-disable-next-line
    }, []);
    function refresh() {
        sendRequest("https://imbgroup.uz/force.php", "POST").then((response) => {
            setArrayOfOrders(JSON.parse(response));
        });
    }

    function onListClick({ sapcode, id, orgName, type }) {
        setOrgName(orgName);
        setSapcode(sapcode);
        setSelect(id);
        setType(type);
    }
    function editSelectedData() {
        setLoading1(true);
        sendRequest("https://imbgroup.uz/set-loaded.php", "POST", {
            id: select,
            type: type,
            sapcode: sapcode,
            orgName: OrgName,
        }).then((response) => {
            setLoading1(false);
            sendRequest("https://imbgroup.uz/force.php", "POST").then((response1) => {
                setArrayOfOrders(JSON.parse(response1));
                customAlert(response, "success");
            });
        });
    }
    function cutUseless(arrayOfOrders) {
        if (search !== "") {
            arrayOfOrders = arrayOfOrders.filter((e) =>
                Object.values(e).join(" ").toLowerCase().includes(search.toLowerCase())
            );
        }
        return arrayOfOrders.map(
            ({ id, firmCode, from_p, to_p, type, carID, reg_date }) => ({
                id,
                firmCode,
                from_p,
                to_p,
                type,
                carID,
                reg_date,
            })
        );
    }
    return (
        <>
            <Header />
            
            <main className="p-20 mt-70 force">
            <div className="nav border p-20 mb-20">
                <div>ASOSIY SAHIFA</div>
                <div>/</div>
                <div>FORS MAJOR</div>
            </div>
                <div className="row-force">
                    <div className="search mt-20 border">
                        <input 
                            type="text" 
                            placeholder="Qidiruv" 
                            ref={searchInput} 
                            onKeyDown={(e)=>(!e.key === "Enter")||setSearch(e.target.value)}
                        />
                        <i
                            className="fi fi-rr-search mr-20 "
                            onClick={() => setSearch(searchInput.current.value)}
                        ></i>
                        {(search === "")||<i
                            className="fi fi-rr-cross mr-20 "
                            onClick={() => {setSearch(""); searchInput.current.value = ""}}
                        ></i>}
                    </div>
                    <div className="pagination p-20">
                        <div className="d left" onClick={() => setCurrentPage(0)}>
                            <i className="fi fi-rr-angle-double-small-left"></i>
                        </div>
                        <div
                            className="left"
                            onClick={() =>
                                !(currentPage > 0) || setCurrentPage(currentPage - 1)
                            }
                        >
                            <i className="fi fi-rr-angle-small-left"></i>
                        </div>
                        <div className="pages">
                            <select
                                value={currentPage}
                                onChange={(e) => setCurrentPage(e.target.value)}
                            >
                                {Array(Math.floor(cutUseless(arrayOfOrders).length / 25) + 1)
                                    .fill()
                                    .map((_, index) => (
                                        <option key={index} value={index} className="page">
                                            {index + 1}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div
                            className="right"
                            onClick={() =>
                                !(currentPage < Math.floor(arrayOfOrders.length / 25)) ||
                                setCurrentPage(currentPage + 1)
                            }
                        >
                            <i className="fi fi-rr-angle-small-right"></i>
                        </div>
                        <div
                            className="d right"
                            onClick={() =>
                                setCurrentPage(Math.floor(arrayOfOrders.length / 25))
                            }
                        >
                            <i className="fi fi-rr-angle-double-small-right"></i>
                        </div>
                    </div>
                </div>
                <div style={{ overflow: "auto", maxHeight: "calc(100vh - 210px)" }}>
                    <ListOfOrdersForce
                        select={select}
                        clickFunc={(context) => onListClick(context)}
                        setSelect={setSelect}
                        arrayOforders={cutUseless(arrayOfOrders).slice(
                            currentPage * 25,
                            currentPage * 25 + 25
                        )}
                        selectable={true}
                        deletable={true}
                        refresh={refresh}
                    />
                </div>
            </main>
        </>
    );
}
