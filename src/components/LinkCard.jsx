import React from 'react'

import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { BatteryLow, Copy, Delete, Download, Trash } from 'lucide-react'
import useFetch from '@/Hooks/useFetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'
const Host_Name = import.meta.env.VITE_HOST_NAME;
const LinkCard = ({url,fetchUrl}) => {

   const {data,loading:loadingDelete,error,fn:deleteFn} =useFetch(deleteUrl,url?.id);
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
    <div className='flex flex-col sm:flex-row bg-gray-900 p-4 gap-2'>
        <img src={url?.qr} alt="qr-tag" className=' self-start h-32 object-contain ring ring-blue-500' />
        <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>
        <span className='text-3xl font-extrabold hover:underline cursor-pointer'>{url?.title}</span>
        <span className='text-2xl hover:underline cursor-pointe'>{`${Host_Name}/`}{url?.custom_url?url.custom_url:url.short_url}</span>
        <span className='flex items-center hover:underline cursor-pointer'>{url?.original_url}</span>
        <span className='flex items-end flex-1 hover:underline cursor-pointer text-sm'>{new Date(url?.created_at).toLocaleString()}</span>
        </Link>
        <div className='flex'>
          
            <Button varinat="ghost" onClick={()=>{
                navigator.clipboard.writeText(`${Host_Name}/${url?.custom_url?url?.custom_url:url?.short_url}`)
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
      
    </div>
    
  )
}

export default LinkCard
