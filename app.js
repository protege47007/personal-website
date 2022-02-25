//constant Declarations
const express = require('express');
const _ = require('lodash');
const ejs = require('ejs');

const app = express(); //Express Initialisation

// App static files, EJS, & body-parser Initialisation
app.set('view engine', 'ejs');
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

//blog route
app.get('/blog', (req, res) =>{
    res.render('blog');
});


//Server Initialisation
app.listen(process.env.PORT || '4030', () => {
    console.log("Server is Live and Running...");
});
