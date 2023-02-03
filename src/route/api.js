import express from 'express';
import userController from '../controller/userController';
let router = express.Router();

const initAPIRoute = (app) => {
    router.post('/login',userController.handleLogin);
    router.post('/createNewUser',userController.handleCreateNewUser);
    router.get('/getAllUsers', userController.handlegetAllUsers);
    router.put('/editUser',userController.handleeditUser);
    router.delete('/deleteUser',userController.handleDeleteUser);
    
    return app.use('/api/v1/', router)
}
export default initAPIRoute; 