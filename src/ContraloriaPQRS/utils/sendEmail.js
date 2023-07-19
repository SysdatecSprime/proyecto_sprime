import { emailBaseUrl } from "./UrlBase"

async function sendEmail(fromEmail, toEmail, subject, bodyText) {
    fetch(`${emailBaseUrl}/api/Emails`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "idMailQueue": 0,
            "profile": 4,
            "from": "pruebas1sysdatec@outlook.com",
            "to": toEmail,
            "subject": subject,
            "copy": "",
            "bcc": "",
            "priority": 0,
            "isHTML": false,
            bodyText
        })
    });
}

export default sendEmail;