import connection from '../configs/connectDB';

let getHomepage = async (req, res) => {
    const [rows, fields] = await connection.execute('SELECT * FROM users ');
    
    return res.render('index.ejs', { dataUser:rows })

}

let getDetailPage = async (req, res) => {
    let userid = req.params.userId;
    let [user, fields] = await connection.execute('SELECT * FROM users where id = ?', [userid]);
    // console.log('check rq params:', req.params);
    return res.send(JSON.stringify(user));
}

module.exports = {
    getHomepage,
    getDetailPage
}