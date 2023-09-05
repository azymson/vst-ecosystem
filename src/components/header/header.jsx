import "./header.css";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import useHTTP from "../../hooks/useWeb";
import { useEffect, useState } from "react";


export default function Header() {
  let fullName;
  let fullName2;
  const {sendRequest} = useHTTP();
  if (
    localStorage.getItem("name") !== null &&
    localStorage.getItem("second_name") !== null
  ) {
    fullName =
      localStorage.getItem("name")[0] + localStorage.getItem("second_name")[0];
    fullName2 = localStorage.getItem("name") + " " + localStorage.getItem("second_name");
    }
  const currentPage = useLocation().pathname;

  function logout() {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    localStorage.removeItem("name");
    localStorage.removeItem("second_name");
    window.location.href = "/";
  }
  const [notifications, setNotifications] = useState([]);
  const [visable, setVisable] = useState(false);
  useEffect(()=>{
    sendRequest("https://imbgroup.uz/get-message.php", "POST")
          .then(e=>setNotifications(JSON.parse(e)));
  },[])
  return (
    <header className="header border">
      
      <Link to={(currentPage !== "/") ? "/home" : "/"}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      <div className="corner-right" onBlur={()=>setVisable(false)}>
        <div className="notification" onClick={()=>setVisable(!visable)}>
        <i className="fi fi-rr-bell"></i>
        {(visable)?<div className="notification_block border">
        {notifications.map((e,k)=><div key={k} className="not-item">
            <div className="not-item-header">
              {e.header}
            </div>
            <div className="not-item-content">
              {e.message}
            </div>
          </div>)}
        
        </div>:null}
        </div>
        <div className="name">{fullName2}</div>
        {/* {fullName !== undefined ? (
          <div className="username">
            {fullName}
            <div className="nav-hint border" onClick={logout}>
              Chiqish
            </div>
          </div>
        ) : (
          ""
        )} */}
        {fullName !== undefined ? (
          <div className="username">
            <img src="https://imbgroup.uz/img/HQwHI.jpg" alt="" width={40} height={40}/>
            <div className="nav-hint border" onClick={logout}>
              Chiqish
            </div>
          </div>
        ) : (
          ""
        )}
        
        {/* https://imbgroup.uz/img/HQwHI.jpg */}
      </div>
    </header>
  );
}
