import CashOrder from "../cashOrder/cashOrder";
 /*eslint-disable*/
export default function CashList({cashList,type}) {
    return <div className="cash-list">
        {cashList.map((e)=><CashOrder key={e.id} type={type} element={e}/>)}
    </div>;
}