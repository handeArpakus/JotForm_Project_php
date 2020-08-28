import React, { useState, useEffect, Component } from "react";
import "./App.css";
import axios from "axios";
import { HorizontalBar } from "react-chartjs-2";

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function BarChartComponent() {
  const [chart_posts, setChartPosts] = useState([]);

  const chart = () => {
    let memberName = [];
    let memberPerc = [];
    let lastName = [];
    let lastPerc = [];
    let color = [
      "#4A1D79",
      "#1382BD",
      "#2ABD13",
      "#e808a4",
      "#052083",
      "#e47c04",
      "#930dd4",
      "#FF0000",
      "#28BBF0",
    ];
    var taskNum = 1;
    var totalPerc = 0;
    var newPerc = 0;
    axios
      .get("/server.php")
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          memberName[i] = res.data[i].assignedTo;
          memberPerc[i] = res.data[i].progress;
        }

        for (var j = 0; j < memberName.length; j++) {
          var name = memberName[j];
          for (var k = j + 1; k < memberName.length; k++) {
            if (name == memberName[k]) {
              taskNum++;
              totalPerc = totalPerc + parseInt(memberPerc[k]);
            }
          }
          totalPerc = totalPerc + parseInt(memberPerc[j]);
          newPerc = totalPerc / taskNum;
          memberPerc[j] = roundToTwo(newPerc);

          taskNum = 1;
          totalPerc = 0;
        }
        console.log(memberName);
        console.log(memberPerc);

        for (var m = 0; m < memberName.length; m++) {
          if (lastName.indexOf(memberName[m]) == -1) {
            console.log(memberName[m]);
            console.log(memberPerc[m]);
            lastName.push(memberName[m]);
            lastPerc.push(memberPerc[m]);
          } //else console.log(memberName[m]);
        }

        setChartPosts({
          labels: lastName,
          options: {
            legend: {
              labels: {
                // This more specific font property overrides the global property
                font: {
                  lineHeight: "10",
                },
              },
            },
          },
          datasets: [
            {
              label: "Personal Progress",
              backgroundColor: color,
              barPercentage: 10,
              barThickness: 20,
              minBarLength: 2,
              data: lastPerc,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div
      className="chart"
      style={{
        height: "800px",
        width: "500px",
        position: "absolute",
        top: "550px",
        left: "950px",
      }}
    >
      <HorizontalBar data={chart_posts} />
    </div>
  );
}

export default BarChartComponent;
