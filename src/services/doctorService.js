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
                

                // raw: true,
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
            let dataDeataiInforDoctor = {};
            let detailinfor = await db.User.findOne(
                {
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['password','image'],
                    },
                    include: [
                        { model: db.Markdown , attributes: ['contentHTML', 'contentMarkdown','description']},//positionData ten moi quan he
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },//positionData ten moi quan he
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest:true 
                }
            );
            dataDeataiInforDoctor.errCode = 0;
            dataDeataiInforDoctor.data = detailinfor;
            resolve(dataDeataiInforDoctor);
        } catch (error) {
            reject(error)
        }
    }
    )
}

module.exports = {
    getTopDoctorHome,
    handlegetAllDoctor,
    saveDetailInforDoctor,
    getDetailInforDoctorByIdService
}
