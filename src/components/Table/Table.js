import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const loadData = () => {
    axios({
      url: "https://recruitment-mock-data.gjg-ads.io/data",
      method: "get",
    })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className={classes.container}>
      <table>
        <thead>
          <tr>
            <td>App</td>
            <td>Date</td>
            <td>Platform</td>
            <td>Clicks</td>
            <td>Impressions</td>
            <td>Installs</td>
            <td>Dau</td>
            <td>Revenue</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
          {data.map((app) => {
            return (
              <tr>
                <td>{app.app}</td>
                <td>{app.date}</td>
                <td>{app.platform}</td>
                <td>{app.clicks}</td>
                <td>{app.impressions}</td>
                <td>{app.installs}</td>
                <td>{app.dau}</td>
                <td>{app.revenue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
