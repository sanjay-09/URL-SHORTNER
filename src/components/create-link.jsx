import { urlState } from '@/context';
import React, { useState,useRef, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Input } from './ui/input';
import Error from './Error';
import { Card,  CardFooter} from './ui/card';
import { QRCode } from 'react-qrcode-logo';
import * as Yup from "yup";
import useFetch from '@/Hooks/useFetch';
import { createUrl } from '@/db/apiUrls';
import { BeatLoader } from 'react-spinners';
  
const CreateLink = () => {
   const {user} =urlState();
   const navigate=useNavigate();
   let [searchParams,setSearchParams]=useSearchParams();
   const longLink=searchParams.get("createNew");  
   const [errors,setErrors]=useState({});
   const ref=useRef();
   console.log("erris",errors);
  const [formValues,setFormValues]=useState({
    title:'',
    longUrl:longLink?longLink:"",
    customUrl:''
   })


   const handleChange=(e)=>{
    const {value,id}=e.target;
    setFormValues({
        ...formValues,
        [id]:value
    });

    
   }
   const schema=Yup.object().shape({
    title:Yup.string().required('title is required'),
    longUrl:Yup.string().url('Must be a valid URL').required('Long Url is required'),
    customUrl:Yup.string()
   });
   const {data,error,loading,fn:fnCreateUrl}=useFetch(createUrl,{
    ...formValues,
    user_id:user.id
   });
   console.log("useFetch",data);
   const Submit=async()=>{
    try{
        await schema.validate(formValues,{abortEarly:false});
        const canvas = ref.current.canvasRef.current;
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
  
        await fnCreateUrl(blob);



    }
    catch(error){
        const newObj={};
        error.inner.forEach((err)=>{
            newObj[err.path]=err.message


        })
        setErrors(newObj);

    }

   }
useEffect(()=>{
  if(error===null&&data){
    navigate(`/link/${data[0].id
    }`);
  }


},[data,error]);

  return (
    
      <Dialog defaultOpen={longLink} onOpenChange={(res)=>{
        if(!res){
            setSearchParams({});

        }
      }}>
  <DialogTrigger>
    <Button>Create New Link
    
    </Button>
   
  </DialogTrigger>
  
  <DialogContent className="sm:max-w-md">
    <DialogHeader >
      <DialogTitle className='font-bold text-2xl'>Create New</DialogTitle>
      {error?.message && <Error message={error.message}/>}
      {formValues.longUrl&&<QRCode value={formValues.longUrl} size={250} ref={ref}/>}
    </DialogHeader>
    <Input id='title' placeholder='Short Link Title' value={formValues.title} onChange={handleChange}/>
   {
    errors?.title && <Error message={errors.title}/>
   }
    <Input id='longUrl' placeholder='Long URL' value={formValues.longUrl} onChange={handleChange}/>
    {
      errors?.longUrl && <Error message={errors.longUrl}/>
    }
    
   <div className='flex gap-2'>
    <Card className='p-2'>trimmer.in</Card> /   
    <Input id='customUrl' placeholder='Custom URL(Optional)' value={formValues.customUrl} onChange={handleChange}/>
    {
      errors.customUrl && <Error message={errors.customUrl}/>
    }
   </div>
  <DialogFooter className='sm:justify-start'>
    <Button onClick={Submit}>{loading?<BeatLoader/>:"Create"}</Button>
  </DialogFooter>
   

  </DialogContent>
</Dialog>

    
  )
}

export default CreateLink;
