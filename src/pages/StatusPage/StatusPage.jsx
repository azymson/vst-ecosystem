import { useState } from "react";
import Header from "../../components/header/header";
import ListOfOrdersNext from "../../components/listOfOrdersNext/listOfOrdersNext";
export default function StatusPage() {
    const [arrayOfOrders, setArrayOfOrders] = useState([]);
    const [select, setSelect] = useState("");
    
    return (
        <>
            <Header/>
            <main className="p-20 mt-70">
                <ListOfOrdersNext select={select} setSelect={setSelect} arrayOforders={arrayOfOrders} selectable={true}/>
            </main>
        </>
    );
}
