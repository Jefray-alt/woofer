import React, { useEffect } from 'react';
import Chart from 'chart.js';

const TrackGraph = ({ data }) => {
  useEffect(() => {
    if (window.graph) window.graph.destroy();
    window.graph = new Chart(document.getElementById('track-graph'), {
      type: 'polarArea',
      data: {
        labels: [
          'Acousticness',
          'Danceability',
          'Energy',
          'Instrumentalness',
          'Liveness',
          'Speechiness',
          'Valence',
        ],
        datasets: [
          {
            label: 'Audio Features',
            data: [
              data.acousticness,
              data.danceability,
              data.energy,
              data.instrumentalness,
              data.liveness,
              data.speechiness,
              data.valence,
            ],
            backgroundColor: [
              'rgba(198, 216, 175, 0.5)',
              'rgba(209, 216, 177, 0.5)',
              'rgba(219, 216, 179, 0.5)',
              'rgba(252, 200, 178, 0.5)',
              'rgba(239, 164, 139, 0.5)',
              'rgba(104, 83, 105, 0.5)',
              'rgba(118, 99, 119, 0.5)',
            ],
            borderColor: [
              '#C6D8AF',
              '#D1D8B1',
              '#DBD8B3',
              '#FCC8B2',
              '#EFA48B',
              '#685369',
              '#766377',
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'top',
          labels: {
            fontColor: 'white',
          },
        },
        scale: {
          ticks: {
            beginAtZero: true,
            fontColor: 'white', // labels such as 10, 20, etc
            showLabelBackdrop: false, // hide square behind text
          },
          pointLabels: {
            fontColor: 'white', // labels around the edge like 'Running'
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
          angleLines: {
            color: 'white', // lines radiating from the center
          },
        },
      },
    });
  }, [data]);

  return (
    <div className='track-graph'>
      <canvas
        id='track-graph'
        className='canvas-graph'
        height='450'
        width='450'
      ></canvas>
    </div>
  );
};

export default TrackGraph;
