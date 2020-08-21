import React, { useState, useEffect, Component } from "react";
import "./App.css";
import axios from "axios";
import { Pie } from "react-chartjs-2";

var done;
var process;
var notStarted;
var lastDate;

var teamInfo = new Array();

function BigChartComponent() {
  const [chart_posts, setChartPosts] = useState([]);

  useEffect(() => {
    // setTimeout(() => {
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
    // }, 3000);
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
      <Pie
        data={chart_posts}
        options={{
          title: {
            display: true,
            text: "Progress of the project",
            fontSize: 20,
            fontColor: "#000000",
            marginLeft: "-150px",
            float: "left",
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}
export default BigChartComponent;
