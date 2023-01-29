import connection from '../config/connectDB';
import db from '../models';
// import multer from 'multer';


let getHomepage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('--------------------------------');
        console.log(data);
        return res.render('homePage.ejs', { data:data });
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getHomepage
}