import express from 'express';
import homeController from '../controller/homeController';
// import multer from 'multer';
// import path from 'path';
// var appRoot = require('app-root-path');
let router = express.Router();


const initWebRoute = (app) => {
    router.get('/',homeController.getHomepage);


    router.get('/about', (req, res) => {
        res.send(`I'm Eric!`)
    })
    return app.use('/', router)
}
export default initWebRoute;