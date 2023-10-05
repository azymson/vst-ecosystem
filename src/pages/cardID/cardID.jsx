import { useParams } from "react-router-dom";
import Header from "../../components/header/header";
import useHTTP from "../../hooks/useWeb";
import { useState } from "react";
import customAlert from "../../hooks/useAlert";

export default function CardID() {
    const { id } = useParams();
    const { sendRequest } = useHTTP();
    const [file, setFile] = useState(null);


    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append("id", id);
            try {
                const serverResponse = await fetch('https://imbgroup.uz/file.php', {
                    method: 'POST',
                    body: formData,
                });
                const answer = await serverResponse.text();
                
                const e = await sendRequest("https://imbgroup.uz/send-card.php", "POST", { id, formData })
                customAlert(e, "success");
                customAlert(answer, "success");
            } catch (error) {
                console.error('Error uploading file: ', error);
            }
        } else {
            console.error('No file selected');
        }
    };

    return (
        <>
        <Header/>
        <main className="p-20 mt-70">
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
        </main>
        </>
    );

}