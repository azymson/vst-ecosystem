import customAlert from "../../hooks/useAlert";
import useHTTP from "../../hooks/useWeb";

/*eslint-disable*/
export default function CashOrder({ element, type }) {
    const { id, from_p, to_p, carName, carID, supCarID, supCarType, tel, fio, card_sum, cash_sum } = element;
    const {sendRequest} = useHTTP();
    const sumFormate = (data) => {
        return data.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    }
    const closeOrder = (id) => {
        if(type === 1)
        window.location.href = `/card/${id}`;
        if(type === 0)
        window.location.href = `/cash/${id}`;
    }
    if(type === 1)
    return <div className="cash-order border p-20">
        <div className="cash-order-row"><i className="fi fi-rr-document"></i>{id}</div>
        <div className="cash-order-row"><i className="fi fi-rr-marker"></i>{from_p} - {to_p}</div>
        <div className="cash-order-row"><i className="fi fi-rr-truck-moving"></i>{carName} {carID}</div>
        <div className="cash-order-row"><i className="fi fi-rr-truck-moving"></i>{supCarType} {supCarID}</div>
        <div className="cash-order-row"><i className="fi fi-rr-phone-flip "></i><a href={`tel:+998${tel}`}>+998{tel}</a></div>
        <div className="cash-order-row"><i className="fi fi-rr-user"></i>{fio}</div>
        <div className="cash-order-row"><i className="fi fi-rr-coins"></i>{sumFormate(card_sum)} + {sumFormate((Number.parseInt(card_sum) * 0.005).toString())}</div>
        <button onClick={()=>closeOrder(id)}>Yopish</button>
    </div>
    if (type === 0) {
        return <div className="cash-order border p-20">
        <div className="cash-order-row"><i className="fi fi-rr-document"></i>{id}</div>
        <div className="cash-order-row"><i className="fi fi-rr-marker"></i>{from_p} - {to_p}</div>
        <div className="cash-order-row"><i className="fi fi-rr-truck-moving"></i>{carName} {carID}</div>
        <div className="cash-order-row"><i className="fi fi-rr-truck-moving"></i>{supCarType} {supCarID}</div>
        <div className="cash-order-row"><i className="fi fi-rr-phone-flip "></i><a href={`tel:+998${tel}`}>+998{tel}</a></div>
        <div className="cash-order-row"><i className="fi fi-rr-user"></i>{fio}</div>
        <div className="cash-order-row"><i className="fi fi-rr-coins"></i>{sumFormate(cash_sum)} </div>
        <button onClick={()=>closeOrder(id)}>Yopish</button>
    </div>
    }
}