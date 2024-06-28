import React from 'react'
import {PieChart, Pie, Cell, ResponsiveContainer} from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Device = ({stats}) => {
    const deviceCount=stats.reduce((acc,item)=>{
        if(acc[item.device]){
            acc[item.device]+=1;

        }
        else{
            acc[item.device]=1;
        }
        return acc;

    },{});
    console.log(deviceCount);
    const data=Object.entries(deviceCount).map((item)=>{
        return {
            device:item[0],
            count:item[1]
        }
    })
    console.log(data);

  return (
    <div style={{width:"100%",height:300}}>
        <PieChart width={700} height={300}>
    <Pie
      data={data}
      
      labelLine={false}
      outerRadius={80}
      fill="#8884d8"
      label={({device, percent}) =>
        `${device}: ${(percent * 100).toFixed(0)}%`
      }
      dataKey="count"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
    </div>
  )
}

export default Device
