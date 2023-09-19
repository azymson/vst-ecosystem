import { nanoid } from "nanoid";
import { useState } from "react";
//eslint-disable-next-line
export default function Filter({ arrayOforders, arrayOfHeaders, style, filters, keys, filterState, setFilterState }) {
    const [open, setOpen] = useState(false);
    // const [filterArray, setFilterArray] = useState(filters);
    let dn = (open) ? { display: "flex" } : { display: "none" };
   
    function changeSelected(key, value){
        // console.log(key,value);
        const closeState = filterState[key].filter(e=>Object.keys(e)[0] === value)[0];
        const index = (filterState[key].map(e=>Object.keys(e)[0]).indexOf(value));
        // console.log(Object.values(closeState)[0]);
        const array = [...filterState[key]];
        array[index] = {[value]:!Object.values(closeState)[0]};
        setFilterState({...filterState, [key]:array});
    }
    // console.log(keys);
    return <td key={nanoid()}>
        
        <div style={{ ...style }} className="headers">
            {arrayOfHeaders[keys]} <i className="fi fi-rr-angle-small-down p-20" onClick={() => setOpen(!open)}></i>
            <div className="filters border p-20" style={dn}>
                {filterState[keys]?.map((z, i) => {
                    return (
                        <label key={i} style={{ display: "flex" }}>
                            <input type="checkbox" checked={Object.values(z)[0]?true:false} onChange={()=>changeSelected(keys, Object.keys(z)[0])}/>{Object.keys(z)[0]}
                        </label>
                    )})
                }
            </div>
        </div>
    </td>
}