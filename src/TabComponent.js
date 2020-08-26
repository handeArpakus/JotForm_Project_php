import React, { useState, useEffect, Component } from "react";
import "./App.css";
import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";

var teamInfo = new Array();

function TabComponent() {
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
  }, []);

  //render to make the tab dynamic
  const renderTabList2 = (tabList, index) => {
    return (
      <Tab eventKey={index} title={tabList.name}>
        <div
          className="tab-item-wrapper"
          style={{ marginTop: "20px", marginLeft: "20px" }}
        >
          <h5>{tabList.name}</h5>
          <p>
            <strong>Assigned to: </strong>
            {tabList.assignedTo}
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

  return (
    <div
      style={{
        width: "700px",
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
  );
}

export default TabComponent;
