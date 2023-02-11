import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            //check mail
            let check = await checkUserEmail(data.email);
            if (check  === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already is used, Plz try another email!'
               })
            } else {
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
                resolve({
                    errCode: 0,
                    errMessage: 'Added user successfully!'
                }); 
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    console.log(userId);
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if( userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: {
                        id:userId,
                    },
                    attributes: {
                        exclude: ['password'],
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}

let updateUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requierd parameters id'
                })
            }
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                },
                raw: false,
            })
            if (user) {
                user.id = data.id;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;

                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: `update the user succeeds!`
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User's not found`
                }); 
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId,
                }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })
            }

            await db.User.destroy({
                where: {
                    id: userId,
                }
            })
            resolve({
                errCode: 0,
                errMessage: 'The user is deleted '
            }); 
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter '
                })
            }else{
                let dataAllCode = {};
                let allcode = await db.Allcode.findAll(
                    {
                        where: {
                           type: typeInput
                        }
                    }
                );
                dataAllCode.errCode = 0;
                dataAllCode.data = allcode;
                resolve(dataAllCode);
            }
        } catch (error) {
            reject(error)
        }
    }
    )
}
module.exports = {
    handleUserLogin,
    createNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getAllCodeService
}