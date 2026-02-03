import express from "express";
import Auth from "../controller/auth.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router=express.Router();
router.post("/approve/:role/:id",authenticate,Auth.approve);
router.post("/reject/:id",authenticate,Auth.reject);
router.post("/signup/patient",Auth.Patientsignup);
router.post("/signup/doctor",Auth.Doctorsignup);
router.post("/signup/hospital",Auth.Hospitalsignup);
router.post("/signup/hospital-staff",Auth.Staffsignup);
router.post("/login/patient",Auth.Patientlogin);
router.post("/login/doctor",Auth.Doctorlogin);
router.post("/login/hospital",Auth.Hospitallogin);
router.post("/login/hospital-staff",Auth.Stafflogin);
export default router;