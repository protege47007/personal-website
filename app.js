//constant Declarations
const express = require('express');
const _ = require('lodash');
const ejs = require('ejs');
require('dotenv').config();
const mailjet = require ('node-mailjet').connect(`${process.env.JET_ONE}`, `${process.env.JET_TWO}`)

const app = express(); //Express Initialisation

// App static files, EJS, & body-parser Initialisation
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

//home route
app.get('/', (req, res) => {
    res.render('about', {});
});

//resume route
app.get('/resume', (req, res)=> {
    res.render('resume');
});

//portfolio route
app.get('/portfolio', (req, res) => {
    res.render('portfolio');
});


//contact route
app.get('/contact', (req, res) =>{
    res.render('contact');
});

app.post('/contact', (req, res) => {
    const {name, mail, subject, message} = req.body;

    console.log(req.body);
    const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "davidak.a@yahoo.com",
        "Name": "David"
      },
      "To": [
        {
          "Email": "davidak.a@yahoo.com",
          "Name": "David"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": `"My first Mailjet email" ${name}, ${mail}, ${subject}, ${message}`,
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    res.json({status: '200', message: 'success'});
    console.log(result.body)
  })
  .catch((err) => {
      res.json({status: '500', message: 'internal server error', body: err});
    console.log(err.statusCode)
  })



});

//blog route
app.get('/blog', (req, res) =>{
    res.render('blog');
});

app.use((req, res) => {
    //error page render
})






//Server Initialisation
app.listen(process.env.PORT || '4030', () => {
    console.log("Server is Live and Running...");
});
