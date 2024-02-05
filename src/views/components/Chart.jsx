import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Chart = () => {
  const data = {
    labels: ['Red', 'Yellow', 'Green'],
    datasets: [
      {
        label: '# Applications',
        data: [69, 5, 17],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
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
