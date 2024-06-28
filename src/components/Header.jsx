import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut, LogOutIcon } from 'lucide-react'
import { urlState } from '@/context'
import { logout } from '@/db/apiAuth'
import useFetch from '@/Hooks/useFetch'
import { BarLoader } from 'react-spinners'


const Header = () => {
  const navigate=useNavigate();
  const {user,isAuthenticated,userLogin}=urlState();
 const {data,error,fn:logOutToAuth,loading}=useFetch(logout);
  return (
    <>
    <nav className='flex justify-between items-center py-4'>
        <Link to="/">
        <img src="/logo.png" alt=""  className='h-16'/>

        </Link>
        <div>
          {
            !user?<Button onClick={()=>{
              navigate("/auth");
            }}>Login</Button> :(
           
               <DropdownMenu >
              <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
              <Avatar>
            <AvatarImage src={user?.user_metadata?.profilePic} className="object-contain"/>
           <AvatarFallback>SS</AvatarFallback>
            </Avatar>

              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                <span> <Link to={"/dashboard"}><LinkIcon className='mr-2 h-4 w-4'/></Link></span>My Links</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                 <span onClick={async()=>{
                await  logOutToAuth();
                await userLogin();

                  navigate("/auth");

                 }} > <LogOut className='mr-2 h-4 w-4'/></span>
                  Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            
            )
          }
            
        </div>
    </nav>
    {loading && <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>}
    </>
  )
}

export default Header
