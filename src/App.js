import React, { useState, useEffect, Component } from "react";
import "./App.css";
import TabComponent from "./TabComponent";
import TableComponent from "./TableComponent";
import BigChart from "./BigChartComponent";

function App() {
  return (
    <div>
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
      <TabComponent />
      <TableComponent />
      <BigChart />
    </div>
  );
}

export default App;
