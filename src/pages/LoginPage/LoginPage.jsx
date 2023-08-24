import { useState } from "react";
import Header from "../../components/header/header";
import useHTTP from "../../hooks/useWeb";

import "./LoginPage.css";
export default function LoginPage() {
    const {sendRequest} = useHTTP();
    if (
        localStorage.getItem("login") !== null &&
        localStorage.getItem("password") !== null &&
        localStorage.getItem("name") !== null &&
        localStorage.getItem("second_name") !== null

    ) {
        window.location.href = "./home";
    }

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    function auth(e){
        e.preventDefault();
        sendRequest("https://imbgroup.uz/login.php", "POST", {login: login, password: password}).then(e=>{
            const response = JSON.parse(e);
            if(response?.status === 0){
                alert("login yoki parol xato");
            }else{
                localStorage.setItem("login", response.login);
                localStorage.setItem("password", response.password);
                localStorage.setItem("name", response.name);
                localStorage.setItem("second_name", response.second_name);
                
                window.location.href = "./home";
            }
        })    
    }
    return (
        <>
            <Header />
            <main className="LoginPage">
                <form action="" className="login-form" onSubmit={auth}>
                    Login
                    <input 
                        type="text" 
                        value={login} 
                        placeholder="Login" 
                        onChange={(e)=>setLogin(e.target.value)}
                    />
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="Parol" 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <input type="submit" value="LOGIN" />
                </form>
            </main>
        </>
    );
}
