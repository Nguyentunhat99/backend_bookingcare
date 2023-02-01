import db from '../models/index';
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email','roleid','password'],
                    where: {
                        email: email,
                    },
                    raw: true
                })
                if (user) {
                    let check = bcrypt.compareSync(password, user.password);//kiem tra password
                    if (check){
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        delete user.password;
                        userData.user = user
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2,
                    userData.errMessage = `User does not exist`;
                    resolve(userData)
                }
            } else {
                userData.errCode = 1,
                userData.errMessage = `Your email does not exist. Please re-enter!`;
            }
            resolve(userData)
        } catch (error) {
            reject(error);
        }
    });
 
};

//tao ham check email
let checkUserEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({//tim user co email truyen vao
                where:{
                    email: email,
                }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}



module.exports = {
    handleUserLogin,
}