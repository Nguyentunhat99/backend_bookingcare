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


let handleUploadFile = async (req, res) => {
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`);
    // });
}

let handleUploadMultipleFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload-file">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    getuploadFilePage,
    handleUploadFile,
    handleUploadMultipleFiles
}