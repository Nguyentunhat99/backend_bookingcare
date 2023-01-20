import express from 'express';
import APIController from '../controller/APIController';
let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users',APIController.getAllUsers);//method: get read
    router.post('/createNewUser',APIController.createNewUser);//method: post create
    router.put('/updateUser/:userid', APIController.updateUser);//method put u[date data]
    router.delete('/deleteUser/:userId',APIController.deleteUser);//method: delete Delete data    
    
    return app.use('/api/v1/', router)
}
export default initAPIRoute;