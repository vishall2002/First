const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
var app = express();
hbs.registerPartials(__dirname + '/myViews/Partial');

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname)
const viewsPath = path.join(__dirname, '/myViews')

// const port = process.env.PORT || 3000;    // Here env stands for environment (port environment variable) either environmetn will give a port no or it will use a default port no i.e 3000.
const port = process.env.PORT || 3000; // Updated code when i am using heroku


app.set('view engine', 'hbs')  //This line sets the view engine to handlebars
app.set('views', viewsPath)  //This line sets the directory for views to be served from


//Given line serves static files (such as images and stylesheets) from the public directory i.e Express_Middleware
app.use(express.static(publicDirectoryPath))

// Middleware functions
app.use((req, res, next) => {
  console.log("Running");
  next();
});

app.use((req, res, next) => {
  var log = `${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('LogFile.log', log + '\n', (err) => {
    if (err) {
      console.log("Opps Something went wrong !!");
    };
  });
  next();
});

// Rendering files 
app.get('', (req, res) => {
  res.render('intro', {
    currentYear: new Date().getFullYear()
  })
})

app.get('/membership.hbs', (req, res) => {
  res.render('membership', {
    currentYear: new Date().getFullYear()
  })
})

app.get('/History.hbs', (req, res) => {
  res.render('History', {
    currentYear: new Date().getFullYear()
  })
})

// Renders errors if somethinng is missing.
app.get('/intro/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'myname',
    errormessage: 'Specefic help not found !!'
  })
})

app.get('/membership/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'myname',
    errormessage: 'Specefic membership not found !!'
  })
})

app.get('/History/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'myname',
    errormessage: 'Specefic History not found !!'
  })
})

app.get('*', (req, res) => {    // Here * means everything. Isko hamesha last me use karna hai.
  res.render('404', {
    title: '404',
    name: 'myname',
    errormessage: 'No such page exist !!'
  })
})

// app.listen(3000, () => {
//   console.log('\nServer is listening at port number: 3000');
// });

app.listen(port, () => {
  console.log('\nServer is listening at port number: ${port}');
});
