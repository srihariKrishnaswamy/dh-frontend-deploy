import React, { useEffect, useState } from 'react';
import CompleteHeader from './Header/CompleteHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer  } from 'recharts';
import Typography from '@mui/material/Typography';
import {getCompanyAverages} from '../Actions/Actions'


const Dashboard = () => {
  // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];
  const [averages , setAverages] = useState([]);


  function safeDivision(numerator, denominator) {
    if (denominator === 0) {
      return 0;
    } else {
      return numerator / denominator;
    }
  }


  useEffect(() => {
    //logic to get company averages
    // setAverages([12,13,15,16]);


    async function asyncGetCompanyAverages() {
      var culture = 0;
      var cultureSum = 0;
      var wlb = 0;
      var wlbSum = 0;
      var trans = 0;
      var transSum = 0;
      var overall = 0;
      var overallSum = 0;
      
      const report = await getCompanyAverages(JSON.parse(localStorage.getItem("user")).employer_id);
      report.forEach(e => {
        if(e.culture) {
          culture += parseFloat(e.culture);
          cultureSum++;
        }
        if(e.transparency) {
          trans += parseFloat(e.transparency);
          transSum++;
        }
        if(e.wlb) {
          wlb += parseFloat(e.wlb);
          wlbSum++;
        }
        if(e.overall) {
          overall += parseFloat(e.overall);
          overallSum++;
        }
      });
      setAverages([{ name: 'Work Life Balance', value: safeDivision(wlb, wlbSum)},
      { name: 'Transparency', value: safeDivision(trans, transSum) },
      { name: 'Culture', value: safeDivision(culture, cultureSum) },
      { name: 'Overall', value: safeDivision(overall, overallSum) }])
      console.log(report);
    }
    asyncGetCompanyAverages();
  }, [])


  return (
    <CompleteHeader>
      <div>
      <Typography variant='h4'>Your home for workplace clarity</Typography>
      <Typography variant='h6'>Check out how you are doing so far </Typography>
      <div style={{ maxWidth: '600px', width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={averages} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 7]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#E66E15" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      </div>
    </CompleteHeader>
  );
};


export default Dashboard;