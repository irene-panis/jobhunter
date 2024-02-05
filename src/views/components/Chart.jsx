import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = ({ counts }) => {
  const data = {
    labels: ['Open', 'Interviewing', 'No Offer'],
    datasets: [
      {
        label: 'Applications',
        data: [counts.open, counts.interviewing, counts['no offer']],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(95, 255, 39, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(95, 255, 39, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  }
  return (
  <Doughnut options={options} data={data}/>
  );
}
