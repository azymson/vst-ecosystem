import { useEffect, useState } from "react";
import "./Timer.css";
//eslint-disable-next-line
export default function Timer({ startTime }) {
    const [currentPersentage, setCurrenPersentage] = useState();
    setTimeout(() => setCurrenPersentage(currentPersentage + 1000), 1000);
    useEffect(() => {
        fetch("https://imbgroup.uz/get-time.php")
            .then((e) => e.text())
            .then((e) => {
                setCurrenPersentage(e - startTime);
            });
    //eslint-disable-next-line
    }, []);
    return (
        <>
            <div className="timer-border">
                <div
                    className="timer-body"
                    style={{
                        width: `${100 - Math.floor(currentPersentage/6000)}%`,
                        background: `rgb(${((Math.floor(currentPersentage/6000)-65 >=0))?((Math.floor(currentPersentage/6000)-65 >=0)):0}, 112, 106)`
                    }}
                >
                </div>
            </div>
        </>
    );
}
