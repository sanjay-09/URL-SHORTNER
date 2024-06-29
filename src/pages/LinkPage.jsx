import useFetch from '@/Hooks/useFetch';
import { urlState } from '@/context';
import { getClicksForUrls, getClicksForUrls2 } from '@/db/apiClicks';
import { deleteUrl, getLongUrls, getUrl } from '@/db/apiUrls';
import { LinkIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Copy,Download,Trash} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Location from '@/components/Location';
import Device from '@/components/Device';
const Host_Name = import.meta.env.VITE_HOST_NAME;




const LinkPage = () => {

  const {id}=useParams();
  const {user}=urlState();
 
  const {data:url,loading,error,fn}=useFetch(getUrl,{
    id:id,
    user_id:user?.id
  })
  console.log("data",url);
  const {data:dataStats,loading:loadingStats,error:errorStats,fn:fetchStats}=useFetch(getClicksForUrls2,id);
  const {loading:loadingDelete,fn:deleteFn}=useFetch(deleteUrl,id);
  console.log("DataS",dataStats);
  

  useEffect(()=>{
  if(user){
    fetchStats();
    fn();
    
  }

  },[user]);
  const link=url?.custom_url ? url?.custom_url :url?.short_url;
  console.log(url);
  const download=()=>{
        
    const a=document.createElement('a');
    a.href=url?.qr;
    a.download=url?.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
}
const deleteClick=async()=>{
    await deleteFn();
    fetchUrl();

}
 

  return (
    <div className='flex flex-col gap-8 sm:flex-row justify-between'>
      <div className='flex flex-col gap-6 sm:w-2/5'>
        <h1 className='text-3xl sm:text-8xl font-extrabold'>{url?.title}</h1>
         <Link to={`/${link}`} className='text-blue-600 text-2xl sm:text-3xl hover:underline cursor-pointer font-extralight'>{`${Host_Name}/${link}`}</Link>
         <a href={url?.original_url} target="_blank" className='flex items-center gap-1 hover:underline cursor-pointer text-1xl sm:text-2xl'>
          <LinkIcon className='p-1'/>
          {`${url?.original_url}`}
          </a>
          <span className='text-1xl sm:text-2xl font-extralight'>{new Date(url?.created_at).toLocaleString()}</span>
          <div className='flex gap-1'>
          <Button varinat="ghost" onClick={()=>{
                navigator.clipboard.writeText(`${Host_Name}/${link}`)
            }}>
                <Copy/>
            </Button>
            <Button onClick={download}>
                <Download/>
            </Button>
            <Button onClick={deleteClick}>
               {
                loadingDelete?<BeatLoader size={5} color='white'/>:<Trash/>
               }
            </Button>
       
          </div>
          <img src={url?.qr} alt="qr-code" className='w-full sm:w-[300px] self-center sm:self-start ring ring-blue-500' />


      </div>

      <Card className='sm:w-3/5'>
  <CardHeader>
    <CardTitle className='text-4xl font-extrabold'>Stats</CardTitle>
  
  </CardHeader>
 {
  dataStats && dataStats?.length? (
    <CardContent className="flex flex-col gap-6">
 <Card>
  <CardHeader>
    <CardTitle>Total Clicks</CardTitle>
   
  </CardHeader>
  <CardContent>
    <p>{dataStats?.length || 0}</p>
  </CardContent>
  </Card>
  <CardTitle>Location Data</CardTitle>
  <Location stats={dataStats} />
   <CardTitle>Device Info</CardTitle>
  <Device stats={dataStats} />
 

 
  </CardContent>

  ):<CardContent>{loadingStats==false?"No Stats":"Loading Stats"}</CardContent>
 }
  

</Card>
      
      
      
     
    </div>
  )
}

export default LinkPage
