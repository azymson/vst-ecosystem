import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import customAlert from "./useAlert";
const useSocketIO = () => {
    const socket = useRef(null);
    useEffect(()=>{
        socket.current = io("http://localhost:3000");
        socket.current.on("connection", ()=>{
            customAlert("Connected", 'success');
        })
        return ()=>{
            socket.current.disconnect();
        }
    },[]);
    
    function refreshOrderList(){
        socket.current.emit('order');
    }
    return { refreshOrderList};
}
export default useSocketIO;