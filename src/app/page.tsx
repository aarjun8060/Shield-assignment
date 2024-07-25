'use client';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { EngagementData, EngagementTotals } from './api/engagements/route';
import Chart from '@/widget/component/chart';

export default function Home() {
  const [totals, setTotals] = useState<EngagementTotals | null>(null);
  const [data, setData] = useState<EngagementData[] | null>(null);

  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');

  useEffect(() => {
    const endDate = end_date ? new Date(end_date) : endOfDay(new Date());
    const startDate = start_date
      ? new Date(start_date)
      : startOfDay(subDays(endDate, 30));

    const fetchData = async () => {
      const response = await fetch(
        `/api/engagements?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`,
      );
      const result = await response.json();
      setTotals(result.rangeTotal);
      setData(result.range);
    };

    fetchData();
  }, [start_date, end_date]);

  return (
    <main className='main'>
      <div className='container'>
        <h1 className='heading'>A unified dashboard for your team.</h1>
        <p className='desc'>Aggregate members and profiles by teams, cohorts or activity. The choices are yours to make.</p>
        
        <div className='chart-main center'>
          {
            totals && data ? (
              <>
                  <div className='chart-header'>
                    <div className='desc' style={{fontWeight:"500!important"}}>
                      <p>Engagements <span style={{color: '#ccc'}}>Last 30 Days</span></p>
                    </div>
                    <div>
                      <p className='chart-val center'>{totals?.numComments} REPOSTS <div className='chart-val-color' style={{backgroundColor:"#fff"}}></div></p>
                      <p className='chart-val center'>{totals?.numComments} COMMENTS <div className='chart-val-color' style={{backgroundColor:"#B7BCC5"}}></div></p>
                      <p className='chart-val center'>{totals?.numReactions} REACTIONS <div className='chart-val-color' style={{backgroundColor:"#B7BCC5"}}></div></p>
                    </div>
                  </div> 
                  
                  <Chart
                    data={data}
                  />
                
              </>
            ) : (
              <div className='chart-container'>
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}
