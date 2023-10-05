import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import "./MoneyPage.css";
import useHTTP from "../../hooks/useWeb";
import customAlert from "../../hooks/useAlert";

export default function MoneyPage() {
	const { sendRequest } = useHTTP();
	const [managers, setManagers] = useState([]);
	const [myBalance, setMyBalance] = useState("0");
	const [mode, setMode] = useState("money");
	const [sum, setSum] = useState(0);
	const [manager, setManager] = useState("");
	const [search, setSearch] = useState("");
	const [transactions, setTransactions] = useState([]);
	const [transactions1, setTransactions1] = useState([]);

	useEffect(() => {
		sendRequest("https://imbgroup.uz/get-active-transactions.php", "POST").then(
			(e) => {
				setTransactions(JSON.parse(e));
			}
		);
	}, []);
	useEffect(() => {
		sendRequest("https://imbgroup.uz/get-transfer-list.php", "POST").then((e) =>
			setTransactions1(JSON.parse(e))
		);
	}, []);

	useEffect(() => {
		sendRequest("https://imbgroup.uz/cashguys-list.php", "POST").then((e) => {
			setManagers(JSON.parse(e));
		});
	}, []);
	useEffect(() => {
		sendRequest("https://imbgroup.uz/get-balance.php", "POST").then((e) =>
			setMyBalance(JSON.parse(e))
		);
	}, []);
	useEffect(() => {
		sendRequest("https://imbgroup.uz/get-transfer-list.php", "POST").then((e) =>
			setTransactions(JSON.parse(e))
		);
	}, []);
	function reciveMoney(id) {
		sendRequest("https://imbgroup.uz/recive-money.php", "POST", { id }).then(
			(e) => {
				customAlert(e);
				sendRequest("https://imbgroup.uz/get-transfer-list.php", "POST").then((e) =>
					setTransactions1(JSON.parse(e))
				);
			}
		);
	}
	function rejectMoney(id) {
		sendRequest("https://imbgroup.uz/reject-money.php", "POST", { id })
			.then(e => {
				customAlert(e);
				sendRequest("https://imbgroup.uz/get-transfer-list.php", "POST").then((e) =>
					setTransactions1(JSON.parse(e))
				);
			});
	}

	return (
		<>
			<Header></Header>
			<main className="mb-20 p-20 mt-70 money-page">

				<div className="border p-20 row mb-20">
					<div className="cursor-pointer" onClick={() => setMode("money")}>Otkazma</div>
					<div className="cursor-pointer" onClick={() => setMode("spend")}>Qoshimcha sarflar</div>
				</div>
				{mode === "money" ? (
					<>
						<div className="mb-20">
							<div className="sum border p-20 mb-20">
								{myBalance?.balance?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS
							</div>
							<div className="border p-20 mb-20">
								<div className="mb-20">Yangi o'tkazma</div>
								<div className="row align-center mb-20">
									<input
										type="number"
										min="0"
										placeholder="summa"
										value={sum}
										onChange={(e) => setSum(e.target.value)}
									/>
									<i className="fi fi-rr-angle-small-right"></i>
									<select
										value={manager}
										onChange={(e) => setManager(e.target.value)}
									>
										<option value={""} disabled>
											Kassirni tanlang
										</option>
										{managers.map((e, i) => (
											<option key={i} value={e.login}>
												{e.full_name}
											</option>
										))}
									</select>
									<button
										onClick={() => {
											sendRequest(
												"https://imbgroup.uz/transfer-money.php",
												"POST",
												{
													reciver: manager,
													sum,
												}
											).then((e) => {
												customAlert(e, "success");
												sendRequest("https://imbgroup.uz/get-transfer-list.php", "POST").then((e) =>
													setTransactions1(JSON.parse(e))
												);
											});
										}}
										style={{ gridColumn: "3/-1" }}
									>
										O'tkazish
									</button>
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
											return (
												e.name !== undefined && (
													<tr key={i}>
														<td>{e.name + " " + e.second_name}</td>
														<td>
															{e.amount?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
															UZS
														</td>
														<td>{e.type}</td>
													</tr>
												)
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className="mb-20">Transaksiyalar</div>
						{transactions1.map((e) => (
							<div key={e.id} className="border p-20">
								<div className="mb-20 cash-plus ">+ {e.amount}</div>
								<div className="row">
									<button onClick={() => reciveMoney(e.id)}>
										Qabul qilish
									</button>
									<button onClick={() => rejectMoney(e.id)}>Qaytarish</button>
								</div>
							</div>
						))}
					</>
				) : null}
				{mode === "spend" && <>
					<div className="sum border p-20 mb-20">
						{myBalance?.balance?.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} UZS
					</div>
					<div className="row">
						<input type="text" placeholder="Summa" />
						<input type="text" placeholder="Komment" />
						<button>Jonatish</button>
					</div>
				</>
				}
			</main>
		</>
	);
}
