import "./advanced.css";
import { useState } from "react";
/*eslint-disable*/
const EditablePopup = ({onSelectfunc, Ref, onKeyDown,heading}) => {
/*eslint-disable*/
    const [value, setValue] = useState("Toshkent");
    const [focused, setFocused] = useState(false);
    const list = [
        "Toshkent",
        "Sirdaryo",
        "Shaxrisabz",
        "Jizzax",
        "Namangan",
        "Farg`ona",
        "G`azalkent",
        "Qumariq",
        "Gurlan",
        "Jalaquduq",
        "Yangiobod",
        "Kitob",
        "Samarqand",
        "Xonobod",
        "Sergily",
        "Mang`it",
        "Boka",
        "Bekobot",
        "Bog`ot",
        "Bog`dod",
        "Chuqursoy",
        "Qo`qon",
        "Buka",
        "Andijon",
        "Buxoro",
        "Chiroqchi",
        "Denov",
        "Navoiy",
        "Ohangaron",
        "Pop", 
        "Qarshi",
        "Urgench",
        "Yangiyo`l",
        "Zarafshon",
        "G`ijduvon"
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
                placeholder={heading}
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
