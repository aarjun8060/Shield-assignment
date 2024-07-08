'use client';
import { endOfDay, startOfDay, subDays } from 'date-fns';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EngagementData, EngagementTotals } from './api/engagements/route';
import Chart from '@/components/Chart';

export default function Home() {
  const [totals, setTotals] = useState<EngagementTotals | null>(null);
  const [data, setData] = useState<EngagementData[] | null>(null);

  const searchParams = useSearchParams();
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
      console.log('result', result, startDate, endDate);
      setTotals(result.rangeTotal);
      setData(result.range);
    };

    fetchData();
  }, [start_date, end_date]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-3xl leading-10'>A unified dashboard for your team.</h1>
      <h4>Aggregate members and profiles by teams, cohorts or activity. The choices are yours to make.</h4>
      <div
        className='flex mt-6 flex-col justify-center items-center w-full h-full bg-[#171717] text-white rounded-2xl p-5 space-y-3'
      >
        {totals && data ? (
          <>
            <div className='flex justify-between items-center w-11/12'>
              <div className='leading-6 font-medium'>
                <p>Engagements <span className='text-gray-400'>Last 30 Days</span></p>
              </div>
              <div className='leading-6 font-medium text-gray-400'>
                <p className='text-[#FFFFFF] flex items-center gap-x-3 justify-between'>{totals?.numComments} REPOSTS <div className='bg-[#FFFFFF] h-5 w-3 rounded-2xl'></div></p>
                <p className='text-[#B7BCC5] flex items-center gap-x-3 justify-between'>{totals?.numComments} COMMENTS <div className='bg-[#B7BCC5] h-5 w-3 rounded-2xl'></div></p>
                <p className='text-[#B7BCC5] flex items-center gap-x-3 opacity-80 justify-between'>{totals?.numReactions} REACTIONS <div className='bg-[#B7BCC5] h-5 w-3 rounded-2xl'></div></p>
              </div>
            </div>
            <Chart
              data={data}
            />
          </>) : <div className='w-[500px] h-[300px] flex justify-center items-center'>
          <div className='text-center'>
            <h3>No engagement data available</h3>
            <p className='text-gray-400'>Currently unable to fetch your engagement data</p>
          </div>
        </div>
        }
      </div>
    </main>
  );
}
