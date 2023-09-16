import customAlert from "../../hooks/useAlert";
import useHTTP from "../../hooks/useWeb";

/*eslint-disable*/
export default function CashOrder({ element }) {
    const { id, from_p, to_p, carName, carID, supCarID, supCarType, tel, fio, sum } = element;
    const {sendRequest} = useHTTP();
    const sumFormate = (data) => {
        return data.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    }
    const closeOrder = (id) => {
        sendRequest("https:/imbgroup.uz/send-cash.php", "POST", {id})
            .then(e=>customAlert(e, "success"));
    }
    return <div className="cash-order border p-20">
        <div className="cash-order-row"><i className="fi fi-rr-document"></i>{id}</div>
        <div className="cash-order-row"><i className="fi fi-rr-marker"></i>{from_p} - {to_p}</div>
        <div className="cash-order-row"><i className="fi fi-rr-truck-moving"></i>{carName} {carID}</div>
        <div className="cash-order-row"><i className="fi fi-rr-truck-moving"></i>{supCarType} {supCarID}</div>
        <div className="cash-order-row"><i className="fi fi-rr-phone-flip "></i><a href={`tel:+998${tel}`}>+998{tel}</a></div>
        <div className="cash-order-row"><i className="fi fi-rr-user"></i>{fio}</div>
        <div className="cash-order-row"><i className="fi fi-rr-coins"></i>{sumFormate(sum)}</div>
        <button onClick={()=>closeOrder(id)}>Yopish</button>
    </div>
}