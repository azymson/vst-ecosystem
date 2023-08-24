import "./advanced.css";
import { useState } from "react";
/*eslint-disable*/
const EditablePopup = ({onSelectfunc, Ref, onKeyDown}) => {
/*eslint-disable*/
    const [value, setValue] = useState("Toshkent");
    const [focused, setFocused] = useState(false);
    const list = [
        "Toshkent",
        "Sirdaryo",
        "Shaxrisabz",
        "Honobot",
        "Gazalkent",
        "Jizzax",
        "Namangan",
        "Sayhun",
        "Fargona",
        "Gazalkent",
        "Qumariq",
        "Gurlan",
        "Jalaquduq",
        "Toshkent (Family)",
        "Yangiobod",
        "Kitob",
        "Samarqand",
        "Xonobod",
        "Sergily",
        "Mangit",
        "Boka",
        "Bekobot",
        "Bogot",
        "Bogdod",
        "Chuqursoy",
        "Qoqon",
        "Buka",
        "Bektemir",
    ];
    function onSelect(element){
        if(onSelectfunc !== undefined)
        onSelectfunc(element);
        setValue(element);
    }

    return (
        <div className="advanced-input">
            <input
                type="text"
                placeholder="Qayerdan"
                value={value}
                ref={Ref}
                onKeyDown={onKeyDown}
                onChange={(e) => {onSelectfunc(e.target.value); setValue(e.target.value)}}
                onFocus={() => setFocused(true)}
                onBlur={() =>setTimeout(() => {
                    setFocused(false)
                }, 500) }
                
            />
            <div className={(focused ? "hint visiable" : "hint")}>
                {list
                    .filter((element) =>
                        element.toLowerCase().includes(value.toLowerCase())
                    )
                    .map((element, index) => (
                        <div
                            key={index}
                            className="hint-elem"
                            onClick={() => onSelect(element)}
                        >
                            {element}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default EditablePopup;
