import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";
import { useState } from "react";
import { nanoid } from "nanoid";
/*eslint-disable*/
export default function OrderForce({
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
    const { sendRequest } = useHTTP();
    const [editMode, setEditMode] = useState(false);
    const [data, setData] = useState(context);
    const [loading, setLoading] = useState(false);
    if (editMode) {
        return (
            <tr>
                {/* numeration */}
                <td>{id + 1}</td>

                {Object.entries(data)
                    .map(([k, e], i) => <td key={i} style={{ background: "rgb(39, 126, 114)" }}>
                        <input
                            className="inp"
                            type="text"
                            value={e}
                            onChange={(eve) => setData({ ...data, [k]: eve.target.value })}
                        />
                    </td>)
                }
                {/* pencil */}
                <td onClick={() => {
                    if(confirm("Tasdiqlaysizmi?")){
                        setLoading(true);
                    sendRequest("https://imbgroup.uz/force-change.php", "POST", data)
                        .then(e => {
                            customAlert(e, "success");
                            setLoading(false);
                            setEditMode(false);
                            refresh();
                        }).catch(()=>{
                            customAlert("Xatolik yuzaga keldi");
                            setLoading(false);
                        });
                    }
                }}>
                    {(loading)?
                    <i className="fi fi-rr-loading"></i>:
                    <i className="fi fi-rr-check"></i>}
                </td>
                <td onClick={() => setEditMode(false)}>
                    <i className="fi fi-rr-cross"></i>
                </td>
            </tr>
        )
    }

    return (
        <tr>
            {/* numeration */}
            <td>{id + 1}</td>

            {Object.values(context)
                .map((e, i) => <td key={i}>{e}</td>)
            }
            {/* pencil */}
            <td onClick={() => setEditMode(true)}>
                <i className="fi fi-rr-pencil"></i>
            </td>
        </tr>
    )
}
