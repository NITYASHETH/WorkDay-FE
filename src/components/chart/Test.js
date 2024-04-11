import {Line}  from 'react-chartjs-2';
import {Chart as Chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import { linechartdata } from './Fake';


Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const Test = () => {
    const options = {};

    const data ={};
    return <Line options={options} data={linechartdata}/>
};