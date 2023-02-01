import express from 'express';
import homeController from '../controller/homeController';
// import multer from 'multer';
// import path from 'path';
// var appRoot = require('app-root-path');
let router = express.Router();


const initWebRoute = (app) => {
    router.get('/',homeController.getHomepage);
    router.post('/postCRUD',homeController.postCRUD);  
    router.get('/getCRUD',homeController.getCRUD);  
    router.get('/editCRUD',homeController.editCRUD);   
    router.post('/updateCRUD',homeController.updateCRUD);
    router.get('/deleteCRUD',homeController.deleteCRUD);   
    return app.use('/', router)
}
export default initWebRoute;