import Header from "../../components/header/header";
import ListOfOrders from "../../components/listOfOrders/listOfOrders";
import  "./OverViewPage.css"
export default function OverViwePage(){
    if (
        localStorage.getItem("login") === null &&
        localStorage.getItem("password") === null
    ) {
        window.location.href = "./";
    }
    return <>
        <Header>

        </Header>
        <main className="overview-page">
            <ListOfOrders download={true} header={"Reyestr"} url={"https://imbgroup.uz/registery.php"} />
        </main>
    </>
}