import React, { useState, useEffect } from "react";
import { Doughnut, Chart } from "react-chartjs-2";
import axios from "axios";

function PieChart() {
  const [chart_posts, setChartPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/getPerc.php")
      .then((res) => {
        setChartPosts({
          labels: ["Done", "Processing", "Not Started"],
          datasets: [
            {
              label: "Rainfall",
              backgroundColor: ["#00FF00", "#FFFF00", "#FF0000"],
              data: [
                res.data[0].done,
                res.data[0].proc,
                res.data[0].notStarted,
              ],
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
  Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function () {
      originalDoughnutDraw.apply(this, arguments);

      var chart = this.chart;
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      var fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";

      var sum = 0;
      for (var i = 0; i < chart.config.data.datasets[0].data.length; i++) {
        sum += chart.config.data.datasets[0].data[i];
      }

      var text = "sum",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

      ctx.fillText(text, textX, textY);
    },
  });

  return (
    <div
      style={{
        height: "100px",
        width: "500px",
        position: "absolute",
        top: "175px",
        right: "40px",
      }}
    >
      <Doughnut
        data={chart_posts}
        options={{
          elements: {
            center: {
              text: "hi",
              color: "#FF6384", // Default is #000000
              fontStyle: "Arial", // Default is Arial
              sidePadding: 20, // Default is 20 (as a percentage)
              minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
              lineHeight: 25, // Default is 25 (in px), used for when text wraps
            },
          },
          circumference: Math.PI * 2,
          cutoutPercentage: 70,
          title: {
            display: true,
            text: "Progress of the project",
            fontSize: 20,
            fontColor: "#000000",
            marginLeft: "-150px",
            float: "left",
            innerRadius: "10%",
          },

          legend: {
            display: true,
            position: "right",
          },
        }}
      >
        Hi
      </Doughnut>
    </div>
  );
}

export default PieChart;
