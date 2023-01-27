import connection from '../configs/connectDB';
import multer from 'multer';


let getHomepage = async (req, res) => {
    const [rows, fields] = await connection.execute('SELECT * FROM users ');
    
    return res.render('index.ejs', { dataUser:rows })

}

let getDetailPage = async (req, res) => {
    let userid = req.params.userId;
    let [user, fields] = await connection.execute('SELECT * FROM users where id = ?', [userid]);
    console.log('check rq params:', req.params);
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
    // console.log(req.body);
    let { firstName, lastName, email, address } = req.body;//destructuring
    //let firstName = req.body.firstName
    //let lastName = req.body.lastName
    //let email = req.body.email
    //let address = req.body.address
    await connection.execute('insert into users(firstName ,lastName ,email ,address) values(?, ?, ?, ?)'
    ,[firstName, lastName, email, address])
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userid = req.params.userId;
    // console.log(userid);
    await connection.execute('delete from  users where id = ?', [userid]);
    return res.redirect('/');
}

let editUser = async (req, res) => {
    let userid = req.params.userId;
    // console.log(userid);
    let [userEdit, fields] = await connection.execute('SELECT * FROM users where id = ?', [userid]);
    console.log(userEdit);
    return res.render('update.ejs', { userEdit: userEdit });
    // return res.send('ok');
}

let updateUser = async (req, res) => {
    let {  firstName, lastName, email, address, id } = req.body;
    console.log(address);
    await connection.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
    [firstName, lastName, email, address, id]);
    return res.redirect('/');
    
}

let getuploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

const upload = multer().single('profile_pic');

let handleUploadFile = async (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`);
    });
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    getuploadFilePage,
    handleUploadFile
}