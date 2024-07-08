import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// Define the type for your data
type DataPoint = {
  date: string;
  numComments: number;
  numImpressions: number;
  numReactions: number;
  numShares: number;
  numViews: number;
  numVotes: number;
  postsCount: number;
};

interface ChartProps {
  data: DataPoint[];
}

// Function to format the date
const formatDate = (dateString: string) => format(new Date(dateString), 'dd');

const Chart: React.FC<ChartProps> = ({ data }) => {
  const formattedData = data && data.length>0 ? data.map((item:DataPoint) => ({
    ...item,
    date: formatDate(item.date),
  })):[]

  return (
    <div style={{ width: '100%', height: 400 }}> 
      <ResponsiveContainer>
        <BarChart 
        data={formattedData}
        width={500}
        height={200}
        barSize={15}
        >
          <XAxis dataKey="date" axisLine={false} tickLine={false}/>
          <YAxis  stroke='none' />
          <Tooltip contentStyle={{ backgroundColor: 'black', color: 'white' }} />
          <Legend />
          <Bar dataKey="numReactions" stackId="chart" fill="#FFFFFF" stroke='none' radius={[8,8, 8, 8]} />
          <Bar dataKey="numComments" stackId="chart" fill="#B7BCC5" radius={[10, 10, 10, 10]} />
          <Bar dataKey="numShares" stackId="chart" fill="#B7BCC5"  opacity={'80%'} radius={[10, 10, 10, 10]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
