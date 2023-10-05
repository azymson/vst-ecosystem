import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import customAlert from "../../hooks/useAlert";
import useHTTP from "../../hooks/useWeb";

export default function FillBalancePage(){
    const [myBalanceEdit, setMyBalanceEdit] = useState(0);
    const [myBalance, setMyBalance] = useState("0");
    const [managers, setManagers] = useState([]);
    const [sum, setSum] = useState(0);
    const [manager, setManager] = useState("");
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        sendRequest("https://imbgroup.uz/get-active-transactions.php", "POST").then((e) => {
          setTransactions(JSON.parse(e));
        });
      }, [])
  
  
    const {sendRequest} = useHTTP();
    
    useEffect(() => {
        sendRequest("https://imbgroup.uz/cashier-list.php", "POST").then((e) => {
          setManagers(JSON.parse(e));
        });
      }, []);
      useEffect(() => {
        sendRequest("https://imbgroup.uz/get-balance.php", "POST").then((e) =>
          setMyBalance(JSON.parse(e))
        );
      }, []);

    return <>
        <Header></Header>
        <main className="mt-70 p-20">

          <div>
            <div className="row mb-20">
              <div className="balance p-20 border">
                <div className="heading">Umumiy balans:</div>
                <div className="sum">
                  {myBalance?.balance?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS
                </div>
                <i className="fi fi-rr-coins back-img"></i>
              </div>
              <div className="balance p-20 border">
                <div className="heading">Balansni toldirish:</div>
                {/* <div className="sum">
                        20 000 000 UZS
                    </div> */}
                <div className="row">
                  <input
                    type="number"
                    className="add-money sum"
                    placeholder="0 UZS"
                    min={0}
                    value={myBalanceEdit}
                    onChange={(e)=>setMyBalanceEdit(e.target.value)}

                  />
                  <i onClick={()=>{
                    sendRequest("https://imbgroup.uz/add-money.php", "POST",{
                      newBalance: myBalanceEdit
                    }).then(e=>customAlert(JSON.parse(e).message, "success"))
                  }} 
                  className="fi fi-rr-plus"></i>
                </div>
              </div>
            </div>
            <div className="border p-20 mb-20">
              <table>
                <tbody>
                  {managers.map((e, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div
                            className="border"
                            style={{
                              height: 50,
                              width: 50,
                              overflow: "hidden",
                            }}
                          >
                            <img
                              style={{ height: 50, width: 50 }}
                              src={e.image}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>{e.full_name}</td>
                        <td>
                          {e.balance.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
         
          <div className="border p-20 mb-20">
            <div className="mb-20">Yangi o'tkazma</div>
            <div className="row align-center mb-20">
              <input type="number" min="0" placeholder="summa" value={sum} onChange={e => setSum(e.target.value)} />
              <i className="fi fi-rr-angle-small-right"></i>
              <select value={manager} onChange={e => setManager(e.target.value)}>
                <option value={""} disabled>Kassirni tanlang</option>
                {managers.map((e, i) => <option key={i} value={e.login}>{e.full_name}</option>)}
              </select>
              <button
                onClick={() => {
                  sendRequest("https://imbgroup.uz/transfer-money.php", "POST", {
                    reciver: manager,
                    sum
                  }).then(e => customAlert(e, "success"))
                }}
                style={{ gridColumn: "3/-1" }}>O'tkazish</button>
            </div>

          </div>
          <div className="border p-20">
            <table>
              <tbody>
                <tr>
                  <td>Kimga</td>
                  <td>Summa</td>
                  <td>Status</td>
                </tr>
                {transactions.map((e, i) => {
                  return <tr key={i}>
                    <td>{e.name + " " + e.second_name}</td>
                    <td>{e.amount?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS</td>
                    <td>{e.type}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
          </div>

        </main>
    </>
}