import React, { useState, useEffect, Component } from "react";
import "./App.css";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

var teamInfo = new Array();

function TableComponent() {
  const [infoPosts, setInfoPosts] = useState([]);

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

  const renderInfo = (team, index) => {
    return (
      <tr key={index} style={{ fontSize: "16px" }}>
        <td>{team.assignedTo}</td>
        <td>{team.title}</td>
        <td>
          <p>
            {team.name}: {team.progress}%{" "}
          </p>{" "}
          <ProgressBar animated now={team.progress} />
        </td>
      </tr>
    );
  };

  return (
    <ReactBootStrap.Table
      stripped
      bordered
      hover
      style={{
        width: "1000px",
        margin: "auto",
        marginTop: "80px",
        height: "100px",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Assignments</th>
        </tr>
      </thead>
      <tbody>{teamInfo.map(renderInfo)}</tbody>
    </ReactBootStrap.Table>
  );
}

export default TableComponent;
