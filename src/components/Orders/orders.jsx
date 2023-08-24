import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";
import { useState } from "react";
export default function Order({
    context,
    clickFunc,
    onSelect,
    selectedElement,
    id,
    selectable,
    deletable,
    refresh
}) {
    const [loading, setLoading] = useState("false")
    /*eslint-disable*/
    function changeSelectedData() {
        clickFunc();
    }
    const status = {
        0: "To`ldirilshi kutilmoqda",
        1: "Tekshirilishi kutilmoqda",
        2: "Reyestr",
        3: "Qaytarilgan",
    };
    const colors = {
        0: "yellow",
        1: "green",
        2: "blue",
        3: "red",
    };
    const cancelFunc = (elem) => {
        setLoading(true);
        const { sendRequest } = useHTTP();
        sendRequest("https://imbgroup.uz/cancel-request.php", "POST", {
            id: elem,
            reject_latter: "So`rov menedjer tomonidan qaytarildi",
        }).then((e) => {
            customAlert(e, "success");
            refresh();
            setLoading(false);
        });
    };
    const styleSelected =
        context.id === selectedElement && selectable ? "order selected" : "order";
    return (
        <tr className={styleSelected} onClick={changeSelectedData}>
            {Object.entries(context).map(([k, e], i) => {
                if (deletable && i === Object.entries(context).length - 1) {
                    if (k === "type")
                        return (
                            <>
                                <td key={i} onClick={onSelect} className={colors[e]}>
                                    {status[e]}
                                </td>
                                <td>
                                    <button
                                        style={{ width: "100%" }}
                                        onClick={() => cancelFunc(context.id)}
                                    >
                                        {(loading)?"Qaytarish":"Jonatilmoqda"}
                                    </button>
                                </td>
                            </>
                        );
                    return (
                        <>
                            <td key={i} onClick={onSelect}>
                                {e}
                            </td>
                            <td>
                                <button
                                    style={{ width: "100%" }}
                                    onClick={() => cancelFunc(context.id)}
                                >
                                    Qaytarish
                                </button>
                            </td>
                        </>
                    );
                } else {
                    if (k === "type")
                        return (
                            <td key={i} onClick={onSelect} className={colors[e]}>
                                {status[e]}
                            </td>
                        );
                    return (
                        <td key={i} onClick={onSelect}>
                            {e}
                        </td>
                    );
                }
            })}
        </tr>
    );
}
