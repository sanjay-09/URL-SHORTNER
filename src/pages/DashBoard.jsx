import { urlState } from '@/context'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter } from 'lucide-react'
import useFetch from '@/Hooks/useFetch'
import { getUrls } from '@/db/apiUrls'
import { getClicksForUrls } from '@/db/apiClicks'
import Error from '@/components/Error'
import LinkCard from '@/components/LinkCard'
import CreateLink from '@/components/create-link'


const DashBoard = () => {
  const [searchQuery,setSearchQuery]=useState("");
  const {user}=urlState();
  const {data:urls,loading,error,fn:fnUrls}=useFetch(getUrls,user?.id);
  const {loading:loadingClicks,data:clicks,fn:fnClicks}=useFetch(getClicksForUrls,urls?.map((url)=>url.id));
  console.log("urlS",urls);
  console.log("clicks",clicks);

  useEffect(()=>{
    fnUrls()
  },[]);

  useEffect(()=>{
   
    if(urls?.length){
      fnClicks();
    }

  },[urls?.length]);
  const filteredUrls=urls?.filter((url)=>{
    return url.title.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  })


  

 
  return (
    <div className='flex flex-col gap-8'>
    <div>
    {
      (loading || loadingClicks)  && <BarLoader width={"100%"} color='#36d7b7'/>
    }
    </div>
    <div className='grid grid-cols-2 gap-2'>
    <Card>
  <CardHeader>
    <CardTitle>Links Created</CardTitle>
   
  </CardHeader>
  <CardContent>
    <p>{urls?.length}</p>
  </CardContent>
 
</Card>
<Card>
  <CardHeader>
    <CardTitle>Total Clicks</CardTitle>
   
  </CardHeader>
  <CardContent>
    <p>{clicks?.length || 0}</p>
  </CardContent>
 
</Card>
    </div>
    <div className='flex justify-between'>
      <h1 className='text-4xl font-extrabold'>MyLinks</h1>
    <CreateLink/>

    </div>
    <div className='relative'>
      <Input type="text" placeholder="Filter Links...." value={searchQuery} onChange={(e)=>{
        setSearchQuery(e.target.value);
      }}/>
      <Filter className='absolute top-1 right-2 p-1'/>

    </div>
    {error && <Error message={error.message}/>}
    {(filteredUrls||[]).map((url)=>{
      return <LinkCard url={url} fetchUrl={fnUrls}/>
    })}
    </div>
  )
}

export default DashBoard
