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
    refresh
    /*eslint-disable*/

}) {
    const [loading, setLoading] = useState(false)
    /*eslint-disable*/
    function changeSelectedData() {
        clickFunc();
    }
    const status = {
        0: "To`ldirilshi kutilmoqda",
        1: "Tekshirilishi kutilmoqda",
        2: "Start",
        3: "Qaytarilgan",
        4: "Yuklap chiqdi",
        5: "Finish",
    };
    const colors = {
        0: "yellow",
        1: "green",
        2: "blue",
        3: "red",
    };
    // const rejectFunction = (select)=>{
    //     setLoading(true);
    //     sendRequest("https://imbgroup.uz/reject-request.php", "POST", {
    //         id: select,
    //         reject_latter: "So`rov menedjer tomonidan qaytarildi",
    //     }).then((e) => {
    //         setLoading(false);
    //         customAlert(e, "success")
    //         refresh();
    //     });

    // }
    const rejectFunction = (elem) => {
        if (confirm("Tasdiqlaysizmi?")) {
            setLoading(true);
            const { sendRequest } = useHTTP();
            sendRequest("https://imbgroup.uz/reject-request.php", "POST", {
                id: elem,
                reject_latter: "So`rov menedjer tomonidan qaytarildi",
            }).then((e) => {
                customAlert(e, "success");
                setLoading(false);
                refresh();
            });
        }
    };
    const cancelFunc = (elem) => {
        if (confirm("Tasdiqlaysizmi?")) {
        setLoading(true);
        const { sendRequest } = useHTTP();
        sendRequest("https://imbgroup.uz/cancel-request.php", "POST", {
            id: elem,
            reject_latter: "So`rov menedjer tomonidan qaytarildi",
        }).then((e) => {
            customAlert(e, "success");
            setLoading(false);
            refresh();
        });
    }};
    const styleSelected =
        context.id === selectedElement && selectable ? "order selected" : "order";
    return (
        <tr className={styleSelected} onClick={changeSelectedData}>
            <td>{id + 1}</td>
            {Object.entries(context).map(([k, e], i) => {
                if (deletable && i === Object.entries(context).length - 1) {
                    if (k === "type")
                        return (
                            <>

                                <td key={nanoid()} onClick={onSelect} className={colors[e]}>
                                    {status[e]}
                                </td>
                                <td onClick={() => cancelFunc(context.id)} className="delete-button">{(!loading) ?
                                    <div>
                                        <i className="fi fi-rr-trash"></i>
                                    </div> :
                                    <div>
                                        <i className="fi fi-rr-loading"></i>
                                    </div>}
                                    {/* <button
                                        style={{ width: "100%" }}
                                        onClick={() => cancelFunc(context.id)}
                                    >
                                        {(!loading)?"Qaytarish":"Jonatilmoqda"}
                                    </button> */}
                                </td>
                            </>
                        );
                    return (
                        <>
                            <td key={i} onClick={onSelect}>
                                {e}
                            </td>
                            <td onClick={() => cancelFunc(context.id)} className="delete-button">{(!loading) ?
                                <div>
                                    <i className="fi fi-rr-trash"></i>

                                </div> :
                                <div>
                                    <i className="fi fi-rr-loading"></i>
                                </div>}
                                {/* <button
                                        style={{ width: "100%" }}
                                        onClick={() => cancelFunc(context.id)}
                                    >
                                        {(!loading)?"Qaytarish":"Jonatilmoqda"}
                                    </button> */}
                            </td>
                            <td className="delete-button" onClick={() => rejectFunction(context.id)}>

                                {(!loading) ? <div>
                                    <i className="fi fi-rr-refresh"></i>

                                </div> :
                                    <div>
                                        <i className="fi fi-rr-loading"></i>
                                    </div>}
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
