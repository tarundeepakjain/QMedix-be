import {
    PatientSignin,
    DoctorSignin,
    HospitalSignin,
    PatientLogin,
    DoctorLogin,
    HospitalLogin,
    StaffLogin,
    StaffSignin,
    ApproveDoctor,
    ApproveStaff,
    RejectRequest
} from "../services/auth.js";

class Auth{
    approve = async (req, res, next) => {
        let { role, id } = req.params;
        let hospital_id = req.user.id;

        id = id?.trim();
        hospital_id = hospital_id?.trim();
        try {
            if (role === "doctor") {
                const approval = await ApproveDoctor(id, hospital_id);
                return res.status(200).json(approval);
            } 
            else if (role === "hospital-staff") {
                const approval = await ApproveStaff(id, hospital_id);
                return res.status(200).json(approval);
            } 
            else {
                return res.status(400).json({ message: "Invalid role" });
            }
        } catch (error) {
            next(error);
        }
    };


    reject=async(req,res,next)=>{
        const id=req.params.id;
        const hospital_id=req.user.id;

        try{
            const rejection = await RejectRequest(id,hospital_id);

            return res.status(200).json(rejection);

        }catch(error){
            next(error);
        }
    };

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
        const {name,email,address,phone,password,speciality,hospital_id}=req.body;
       if(!name || !password || !email || !address || !phone || !hospital_id){
            return res.status(400).json({
                message:"All credentials required"
            })
        }
        const doctor=await DoctorSignin(name,email,address,phone,password,speciality,hospital_id);
        return res.status(200).json({
        message:"Doctor registration request send successfully.",
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
                message:"Staff registration request send succesfully.",
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
            req.session.save((err) => {
                if (err) return next(err);

                return res.status(200).json({
                    message: "Login successful",
                    ...result
                });
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

            req.session.save((err) => {
                if (err) return next(err);

                return res.status(200).json({
                    message: "Login successful",
                    ...result
                });
            });
        } catch (error) {
            next(error);
        }
    }

    Hospitallogin = async (req, res, next) => {
        try {
            console.log(req.body);
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


            req.session.save((err) => {
                if (err) return next(err);

                return res.status(200).json({
                    message: "Login successful",
                    ...result
                });
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

            req.session.save((err) => {
                if (err) return next(err);

                return res.status(200).json({
                    message: "Login successful",
                    ...result
                });
            });
        } catch (error) {
            next(error);
        }
    }
};

export default new Auth();
