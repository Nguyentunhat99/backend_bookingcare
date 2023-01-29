import connection from '../config/connectDB';


let getAllUsers = async (req,res) => {
    const [users, fields] = await connection.execute('SELECT * FROM users ');
    return res.status(200).json({
        message: 'Ok',
        data: users
    });
}

let createNewUser = async (req,res) => {
    let { firstName, lastName, email, address } = req.body;//destructuring
    if(!firstName || !lastName || !email || !address ) {
        return res.status(200).json({
            message: 'Missing'
        });    
    }
    
    const [data, field] = await connection.execute('insert into users(firstName ,lastName ,email ,address) values(?, ?, ?, ?)'
    ,[firstName, lastName, email, address])
    return res.status(200).json({
        message: 'Ok',
    });
}

let updateUser = async (req, res) => {
    let {  firstName, lastName, email, address, id } = req.body;
    console.log(req.body);
    const [data, field] = await connection.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
    [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: 'Ok',
    });
    
}


let deleteUser = async (req, res) => {
    let userid = req.params.userId;
    if(!userid) {
        return res.status(200).json({
            message: 'Missing',
        });    
    }
    const [data, field] = await connection.execute('delete from  users where id = ?', [userid]);
    return res.status(200).json({
        message: 'Ok',
    });

}
module.exports = {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser
} 
