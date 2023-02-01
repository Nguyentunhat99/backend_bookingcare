import { request } from 'express';
import db from '../models/index';
import CRUDService from '../services/CRUDService'; 
// import multer from 'multer';


let getHomepage = async (req, res) => {
    // try {
    //     let data = await db.User.findAll();
    //     console.log('--------------------------------');
    //     console.log(data);
    //     return res.render('homePage.ejs', { data:data });
        
    // } catch (error) {
    //     console.log(error);
    // }
    return res.send('Trang chur')
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('ok');
}

let getCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log('---------------');
    // console.log(data);
    // console.log('---------------');
    return res.render('homePage.ejs', { data:data });
    
}
let editCRUD = async (req, res) => {
    console.log(req.query.id);
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfobyId(userId);
        console.log('Info user');
        console.log(userData);
        return res.render('editUser.ejs', { 
            data: userData
        });
    } else {
        return res.send('Error');
    }
    
};

let updateCRUD = async (req, res) => {
    let updateData = req.body;
    console.log(updateData);
    if (updateData) {
        let message = await CRUDService.updateUser(updateData)
        console.log('-------------------');
        console.log(message);
        console.log('-------------------');
        return res.redirect('/getCRUD');
    } else {
        return res.send('Error');
    }
};

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log('-------------------');
    console.log(userId);
    console.log('-------------------');

    if (userId) {
        let message = await CRUDService.deleteUser(userId);
        console.log('-------------------');
        console.log(message);
        console.log('-------------------');
        return res.redirect('/getCRUD');
    } else {
        return res.send('Error');
    }
};


module.exports = {
    getHomepage,
    postCRUD,
    getCRUD,
    editCRUD,
    updateCRUD,
    deleteCRUD
}