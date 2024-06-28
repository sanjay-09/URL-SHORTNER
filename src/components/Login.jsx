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
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { urlState } from '@/context'


const Login = () => {
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();
  const longLink=searchParams.get('createNew');
  const {user,userLogin}=urlState();
  console.log("user",user);
  

  const [form,setForm]=useState({
    email:"",
    password:""
  });
  const [errors,setError]=useState({});
  const {data,loading,error,fn:fnLogin}=useFetch(login,form);
 

  


useEffect(()=>{

  
  if(error===null&& data){
    userLogin().then((result) => {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}`:" "}`);
      
    });
    

  }
  
},[data,error]);


   const handleChange=(e)=>{
    const {name,value}=e.target;
    setForm({
        ...form,
        [name]:value
    });
    

   }
   const submit=async()=>{
    try{
        const schema=Yup.object().shape({
            email:Yup.string().email().required('Email is required'),
            password:Yup.string().min(6,'min 6 characters is needed').required('password is required')
        });
        await schema.validate(form,{abortEarly:false});
        await fnLogin(form);


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
    <CardTitle>Login</CardTitle>
    <CardDescription>Enter your details</CardDescription>
    {error &&  <Error message={error.message}/>}
  </CardHeader>
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
  <CardFooter>
    <Button className="w-full" onClick={submit}>{loading?<BeatLoader/>:"Submit"}</Button>
  </CardFooter>
</Card>

      
    </div>
  )
}

export default Login
