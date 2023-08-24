import Header from "../../components/header/header";
import ListOfOrders from "../../components/listOfOrders/listOfOrders";
import "./RejectPage.css";

export default function RejectPage(){
    if (
        localStorage.getItem("login") === null &&
        localStorage.getItem("password") === null
    ) {
        window.location.href = "./";
    }
return <>
    <Header></Header>
    <main className="reject-page">
        <ListOfOrders url={"https://imbgroup.uz/get-reject-list.php"} header={"Qaytarilganlar"}/>
    </main>
    </>
}