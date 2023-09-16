import { nanoid } from "nanoid";
import { useState } from "react";

export default function Filter({arrayOforders, arrayOfHeaders, style, filters,keys}){
    const [open, setOpen] = useState(false);
    const [filterArray, setFilterArra] = useState(filters);
    let dn = {display: "flex"};
    if(!open){
        dn = {display: "none"};
    }
    return <td key={nanoid()}>
                <div style={{...style}} className="headers">
                    {arrayOfHeaders[keys]} <i className="fi fi-rr-angle-small-down p-20" onClick={()=>setOpen(!open)}></i>
                    <div className="filters border p-20" style={dn}>
                        {filters[keys]?.map((z,i) => <label key={i} style={{display: "flex"}}>
                                <input type="checkbox" checked/>{z}
                            </label>)}
                    </div>
                </div>
            </td>
}