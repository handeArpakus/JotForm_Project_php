import React, { useState, useEffect, Component } from "react";
import "./App.css";
import axios from "axios";
import { Pie } from "react-chartjs-2";

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function BigChartComponent() {
  const [chart_posts, setChartPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/getPerc.php")
      .then((res) => {
        setChartPosts({
          labels: ["Done", "Processing", "Not Started"],
          datasets: [
            {
              label: "Progress",
              backgroundColor: ["#00FF00", "#FFFF00", "#FF0000"],
              data: [
                roundToTwo(res.data[0].done),
                roundToTwo(res.data[0].proc),
                roundToTwo(res.data[0].notStarted),
              ],
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        height: "80px",
        width: "500px",
        position: "absolute",
        top: "175px",
        right: "80px",
      }}
    >
      <h4 style={{ marginLeft: "100px", color: "#DD8300" }}>
        Progress of the project
      </h4>
      <Pie
        data={chart_posts}
        options={{
          title: {
            display: true,
            text: " ",
            fontSize: 2,
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
