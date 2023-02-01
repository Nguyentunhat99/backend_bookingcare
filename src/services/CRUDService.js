import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error);
        }
    })
}
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email, 
                password: hashPasswordFromBcrypt,
                firstName: data.firstName, 
                lastName: data.lastName, 
                address: data.address, 
                phonenumber: data.phonenumber,  
                gender: data.gender === '1' ? true : false, 
                roleid: data.roleid, 
            })
            resolve('Success!!! Create a new user'); 
        } catch (error) {
            reject(error);
        }
    });
    
}

let getAllUser = ()=> {
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
};
let getUserInfobyId = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            let userInfor = db.User.findOne(
                { 
                    where: { id: id },
                    raw: true, 
                }
            )
            if (userInfor) {
                resolve(userInfor)
            } else {
                resolve({})
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user  = await db.User.findOne({
                where: {
                    id: data.id
                }
            })//tifm user co id tuyen vao
            if (user) {//update thong tin
                user.email = data.email;
                user.password = data.password,
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber; 
                user.gender = data.gender;
                user.roleid = data.roleid;
                await user.save();//luu thong tin
                resolve();
            } else {
                resolve();
            }
          
            resolve('Successfully update user')
        } catch (error) {
            reject(error);
        }
    })
};

let deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            await db.User.destroy({
                where: {
                    id: id,
                }
            });
            resolve('Successfully deleted');
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    createNewUser,
    getAllUser,
    getUserInfobyId,
    updateUser,
    deleteUser
}