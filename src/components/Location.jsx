import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  const data=[{
    city:'Noida',
    count:2,
  },{
    city:'Delhi',
    count:4
  },{
    city:'Gurgoan',
    count:6
  }]
  
  export default function Location({stats}) {

    const cityCount=stats.reduce((acc,item)=>{


        if(acc[item.city]){
            acc[item.city]+=1;

        }
       else{
         acc[item.city]=1;
       }
       return acc;

    },{});
    const cities=Object.entries(cityCount).map((item)=>{
        return {
            city:item[0],
            count:item[1]
        }
    })
   
    return (
     <div style={{width:"100%",height:300}}>
        <ResponsiveContainer>
         <LineChart width={700} height={300} data={cities}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" padding={{ left: 30, right: 30 }} />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          
        />
       
      </LineChart>
      </ResponsiveContainer>
     </div>
    );
  }
  