import useFetch from '@/Hooks/useFetch';
import { getLongUrls } from '@/db/apiUrls';
import {storeClicks} from '@/db/apiClicks'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BarLoader, BeatLoader } from 'react-spinners';

const Redirect = () => {
  const {id}=useParams();
  const {loading,data,fn}=useFetch(getLongUrls,id);
  
  const {loading:loadingStats,fn:fnStats}=useFetch(storeClicks,{
    id:data?.id,
    original_url:data?.original_url
  })
  console.log("Redirect",data);
 useEffect(()=>{
  
  if(id){
    fn();
  }

 },[]);
 useEffect(()=>{
  console.log("data",data);
  console.log("loading",loading);

  if(!loading&&data){
    fnStats();
  }

 },[loading]);

 if(loading || loadingStats){
  return(
    <>
    <BarLoader width={"100%"} color='#36d7b7'/>
    <br />
    Redirecting.....
    </>
  )
 }
  return null;
}

export default Redirect
