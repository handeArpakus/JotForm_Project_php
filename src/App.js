import React, { useState, useEffect, Component } from "react";
import "./App.css";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as ReactBootStrap from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Pie } from "react-chartjs-2";

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
      <tr key={index}>
        <td>{team.name}</td>
        <td>{team.title}</td>
        <td>{team.assignedTask}</td>
      </tr>
    );
  };

  const renderTabList = (tabList, index) => {
    return <Tab key={index}>{tabList.assignedTask}</Tab>;
  };

  const renderTabPanel = (tabPanel, index) => {
    return (
      <TabPanel key={index}>
        <h5>{tabPanel.assignedTask}</h5>
        <p>
          <strong>Assigned to: </strong>
          {tabPanel.Name}
        </p>
        <p>
          <strong>Deadline: </strong>
          {tabPanel.deadline}
        </p>
        <p>
          <strong>Description: </strong>
          {tabPanel.description}
        </p>
      </TabPanel>
    );
  };

  /////////////////////////////////////////////////////////  RETURN /////////////////////////////////////////////////////////
  return (
    <div>
      <div>
        <Tabs
          style={{
            marginLeft: "50px",
            fontSize: "20px",
            marginTop: "20px",
            width: "500px",
          }}
        >
          <TabList>{teamInfo.map(renderTabList)}</TabList>
          <div
            style={{
              marginLeft: "70px",
              marginTop: "-135px",
              fontSize: "17px",
            }}
          >
            {teamInfo.map(renderTabPanel)}
          </div>
        </Tabs>
      </div>
      <div
        style={{
          height: "500px",
          width: "500px",
          margin: "50px",
          float: "right",
        }}
      >
        <div>
          <Pie
            data={charData}
            options={{
              title: {
                display: true,
                text: "Progress of the project",
                fontSize: 25,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>

      <ReactBootStrap.Table stripped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Assignemts</th>
          </tr>
        </thead>
        <tbody>{teamInfo.map(renderInfo)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
}

export default App;
