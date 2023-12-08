import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
);

export const options = {
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
            barPercentage: 0.5,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        },
    },
};

const getChartData = (teamsAndPoints) => {
    return {
        labels: teamsAndPoints.map(team => team.name),
        datasets: [
            {
                label: 'Punkty',
                data: teamsAndPoints.map(team => team.total_score),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                height: 20
            },
        ],
    };
}

const CompetitionScoreboardChart = ({ teamsAndPoints }) => {
    return (
        <Bar data={getChartData(teamsAndPoints)} options={options} />
    );
}

export default CompetitionScoreboardChart
