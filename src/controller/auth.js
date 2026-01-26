import {PatientSignin,DoctorSignin,HospitalSignin} from "../services/auth.js";

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
        const {name,email,phone,password}=req.body;
       if(!name || !password || !email || !phone){
            return res.status(400).json({
                message:"All credentials required"
            })
        }
        const hospital=await HospitalSignin(name,email,phone,password);
        return res.status(200).json({
        message:"hospital signin succesfull",
        hospital
        })
        
        } catch (error) {
            next(error);
        }
      
    }
};

export default new Auth();