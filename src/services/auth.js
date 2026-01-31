import { supabase } from "../utils/supabase.js";

export const PatientSignin=async(name,email,address,phone,password)=>{
    const {data,error}=await supabase.auth.signUp({
       email,
       password,
       phone,
        options: {
        data: {
          role:"patient",
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
            role:"doctor",
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

export const HospitalSignin=async(name,email,phone,password,address)=>{
    const {data,error}=await supabase.auth.signUp({
       email,
       password,
       phone,
        options: {
        data: {
          role:"hospital",
        },
      },
    });
    if(error) throw error;
    const user=data.user;

    const {data:hospital,error:err}=await supabase
    .from("Hospital")
    .insert([{
        id:user.id,
        phone,
        name,
        address,
        email
    }])
    .select()
    .single();
    if(err) throw err;
    return hospital;
};

export const StaffSignin=async(hospital_id,name,email,phone,password,address)=>{
    const {data,error}=await supabase.auth.signUp({
       email,
       password,
       phone,
        options: {
        data: {
          role:"hospital-staff",
        },
      },
    });
    if(error) throw error;
    const user=data.user;

    const {data:hospital_staff,error:err}=await supabase
    .from("Staff")
    .insert([{
        id:user.id,
        hospital_id,
        phone,
        name,
        address,
        email
    }])
    .select()
    .single();
    if(err) throw err;
    return hospital_staff;
};

export const PatientLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;

    const { data: patient, error: err } = await supabase
        .from("Patient")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (err) throw err;

    return {
        userId: data.user.id,
        patient,
        role: 'patient'
    };
};

export const DoctorLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;

    const { data: doctor, error: err } = await supabase
        .from("Doctor")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (err) throw err;

    return {
        userId: data.user.id,
        doctor,
        role: 'doctor'
    };
};

export const HospitalLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;

    const { data: hospital, error: err } = await supabase
        .from("Hospital")
        .select("*")
        .eq("id", data.user.id)
        .single();

    if (err) throw err;

    return {
        userId: data.user.id,
        hospital,
        role: 'hospital'
    };
};

export const StaffLogin=async(email,password)=>{
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;

    const { data: staff, error: err } = await supabase
    .from("Staff")
    .select("*")
    .eq("id", data.user.id)
    .single();

    if (err) throw err;

    return {
        userId: data.user.id,
        staff,
        role: 'hospital-staff'
    };
}
