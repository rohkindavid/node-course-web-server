const express = require('express');
const hbs= require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use((req, res, next) => {
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`;

   console.log(log);
   fs.appendFile('server.log',log + '\n', (err) => {
       if(err) {
           console.log('Unable to append to server.log');
       }
   });

   next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/',(req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page!!!',
        currentYear: new Date().getFullYear(),
        header: 'my app',
        message: 'my app mesage'
    });


    // res.send({
    //     hey: "guy",
    //     anumber: 243,
    //     anobject: {
    //         whoa: "nuts",
    //         anarray: [],
    //         more: "stuff"
    //     },
    //     awesome: true,
    //     bogus: false,
    //     meaning: null,
    //     link: "http://jsonview.com",
    //     notLink: "http://jsonview.com is great",
    //     foo:{
    //     hey: "guy",
    //         anumber: 243,
    //         anobject: {},
    //     awesome: true,
    //         bogus: false,
    //         meaning: null,
    //         link: "http://jsonview.com",
    //         notLink: "http://jsonview.com is great"
    // }
    // });
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page!!!',
        currentYear: new Date().getFullYear(),
        header: 'my app',
        message: 'my app mesage'
    });
});



app.get('/bad',(req, res) => {
   res.send({
       errorMessage:'Unable to handle request'
   })
});

app.listen(3000);