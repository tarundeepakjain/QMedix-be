import {
    PatientSignin,
    DoctorSignin,
    HospitalSignin,
    PatientLogin,
    DoctorLogin,
    HospitalLogin,
    StaffLogin,
    StaffSignin
} from "../services/auth.js";

class Auth{
    Patientsignup=async(req,res,next)=>{
        try {
          const {name,email,address,phone,password}=req.body;
        if(!name || !password || !email || !address || !phone){
            return res.status(400).json({
                message:"All credentials required"
            })
        }
        const patient=await PatientSignin(name,email,address,phone,password);
        return res.status(200).json({
        message:"patient signin succesfull",
        patient
        })

        } catch (error) {
            next(error);
        }

    }
    Doctorsignup=async(req,res,next)=>{
        try {
        const {name,email,address,phone,password,speciality}=req.body;
       if(!name || !password || !email || !address || !phone){
            return res.status(400).json({
                message:"All credentials required"
            })
        }
        const doctor=await DoctorSignin(name,email,address,phone,password,speciality);
        return res.status(200).json({
        message:"dcotor signin succesfull",
        doctor
        })

        } catch (error) {
            next(error);
        }

    }

    Hospitalsignup=async(req,res,next)=>{
        try {
        const {name,email,phone,password,address}=req.body;
       if(!name || !password || !email || !phone || !address){
            return res.status(400).json({
                message:"All credentials required"
            })
        }
        const hospital=await HospitalSignin(name,email,phone,password,address);
        return res.status(200).json({
        message:"hospital signin succesfull",
        hospital
        })

        } catch (error) {
            next(error);
        }

    }

    Staffsignup=async(req,res,next)=>{
        try{
            const {hospital_id,name,email,phone,password,address}=req.body;
            if(!hospital_id || !name || !password || !email || !phone || !address){
                    return res.status(400).json({
                        message:"All credentials required"
                    })
            }
            const staff=await StaffSignin(hospital_id,name,email,phone,password,address);
            return res.status(200).json({
                message:"Staff signin succesfull",
                staff
            })
        }catch(error){
            next(error);
        }
    }

    Patientlogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password required"
                });
            }
            const result = await PatientLogin(email, password);
            
            req.session.user={
                id: result.userId,
                role: result.role,
                name: result.patient.name
            };
            return res.status(200).json({
                message: "Login successful",
                patient: result.patient
            });

        } catch (error) {
            next(error);
        }
    }

    Doctorlogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password required"
                });
            }
            const result = await DoctorLogin(email, password);

            req.session.user = {
                id: result.userId,
                role: result.role,
                name: result.doctor.name    
            };

            return res.status(200).json({
                message: "Login successful",
                ...result
            });
        } catch (error) {
            next(error);
        }
    }

    Hospitallogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password required"
                });
            }
            const result = await HospitalLogin(email, password);

            req.session.user = {
                id: result.userId,
                role: result.role,
                name: result.hospital.name  
            };

            return res.status(200).json({
                message: "Login successful",
                ...result
            });
        } catch (error) {
            next(error);
        }
    }

    Stafflogin = async(req,res,next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password required"
                });
            }
            const result = await StaffLogin(email, password);

            req.session.user = {
                id: result.userId,
                role: result.role,
                name: result.staff.name  
            };

            return res.status(200).json({
                message: "Login successful",
                ...result
            });
        } catch (error) {
            next(error);
        }
    }
};

export default new Auth();
