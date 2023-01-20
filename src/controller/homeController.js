import connection from '../configs/connectDB';

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


module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    editUser,
    updateUser
}