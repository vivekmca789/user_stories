const express           =   require('express');
const bodyParser        =   require('body-parser');
const http              =   require('http');
const mysql             =   require('mysql');
const myConnection      =   require('express-myconnection');
const path              =   require('path');
const expressValidator  =   require('express-validator');
const _                 =   require('lodash');
const moment            =   require('moment');
const app               =   express();


//load database connection
var dbConfig            =   require('./dbConfig');

var dbConn              =   {
    host                : dbConfig.database.host,
    user                : dbConfig.database.user,
    password            : dbConfig.database.password,
    database            : dbConfig.database.dbName,
    port                : dbConfig.database.port
}

app.use(myConnection(mysql,dbConn,'pool'));

//load routes files
const routes              =   require('./loadroutes');

//load view engine
app.set('view engine','ejs');

// set path for views files
app.set('views',path.join(__dirname,'views'));

//set port 
app.set('port', process.env.port || dbConfig.server.port);

//set body parser values into json format
app.use(bodyParser.urlencoded({extended :true }));
app.use(bodyParser.json());

//set path for frontend assets files
app.use(express.static(path.join(__dirname,'/assets')));
app.use(expressValidator());

app.locals.moment   = moment;


// load paths in global
global.websiteUrl = "http://localhost:5000"

app.use(function(req, res, next) {
  res.setHeader('Charset', 'utf-8')
  next();
});

//load files
app.use('/api',routes.api);


//Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send(err);
    //res.render('404-page');
});

http.createServer(app).listen(app.get('port'), function(req,res){
    
    console.log(`Server running on port : ${dbConfig.server.port}`);
});

module.exports = app;

