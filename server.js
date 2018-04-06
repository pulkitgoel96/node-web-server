const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintainance.hbs');
});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: 'Pulkit Goel',
    //     likes: [
    //         'Music',
    //         'Movies',
    //         'Coding'
    //     ]
    // });
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my first express website',
        pageTitle: 'Home Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Some error occured'
    });
});

app.listen(3000);