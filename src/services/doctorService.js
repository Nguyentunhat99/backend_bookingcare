import db, { sequelize } from '../models/index';


let getTopDoctorHome = (limit) => {
    return new Promise(async(resolve, reject) => {//dùng promise để lúc nào cx trẩ  ra kết quả
        try {
            let users = await db.User.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                where: {
                    
                    roleid: 'R2'
                },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest:true 
            })
            resolve({
                errCode: 0,
                data: users
            })

        } catch (error) {
            reject(error);
        }
    });
 
};

let handlegetAllDoctor = () => {
    return new Promise(async(resolve, reject) => {//dùng promise để lúc nào cx trẩ  ra kết quả
        try {
            let doctors = await db.User.findAll({
                order: [['lastName', 'ASC']],
                where: { 
                    roleid: 'R2'
                },
                attributes: {
                    exclude: ['password','image'],
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },//positionData ten moi quan he
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest:true 
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error);
        }
    });
 
};

let saveDetailInforDoctor = (inputData) => {
    console.log('inputdata', inputData);
    return new Promise(async(resolve, reject) => {//dùng promise để lúc nào cx trẩ  ra kết quả
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else{
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    doctorId: inputData.doctorId,
                    description: inputData.description
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor succeed'
                })
            }

        } catch (error) {
            reject(error);
        }
    });
};

let getDetailInforDoctorByIdService = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.User.findOne(
                {
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        { model: db.Markdown , attributes: ['contentHTML', 'contentMarkdown','description']},
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },//positionData ten moi quan he
                    ],
                    raw: true,
                    nest:true 
                }
            );
            //atributes la lay cac ban ghi 
            //exclude la bỏ cac ban ghi 
            //include la them moi quan he 
            //raw: false sequelize object
            //raw: true js object
            if(data && data.image){
                data.image = new Buffer(data.image, 'base64').toString('binary');
            }
            resolve({
                errCode: 0,
                data: data
            });
        } catch (error) {
            reject(error)
        }
    }
    )
}


let handleEditMarkdown = (data) => {
    // console.log('data service',data);
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.doctorId){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requierd parameters doctorId'
                })
            }
            let Markdown = await db.Markdown.findOne({
                where: {
                    doctorId: data.doctorId,
                },
                raw: false,
            })
            // console.log('Markdown check 1999',Markdown)
            //neu muon thuc hien ham save thi phai xet raw=false de chuyen ve sequelize object con 
            //raw= true la objectbinh thuong
            if (Markdown) {
                Markdown.contentHTML = data.contentHTML;
                Markdown.contentMarkdown = data.contentMarkdown;
                Markdown.description = data.description;
                await Markdown.save();
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
module.exports = {
    getTopDoctorHome,
    handlegetAllDoctor,
    saveDetailInforDoctor,
    getDetailInforDoctorByIdService,
    handleEditMarkdown
}
