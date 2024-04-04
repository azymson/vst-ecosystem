function createBlocker() {
    const blocker = document.createElement("div");
    blocker.classList.add("preloader");
    blocker.innerHTML = "<div class='spinner'></div>";
    document.body.appendChild(blocker);
    return blocker;
}

function removeBlocker(blocker) {
    if (blocker && blocker.parentNode) {
        blocker.parentNode.removeChild(blocker);
    }
}

export default function useHTTP() {
    async function sendRequest(url, method, body) {
        const blocker = createBlocker();

        try {
            const response = await fetch(url, {
                method,
                body: JSON.stringify({ login: localStorage.getItem("login"), password: localStorage.getItem("password"), ...body }),
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.text();
            removeBlocker(blocker);
            return responseData;
        } catch (error) {
            removeBlocker(blocker);
            
            throw error; // Propagate the error for further handling if needed
        }
    }

    return { sendRequest };
}
