
import supabase, { supabaseUrl } from "./client";


export async function getUrls(user_id){

    const {data,err}=await supabase.from("urls").select("*").eq("user_id",user_id)
 
    if(err){
        console.log(error.message);
      throw new Error("Unable to load URLS");
    }
  
    return data;
  
  }
  export async function deleteUrl(urlId){
    const {data,err}=await supabase.from("urls").delete().eq("id",urlId);
 
    if(err){
        console.log(error.message);
      throw new Error("Unable to load URLS");
    }
  
    return data;
  
  }
  export const createUrl=async({title,longUrl,customUrl,user_id},qrcode)=>{
    const shortUrl=Math.random().toString(36).substring(2,6); 
    const fileName=`qr-${shortUrl}`;
  const {error:StorageError}=await supabase.storage.from("qr_code").upload(fileName,qrcode);
  if(StorageError){
    throw new Error(StorageError.message);
  }
  const qr=`${supabaseUrl}/storage/v1/object/public/qr_code/${fileName}`;
  const {data,error}=await supabase.from('urls').insert([{
    title,
    original_url:longUrl,
    custom_url:customUrl||null,
    short_url:shortUrl,
    qr,
    user_id
  }]).select();
  if(error){
    throw new Error("Error creating short url")
  }
  
  return data;


  }
  export const getLongUrls=async(id)=>{

    const {data,error}=await supabase.from('urls').select("id,original_url").or(`short_url.eq.${id},custom_url.eq.${id}`).single();
    if(error){
      console.log(error.message);
      throw new Error(error.message);
    }
    console.log("get",data,error);
    return data;

  }
  export async function getUrl({id,user_id}){
    const {data,error}=await supabase.from('urls').select("*").eq('id',id).eq('user_id',user_id).single();
    console.log("getUrl",data);
    if(error){
      console.log(error);
      throw new Error('Short Url not found');
    }
    return data;
  }
 