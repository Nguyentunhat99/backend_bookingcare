import express from 'express';
import userController from '../controller/userController';
let router = express.Router();

const initAPIRoute = (app) => {
    router.post('/login',userController.handleLogin);
    
    return app.use('/api/v1/', router)
}
export default initAPIRoute; 