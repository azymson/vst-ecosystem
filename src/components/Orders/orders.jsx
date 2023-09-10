import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";
import { useState } from "react";
import { nanoid } from "nanoid";
/*eslint-disable*/
export default function Order({
    context,
    clickFunc,
    onSelect,
    selectedElement,
    id,
    selectable,
    deletable,
    refresh,
    rejectable
    /*eslint-disable*/

}) {
    const [loading, setLoading] = useState(false)
    /*eslint-disable*/
    function changeSelectedData() {
        clickFunc();
        onSelect();
    }
    const status = {
        0: "To`ldirilshi kutilmoqda",
        1: "Tekshirilishi kutilmoqda",
        2: "Start",
        3: "Qaytarilgan",
        4: "Yuklap chiqdi",
        5: "Lokatsiya berildi",
        6: "Zavodga yetib keldi",
        7: "Finish"
    };
    const colors = {
        0: "yellow",
        1: "green",
        2: "blue",
        3: "red",
    };

    const rejectFunction = (elem) => {
        let reject_latter = prompt("Sababi");

        if(reject_latter){
            if (confirm("Tasdiqlaysizmi?")) {
                setLoading(true);
                const { sendRequest } = useHTTP();
                sendRequest("https://imbgroup.uz/reject-request.php", "POST", {
                    id: elem,
                    reject_latter
                }).then((e) => {
                    customAlert(e, "success");
                    setLoading(false);
                    refresh();
                });
            }    
        }
        else customAlert("Sababi bo'lishi shart");
    };
    const cancelFunc = (elem) => {
        let reject_latter = prompt("Sababi");
        if(reject_latter){
            if (confirm("Tasdiqlaysizmi?")) {
                setLoading(true);
                const { sendRequest } = useHTTP();
                sendRequest("https://imbgroup.uz/cancel-request.php", "POST", {
                    id: elem,
                    reject_latter
                }).then((e) => {
                    customAlert(e, "success");
                    setLoading(false);
                    refresh();
                });
            }
        }
        else customAlert("Sababi bo'lishi shart");
    };
    const styleSelected = context.id === selectedElement && selectable ? "order selected" : "order";

    return (
        <tr className={styleSelected} onClick={changeSelectedData}>
            <td>{id + 1}</td>
            {Object.entries(context).map(([key, value], i) => {
                if (key === "type") {
                    value = status[value];
                }
                if(value === "F Toshkent"){
                    value = "Family";
                }
                return <td key={nanoid()}>{value}</td>
            })}
            {(deletable) ?
                <td onClick={() => cancelFunc(context.id)} className="delete-button">{(!loading) ?
                    <div>
                        <i className="fi fi-rr-trash"></i>

                    </div> :
                    <div>
                        <i className="fi fi-rr-loading"></i>
                    </div>}
                </td> : null}
            {(rejectable) ?
                <td onClick={() => rejectFunction(context.id)} className="delete-button">{(!loading) ?
                    <div>
                        <i className="fi fi-rr-refresh"></i>

                    </div> :
                    <div>
                        <i className="fi fi-rr-loading"></i>
                    </div>}
                </td> : null}
        </tr>
    );
}
