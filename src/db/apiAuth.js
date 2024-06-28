import supabase, { supabaseUrl } from "./client";

export async function login({email, password}) {
    
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
        
        throw new Error(error.message);
    }
  
    return data;
  }

export async function getCurrentUser(){
  const {data:session,err}=await supabase.auth.getSession();
  if(!session.session){
    return null;
  }
  if(err){
    throw new Error(err.message);
  }

  return session.session.user;

}
export async function signUp({email,password,name,profilePic}){
  const fileName=`db-${name.split(" ").join("-")}-${Math.random()}`;
  const {error:StorageError}=await supabase.storage.from("profile_pic").upload(fileName,profilePic);
  if(StorageError){
    throw new Error(StorageError.message);
  }
  const {data,error}=await supabase.auth.signUp({
    email,
    password,
    options:{
      data:{
        name,
        profilePic:`${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`
      }
    }
  })
  if(error){
    throw new Error(error.message);
  }
  return data;

}

export const logout=async()=>{
  const {error}=await supabase.auth.signOut();
  if(error){
    throw new Error(error.message);
  }
  return data;
}