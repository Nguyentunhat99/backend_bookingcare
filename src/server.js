import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
import connectDB from './config/connectDB';
import cors from 'cors';
import bodyParser from 'body-parser';

require('dotenv').config()
var morgan = require('morgan')//check log
const app = express();
//CORS
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const port = process.env.PORT || 8000;
// -----------------------------------
//-------------------------------------
app.use(morgan('combined'))
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

connectDB();
//-------------------------------------

//handle 404 notfound//chay sau router 
app.use((req,res) => {  
    return res.render('404.ejs')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

