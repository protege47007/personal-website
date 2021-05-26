//constant Declarations
const express = require('express');
const bp = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs');

const app = express(); //Express Initialisation

// App static files, EJS, & body-parser Initialisation
app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static('public'));

//home route
app.get('/', (req, res) => {
    res.render('about', {});
});
app.get('/about', (req, res) => {
    res.redirect('/');
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
app.listen('3030', () => {
    console.log("Server is Live and Running...");
})
