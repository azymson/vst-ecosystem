export default function useHTTP() {
    async function sendRequest(url, method, body) {
        const response = await fetch(url, {
            method,
            body: JSON.stringify({login: localStorage.getItem("login"), password: localStorage.getItem("password"),...body}),
            headers: {
                "Content-type": "application/json",
            },
        });
        return await response.text();
    }

    return { sendRequest };
}
