import express from 'express';
import homeController from '../controller/homeController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/',homeController.getHomepage);
    router.get('/detail/user/:userId', homeController.getDetailPage);
    router.post('/createNewUser', homeController.createNewUser);
    router.get('/deleteUser/:userId', homeController.deleteUser);
    router.get('/editUser/:userId', homeController.editUser);
    router.post('/updateUser', homeController.updateUser);
    // router.get('/about', (req, res) => {
    //     res.send(`I'm Nhat!`)
    // })

    return app.use('/', router)
}
export default initWebRoute;