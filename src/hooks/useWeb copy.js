export default function useHTTP1() {
    async function sendRequest1(url, method, body) {
        const response = await fetch(url, {
            method,
            body: JSON.stringify({login: localStorage.getItem("login"), password: localStorage.getItem("password"),...body}),
            headers: {
                "Content-type": "application/json",
            },
        });

        return await response.text();
    }

    return { sendRequest1 };
}
