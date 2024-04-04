import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./DispatchPage.css";
import useHTTP1 from "../../hooks/useWeb copy";
import ListOfOrdersDispatch from "../../components/listOfOrdersDispatch/ListOfOrdersDispatch";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import customAlert from "../../hooks/useAlert";
export default function DispatchPage() {

    const [select, setSelect] = useState();
    const [loading, setLoading] = useState(false);

    const { sendRequest1 } = useHTTP1();
    const [arrayOfUncheckedOrders, setUncheckedOrders] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        sendRequest1("https://imbgroup.uz/get-dispatch-list.php", "POST")
            .then(e => {
                setUncheckedOrders(JSON.parse(e));
            })
        sendRequest1("https://imbgroup.uz/dispatch-history.php", "POST")
            .then(e => {
                setHistory(JSON.parse(e));
            })
        //eslint-disable-next-line
    }, []);
    useEffect(() => {
        const interval = setInterval(
            () =>
                sendRequest1("https://imbgroup.uz/dispatch-history.php", "POST")
                    .then(e => {
                        setHistory(JSON.parse(e));
                    }),
            5000
        );
        return () => {
            clearInterval(interval);
        }; //eslint-disable-next-line
    }, [history]);
    useEffect(() => {
        const interval = setInterval(
            () =>
                sendRequest1("https://imbgroup.uz/get-dispatch-list.php", "POST").then((response) => {
                    return setUncheckedOrders(JSON.parse(response));
                }),
            5000
        );
        return () => {
            clearInterval(interval);
        }; //eslint-disable-next-line
    }, [arrayOfUncheckedOrders]);

    function reserveOrder() {
        console.log(select);
        setLoading(true);
        //https://work.imbgroup.uz/filter
        sendRequest1("https://work.imbgroup.uz/filter", "POST", { id: select, dispatcher: 1 })
            .then((e) => {
                setSelect(undefined);
                setLoading(false);
                customAlert(e, "success")
                sendRequest1("https://imbgroup.uz/get-dispatch-list.php", "POST").then((response) => {
                    return setUncheckedOrders(JSON.parse(response));
                });
            }).catch(e => customAlert(e))
    }
    return <>
        <Header></Header>
        <main className="dispatch-page">
            <div className="nav border p-20 mb-20">
                <div>ASOSIY SAHIFA</div>
                <div>/</div>
                <div>DISPETCHERLIK</div>
            </div>
            <div style={{ marginBottom: 20 }}>
                <ListOfOrdersNext
                    arrayOforders={arrayOfUncheckedOrders}
                    header={"Sorovlar"}
                    selectable={true}
                    select={select}
                    setSelect={setSelect}
                />
            </div>
            <div className={(select === undefined) ? "dispatch-page__reserve-button d-none" : "dispatch-page__reserve-button"} >
                <div className="border p-20 bg-white">
                <div className="dispatch-page__heading">
                    Band qilinsinmi?
                </div>
                <div className="dispatch-page__row">
                    <button onClick={reserveOrder}>{(loading) ? "Jonatilmoqda" : "Ha"}</button>
                    <button onClick={() => setSelect(undefined)}>Yo`q</button>
                </div>
                </div>
            </div>
            
            <div className="border mb-20">
                <ListOfOrdersDispatch
                    url={"https://imbgroup.uz/get-dispatcher-id.php"}
                    header={"Tasdiqlanishi kutulayotgan sorovlar"}
                />
            </div>
            {/* <div className="border ">
                <ListOfOrdersNext
                    arrayOforders={history}
                    header={"So`rovlar tarixi"}
                    setSelect={() => { }}
                />
            </div> */}

        </main>
    </>
}