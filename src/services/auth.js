import { supabase } from "../utils/supabase.js";

export const PatientSignin=async(name,email,address,phone,password)=>{
    const {data,error}=await supabase.auth.signUp({
       email,
       password,
       phone,
        options: {
        data: {
          name,
         
        },
      },
    });
    if(error) throw error;
    const user=data.user;
   
    const {data:Patient,error:err}=await supabase
    .from("Patient")
    .insert([{
        id:user.id,
        name,
        address,
        phone,
        email,

    }])
    .select()
    .single();
    if(err) throw err;
    return Patient;
};
export const DoctorSignin=async(name,email,address,phone,password,speciality)=>{
    const {data,error}=await supabase.auth.signUp({
       email,
       password,
       phone,
        options: {
        data: {
          name,
          phone
        },
      },
    });
    if(error) throw error;
    const user=data.user;
   
    const {data:doctor,error:err}=await supabase
    .from("Doctor")
    .insert([{
        id:user.id,
        name,
        address,
        phone,
        email,
        hospital_id:null,
        speciality

    }])
    .select()
    .single();
    if(err) throw err;
    return doctor;
};
export const HospitalSignin=async(name,email,phone,password)=>{
    const {data,error}=await supabase.auth.signUp({
       email,
       password,
       phone,
        options: {
        data: {
          name,
          
        },
      },
    });
    if(error) throw error;
    const user=data.user;
   
    const {data:hospital,error:err}=await supabase
    .from("Hospital")
    .insert([{
        id:user.id,
        phone
    }])
    .select()
    .single();
    if(err) throw err;
    return hospital;
};