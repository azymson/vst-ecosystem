import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./DispatchPage.css";
import useHTTP from "../../hooks/useWeb";
import ListOfOrdersDispatch from "../../components/listOfOrdersDispatch/ListOfOrdersDispatch";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
import customAlert from "../../hooks/useAlert";
export default function DispatchPage() {

    const [select, setSelect] = useState();
    const [loading, setLoading] = useState(false);

    const { sendRequest } = useHTTP();
    const [arrayOfUncheckedOrders, setUncheckedOrders] = useState([]);
    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-dispatch-list.php", "POST")
            .then(e => {
                setUncheckedOrders(JSON.parse(e));
            })
        //eslint-disable-next-line
    }, []);
    useEffect(() => {
        const interval = setInterval(
            () =>
                sendRequest("https://imbgroup.uz/get-dispatch-list.php", "POST").then((response) => {
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
        sendRequest("https://work.imbgroup.uz/filter", "POST", { id: select, dispatcher: 1 })
            .then((e) => {
                setSelect(undefined);
                setLoading(false);
                customAlert(e, "success")
                sendRequest("https://imbgroup.uz/get-dispatch-list.php", "POST").then((response) => {
                    return setUncheckedOrders(JSON.parse(response));
                });
            }).catch(e => customAlert(e))
    }
    return <>
        <Header></Header>
        <main className="dispatch-page">
            <div style={{ marginBottom: 20 }}>
                <ListOfOrdersNext
                    arrayOforders={arrayOfUncheckedOrders}
                    header={"Sorovlar"}
                    selectable={true}
                    select={select}
                    setSelect={setSelect}
                />
            </div>

            <ListOfOrdersDispatch
                url={"https://imbgroup.uz/get-dispatcher-id.php"}
                payload={{ dispatcher: 1 }}
                header={"Tasdiqlanishi kutulayotgan sorovlar"}
            />

            <div className={(select === undefined) ? "dispatch-page__reserve-button d-none" : "dispatch-page__reserve-button"} >
                <div className="dispatch-page__heading">
                    Band qilinsinmi?
                </div>
                <div className="dispatch-page__row">
                    <button onClick={reserveOrder}>{(loading) ? "Jonatilmoqda" : "Ha"}</button>
                    <button onClick={() => setSelect(undefined)}>Yo`q</button>
                </div>
            </div>
        </main>
    </>
}