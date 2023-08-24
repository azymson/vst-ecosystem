export default function customAlert(text, status="alert") {
    const groupalert = document.getElementById("groupalert");
    console.log(groupalert);
    if (groupalert === null) {
        const customAlertElem = document.createElement("div");
        customAlertElem.id = "groupalert";
        const theElert = document.createElement("div");
        if(status === "alert")
        theElert.className = "border customAlert p-20 alert";
        else
        theElert.className = "border customAlert p-20 success";
        theElert.innerText = text;
        document.body.appendChild(customAlertElem);
        customAlertElem.appendChild(theElert);
        setTimeout(() => {
            customAlertElem.removeChild(theElert);
        }, 4900);
    } else {
        const theElert = document.createElement("div");
        if(status === "alert")
        theElert.className = "border customAlert p-20 alert";
        else
        theElert.className = "border customAlert p-20 success";
        theElert.innerText = text;
        groupalert.appendChild(theElert);
        setTimeout(() => {
            groupalert.removeChild(theElert);
        }, 4900);
    }
}