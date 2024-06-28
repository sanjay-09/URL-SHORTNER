import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from 'react-router-dom'

import Login from '@/components/Login';
import SignUp from '@/components/Signup';
import { urlState } from '@/context';


const Auth = () => {
    const [searchParams]=useSearchParams();
    const longLink=searchParams.get('createNew');
    const {isAuthenticated,loading}=urlState();
    const navigate=useNavigate();
    useEffect(()=>{
      if(isAuthenticated){
        navigate(`/dashboard?${longLink ? `createNew=${longLink}`:""}`);



      }

    },[isAuthenticated])
  return (
    <div className='mt-12 flex flex-col items-center'>
        {
            searchParams.get('createNew')?<h1 className='text-3xl font-extrabold'>Hold Up Login first</h1>:<h1 className='text-3xl font-extrabold'>Login/SignUp</h1>
        }
    <Tabs defaultValue="login" className="w-[600px] mt-2">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="SignUp">SignUp</TabsTrigger>
  </TabsList>
  <TabsContent value="login"><Login/></TabsContent>
  <TabsContent value="SignUp"><SignUp/></TabsContent>
</Tabs>


      
    </div>
  )
}

export default Auth
