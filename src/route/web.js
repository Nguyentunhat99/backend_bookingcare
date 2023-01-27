import express from 'express';
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
    router.get('/',homeController.getHomepage);
    router.get('/detail/user/:userId', homeController.getDetailPage);
    router.post('/createNewUser', homeController.createNewUser);
    router.get('/deleteUser/:userId', homeController.deleteUser);
    router.get('/editUser/:userId', homeController.editUser);
    router.post('/updateUser', homeController.updateUser);

    router.get('/upload-file', homeController.getuploadFilePage);
    router.post('/upload-file-pic',upload.single('profile_pic'), homeController.handleUploadFile);


    return app.use('/', router)
}
export default initWebRoute;