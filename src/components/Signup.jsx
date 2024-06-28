import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import * as Yup from "yup"
import Error from './Error'
import useFetch from '@/Hooks/useFetch'
import { login, signUp } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { urlState } from '@/context'


const SignUp = () => {
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  const longLink=searchParams.get('createNew');
  const {user}=urlState();
  const [form,setForm]=useState({
    email:"",
    password:"",
    name:"",
    profilePic:null
  });
  const [errors,setError]=useState({});
  const {data,loading,error,fn:fnSignUp}=useFetch(signUp,form);
  console.log("si",data,loading,error);
 

useEffect(()=>{
  if(error===null&& data){
    navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`);

  }
  
},[error,loading]);


   const handleChange=(e)=>{
    const {name,value,files}=e.target;
    console.log("file",e.target.files);
    setForm({
        ...form,
        [name]:files?files[0]:value
    });
    

   }
   const submit=async()=>{
   
    try{
        const schema=Yup.object().shape({
            name:Yup.string().min(2).max(15,"Name cannot be more than 15").required('name is required'),
            email:Yup.string().email().required('Email is required'),
            password:Yup.string().min(6,'min 6 characters is needed').required('password is required'),
            profilePic:Yup.mixed().required('Profile pic is required')
        });
        await schema.validate(form,{abortEarly:false});
        await fnSignUp();


    }
    catch(e){
        
        const newErrors = {};

        e?.inner?.forEach((err) => {
          newErrors[err.path]=err.message
         
        });
        setError(newErrors);
        
        

    }
   }
  return (
    <div>
        <Card>
  <CardHeader className="text-center">
    <CardTitle>SignUp</CardTitle>
    <CardDescription>Enter your details</CardDescription>
    {error &&  <Error message={error.message}/>}
  </CardHeader>
  <CardContent className="space-y-2">
   <div className='space-y-1'>
    <Input name="name" type="type" placeholder="Enter your Name" value={form.name} onChange={handleChange}/>
    {
        errors?.name && <Error message={errors?.name}/>
    }

   </div>
  </CardContent>
  <CardContent className="space-y-2">
   <div className='space-y-1'>
    <Input name="email" type="email" placeholder="Enter your email" value={form.email} onChange={handleChange}/>
    {
        errors?.email && <Error message={errors?.email}/>
    }

   </div>
  </CardContent>
  <CardContent className="space-y-2">
   <div className='space-y-1'>
    <Input name="password" type="text" placeholder="Enter your password" value={form.password} onChange={handleChange}/>
    {
        errors?.password && <Error message={errors?.password}/>
    }

   </div>
  </CardContent>
  <CardContent className="space-y-2">
   <div className='space-y-1'>
    <Input name="profilePic" type="file" accept="image/*"  onChange={handleChange}/>
    {
        errors?.profilePic && <Error message={errors?.profilePic}/>
    }

   </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full" onClick={submit}>{loading?<BeatLoader/>:"Create an Account"}</Button>
  </CardFooter>
</Card>

      
    </div>
  )
}

export default SignUp;
