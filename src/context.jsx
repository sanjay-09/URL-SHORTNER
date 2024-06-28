import {  createContext, useContext, useEffect } from "react";
import useFetch from "./Hooks/useFetch";
import { getCurrentUser } from "./db/apiAuth";


const userContext=createContext();
export const MainContext=({children})=>{
    const {data:user,loading,error,fn:userLogin}=useFetch(getCurrentUser);
    const isAuthenticated=user?.role==="authenticated";
    console.log(isAuthenticated);
 

    useEffect(()=>{
         userLogin();

    },[]);



    return (
        <userContext.Provider value={{user,userLogin,loading,isAuthenticated}}>
            {children}
        </userContext.Provider>
    )
}
export const urlState=()=>{
    return useContext(userContext);
}