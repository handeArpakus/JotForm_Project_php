import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import ModalComponent from "./ModalComponent";

var teamInfo = new Array();

function TableComponent() {
  const [infoPosts, setInfoPosts] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

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
  }, []);

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
          <Button
            variant="primary"
            onClick={() => setModalShow(true)}
            style={{ marginTop: "25px" }}
          >
            Comment
          </Button>
          <ModalComponent show={modalShow} onHide={() => setModalShow(false)} />
        </td>
      </tr>
    );
  };

  return (
    <div>
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
    </div>
  );
}

export default TableComponent;
