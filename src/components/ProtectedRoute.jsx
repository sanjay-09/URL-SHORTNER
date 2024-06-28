import { urlState } from '@/context';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

const ProtectedRoute = ({children}) => {
    console.log("Protected Route");
    const navigate=useNavigate();
    const {loading,isAuthenticated}=urlState();
    console.log("isAuth",isAuthenticated);
    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/auth");
        }
    },[isAuthenticated]);
  if(loading){
    return <BarLoader width={"100%"} color='#36d7b7'/>
  }
  if(isAuthenticated){
    return children;
  }
}

export default ProtectedRoute
