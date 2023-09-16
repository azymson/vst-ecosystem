import CashOrder from "../cashOrder/cashOrder";
 /*eslint-disable*/
export default function CashList({cashList}) {
    return <div className="cash-list">
        {cashList.map((e)=><CashOrder key={e.id} element={e}/>)}
    </div>;
}