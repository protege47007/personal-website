// auth.js
const { google } = require('googleapis')

const auth = {
  type: "OAuth2",
  user: "lakerzhitman@gmail.com",
  clientId: process.env.GOOGLE_CLEINT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN
}

const mail_options = {
  from: "lakerzhitman@gmail.com",
  to: "akdadewumi@gmail.com",
  subject: "PWA: ",
}

const gmail_url_options = (url, access_token) => ({
  method: "POST",
  url: url,
  headers: {
    Authorization: `Bearer ${access_token}`,
    "Content-type": "application/json"
  }
})


const oAuth2Client = new google.auth.OAuth2(auth.clientId, auth.clientSecret, process.env.GOOGLE_REDIRECT_URL)
oAuth2Client.setCredentials({
  refresh_token: auth.refreshToken,
})

async function getToken(){
  const { token } = await oAuth2Client.getAccessToken()
  return token
}



// const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send']

// const url = oAuth2Client.generateAuthUrl({
//   access_type: 'offline',
//   prompt: 'consent',
//   scope: GMAIL_SCOPES,
// })

console.log('Authorize this app by visiting this url:', url)



module.exports = {}