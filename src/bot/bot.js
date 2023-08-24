export async function sendMessage({ carID,date,from,to,carType,sapcode,orgName }) {
    const context = `
    ----------------------------------------------------------%0a
    Sana: ${date}%0a
    ${from} - ${to}%0a
    Mashina raqami: ${carID}%0a
    Mashina turi: ${carType}%0a
    SAP kodi: ${sapcode}%0a
    Firma nomi: ${orgName}%0a
    ----------------------------------------------------------
    `;

    const response = await fetch(`https://api.telegram.org/bot6536898950:AAHC0aCHOca0bpIGwzHGifdf-lGZ7E3tTUE/sendMessage?chat_id=-1001848739093&text=${context}`);
    return await response.ok;
}