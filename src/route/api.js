import express from 'express';
import userController from '../controller/userController';
import doctorController from '../controller/doctorController';
let router = express.Router();

const initAPIRoute = (app) => {
    router.post('/login',userController.handleLogin);
    router.post('/createNewUser',userController.handleCreateNewUser);
    router.get('/getAllUsers', userController.handlegetAllUsers);
    router.put('/updateUser',userController.handleupdateUser);
    router.delete('/deleteUser',userController.handleDeleteUser);
    router.get('/allCode',userController.getAllCode);
    router.get('/top-doctor-home',doctorController.getTopDoctorHome);
    router.get('/get-all-doctor',doctorController.getAllDoctor);
    router.post('/detail-infor-doctor',doctorController.detailInforDoctor);
    router.get('/get-detail-infor-doctor-by-id',doctorController.getDetailInforDoctorById);
    
    return app.use('/api/v1/', router)
}
export default initAPIRoute; 