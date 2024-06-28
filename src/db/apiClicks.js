import supabase, { supabaseUrl } from "./client";
import { UAParser } from "ua-parser-js";
export async function getClicksForUrls(urlId){
 
 
   
    const {data,err}=await supabase.from("clicks").select("*").eq("url_id", urlId);
    console.log("Data----->",data)
   
  
    if(err){

        console.log(error.message);
      throw new Error("Unable to load URLS");
    }
    console.log("data",data);
  
    return data;
  
  }
  const parser=new UAParser();
  export const storeClicks=async({id,original_url})=>{
    try{
      const res=parser.getResult();
      const device=res?.type||'desktop';
      // const response=await fetch('http://ipapi.co/json');
      // const {city,country_name:country}=await response.json();

      await supabase.from('clicks').insert({
        url_id:id,
        city:'Delhi',
        country:'India',
        device:device
      })
      window.location.href=original_url;
     

      
         

    }
    catch(err){
      console.log('error recording links',error);
      throw new Error(err.message);

    }
  }
  