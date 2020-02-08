import React from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { Row } from 'react-bootstrap';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function DonutChart(props) {
  let saving = 0;
  props.chosen.forEach(category => {
    if (props[`${category}Saving`]) saving += props[`${category}Saving`];
    // if (!annualCards[props[`${category}Card`]]) {
    //   annualCards[props[`${category}Card`]] = true;
    //   saving -= (props[`${category}Annual`] / 3) | 0;
    // }
  });

  const savingDataPoints = [];
  for (let category of props.chosen) {
    if (props[category] > 0) {
      savingDataPoints.push({
        name: category,
        d: Math.round(props[`${category}`] * 12 * props[`${category}Reward`]),
        y: Math.round((props[`${category}`] * props[`${category}Reward`] * 1200) / saving),
        p: props[`${category}Reward`] / 100
      });
    }
  }

  const savingOptions = {
    animationEnabled: true,
    title: {
      text: 'Potential Annual Saving'
    },
    subtitles: [
      {
        text: `$${Math.round(saving)}/yr`,
        verticalAlign: 'center',
        fontSize: 24,
        dockInsidePlotArea: true
      }
    ],
    data: [
      {
        type: 'doughnut',
        showInLegend: true,
        // indexLabel: '{name}: ${d}/yr',
        yValueFormatString: "#,###'%'",
        dataPoints: savingDataPoints
      }
    ]
  };

  return (
    <Row>
      <CanvasJSChart options={savingOptions} />
    </Row>
  );
}
