import "./header.css";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
  let fullName;
  if (
    localStorage.getItem("name") !== null &&
    localStorage.getItem("second_name") !== null
  ) {
    fullName =
      localStorage.getItem("name")[0] + localStorage.getItem("second_name")[0];
  }
  const currentPage = useLocation().pathname;
 
  function logout() {
    localStorage.removeItem("login");
    localStorage.removeItem("password");
    localStorage.removeItem("name");
    localStorage.removeItem("second_name");
    window.location.href = "/";
  }

  return (
    <header className="header border">
      <Link to={(currentPage!=="/")?"/home":"/"}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
      </Link>
      {fullName !== undefined ? (
        <div className="username">
          {fullName}
          <div className="nav-hint border" onClick={logout}>
            Chiqish
          </div>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
