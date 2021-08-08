import React, { useState } from "react";
import {
  Brush,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import classes from "../Table/Table.module.css";

const Graph = (props) => {
  // used for operations related with graph view
  const [graphData, setGraphData] = useState([]);
  const [label, setLabel] = useState("");
  return (
    <div>
      <LineChart
        width={1200}
        height={600}
        data={graphData}
        margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip
          wrapperStyle={{
            borderColor: "white",
            boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
          }}
          contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          labelStyle={{ fontWeight: "bold", color: "#666666" }}
        />
        <Line dataKey="value" stroke="#ff7300" dot={true} />
        <Brush dataKey="date" startIndex={graphData.length - 40}>
          <AreaChart>
            <CartesianGrid />
            <YAxis hide domain={["auto", "auto"]} />
            <Area dataKey="value" stroke="#ff7300" fill="#ff7300" dot={true} />
          </AreaChart>
        </Brush>
      </LineChart>
      <div className={classes.graphControls}>
        <div
          className={
            label == "Clicks"
              ? classes.colItem + " " + classes.active
              : classes.colItem
          }
          onClick={() => {
            setLabel("Clicks");
            let arr = [];
            props.table.forEach((element) => {
              arr.push({
                date: element.date,
                value: element.clicks,
              });
            });
            setGraphData(arr);
          }}
        >
          Clicks
        </div>
        <div
          className={
            label == "Impressions"
              ? classes.colItem + " " + classes.active
              : classes.colItem
          }
          onClick={() => {
            setLabel("Impressions");
            let arr = [];
            props.table.forEach((element) => {
              arr.push({
                date: element.date,
                value: element.impressions,
              });
            });
            setGraphData(arr);
          }}
        >
          Impressions
        </div>
        <div
          className={
            label == "Installs"
              ? classes.colItem + " " + classes.active
              : classes.colItem
          }
          onClick={() => {
            setLabel("Installs");
            let arr = [];
            props.table.forEach((element) => {
              arr.push({
                date: element.date,
                value: element.installs,
              });
            });
            setGraphData(arr);
          }}
        >
          Installs
        </div>
        <div
          className={
            label == "Dau"
              ? classes.colItem + " " + classes.active
              : classes.colItem
          }
          onClick={() => {
            setLabel("Dau");
            let arr = [];
            props.table.forEach((element) => {
              arr.push({
                date: element.date,
                value: element.dau,
              });
            });
            setGraphData(arr);
          }}
        >
          Dau
        </div>
        <div
          className={
            label == "Revenue"
              ? classes.colItem + " " + classes.active
              : classes.colItem
          }
          onClick={() => {
            setLabel("Revenue");
            let arr = [];
            props.table.forEach((element) => {
              arr.push({
                date: element.date,
                value: element.revenue,
              });
            });
            setGraphData(arr);
          }}
        >
          Revenue
        </div>
      </div>
    </div>
  );
};

export default Graph;
