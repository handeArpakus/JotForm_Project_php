import React, { useState, useEffect, Component } from "react";
import "./App.css";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import ProgressBar from "react-bootstrap/ProgressBar";

var done;
var process;
var notStarted;
var lastDate;

var teamInfo = new Array();

function App() {
  const [chart_posts, setChartPosts] = useState([]);
  const [infoPosts, setInfoPosts] = useState([]);
  const [charData, setChartData] = useState({});

  useEffect(() => {
    axios
      .get("/getPerc.php")
      .then((res) => {
        setChartPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  chart_posts.map((post) => {
    done = post.done;
    process = post.proc;
    notStarted = post.notStarted;
    lastDate = post.updateDate;
    console.log("done: ", done);
  });

  const chart = () => {
    axios.get("/getPerc.php").then((res) => {
      console.log(res);
      setChartData({
        labels: ["Done", "Processing", "Not Started"],
        datasets: [
          {
            label: "Rainfall",
            backgroundColor: ["#2FDE00", "#C9DE00", "#B21F00"],
            data: [done, process, notStarted],
          },
        ],
      });
    });
  };
  useEffect(() => {
    chart();
  }, []);

  useEffect(() => {
    axios
      .get("/server.php")
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          teamInfo[i] = res.data[i];
        }
        setInfoPosts(res.data);
        console.log(teamInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  /////////////////////////////////////////////////////////////////// RENDERS ////////////////////////////////////////////////
  const renderInfo = (team, index) => {
    return (
      <tr key={index} style={{ fontSize: "16px" }}>
        <td>{team.name}</td>
        <td>{team.title}</td>
        <td>
          <p>{team.assignedTask}</p>{" "}
          <ProgressBar animated now={team.progress} />
        </td>
      </tr>
    );
  };

  const renderTabList2 = (tabList, index) => {
    return (
      <Tab eventKey={index} title={tabList.assignedTask}>
        <div
          className="tab-item-wrapper"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          <h5>{tabList.assignedTask}</h5>
          <p>
            <strong>Assigned to: </strong>
            {tabList.name}
          </p>
          <p>
            <strong>Deadline: </strong>
            {tabList.deadline}
          </p>
          <p>
            <strong>Description: </strong>
            {tabList.description}
          </p>
        </div>
      </Tab>
    );
  };

  /////////////////////////////////////////////////////////  RETURN /////////////////////////////////////////////////////////
  return (
    <body>
      <div
        style={{
          backgroundColor: "#f38632",
          width: "100%",
          height: "130px",
        }}
      >
        <img src="./images/podo_8.png" style={{ width: "240px" }}></img>
        <img
          src="./images/logo.png"
          style={{
            width: "120px",
            float: "right",
            clear: "right",
            marginLeft: "-50px",
          }}
        ></img>
      </div>

      <div
        style={{
          width: "500px",
          height: "300px",
          marginLeft: "100px",
          marginTop: "50px",
        }}
      >
        <div className="tab-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <Tabs>{teamInfo.map(renderTabList2)}</Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "100px",
          width: "500px",
          float: "right",
          marginTop: "-300px",
        }}
      >
        <Pie
          data={charData}
          options={{
            title: {
              display: true,
              text: "Progress of the project",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
      <ReactBootStrap.Table
        stripped
        bordered
        hover
        style={{
          width: "1000px",
          margin: "auto",
          marginTop: "20px",
          height: "100px",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Assignemts</th>
          </tr>
        </thead>
        <tbody>{teamInfo.map(renderInfo)}</tbody>
      </ReactBootStrap.Table>
    </body>
  );
}

export default App;
