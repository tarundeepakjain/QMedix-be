import express from "express";
import Auth from "../controller/auth.js";
const router=express.Router();
router.post("/signup/patient",Auth.Patientsignup);
router.post("/signup/doctor",Auth.Doctorsignup);
router.post("/signup/hospital",Auth.Hospitalsignup);
export default router;