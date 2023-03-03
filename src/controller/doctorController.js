import doctorService from '../services/doctorService'; 

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    try {
        if(!limit){
            limit = 10;
            let dataDoctors = await doctorService.getTopDoctorHome(+limit);
            return res.status(200).json(dataDoctors);
        }         
    } catch (error) {
        console.log(error);
        return res.status(200).json({ 
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let dataAllDoctors = await doctorService.handlegetAllDoctor();
        console.log('dataAll', dataAllDoctors);
        return res.status(200).json(dataAllDoctors);
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({ 
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}
let detailInforDoctor = async (req, res) => {
    try {
        console.log('data', req.body);
        let response = await doctorService.saveDetailInforDoctor(req.body);
        console.log('response', response);
        return res.status(200).json(response);        
    } catch (error) {
        console.log(error);
        return res.status(200).json({ 
            errCode: -1,
            errMessage: 'Error from server...'
        })        
    }
}

let getDetailInforDoctorById  = async (req, res) => {
    try {
        let id = req.query.id;
        if(!id){
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters',
                users: []
            })
        }else{
            let dataInfor = await doctorService.getDetailInforDoctorByIdService(req.query.id);
            console.log('dataInfor', dataInfor);
            return res.status(200).json(dataInfor);        
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ 
            errCode: -1,
            errMessage: 'Error from server...'
        })        
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctor,
    detailInforDoctor,
    getDetailInforDoctorById
} 
1