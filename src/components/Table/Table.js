import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import axios from "axios";

const Table = () => {
  const [data, setData] = useState([]);
  const [app, setApp] = useState(true);
  const [date, setDate] = useState(true);
  const [platform, setPlatform] = useState(true);
  const [clicks, setClicks] = useState(true);
  const [impr, setImpr] = useState(true);
  const [installs, setInstalls] = useState(true);
  const [dau, setDau] = useState(true);
  const [revenue, setRevenue] = useState(true);

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
      <div className={classes.controls}>
        <div className={classes.columns}>
          <div
            className={
              app ? classes.colItem + " " + classes.active : classes.colItem
            }
            onClick={() => setApp(!app)}
          >
            App
          </div>
          <div
            className={
              date ? classes.colItem + " " + classes.active : classes.colItem
            }
            onClick={() => setDate(!date)}
          >
            Date
          </div>
          <div
            className={
              platform
                ? classes.colItem + " " + classes.active
                : classes.colItem
            }
            onClick={() => setPlatform(!platform)}
          >
            Platform
          </div>
          <div
            className={
              clicks ? classes.colItem + " " + classes.active : classes.colItem
            }
            onClick={() => setClicks(!clicks)}
          >
            Clicks
          </div>
          <div
            className={
              impr ? classes.colItem + " " + classes.active : classes.colItem
            }
            onClick={() => setImpr(!impr)}
          >
            Impressions
          </div>
          <div
            className={
              installs
                ? classes.colItem + " " + classes.active
                : classes.colItem
            }
            onClick={() => setInstalls(!installs)}
          >
            Installs
          </div>
          <div
            className={
              dau ? classes.colItem + " " + classes.active : classes.colItem
            }
            onClick={() => setDau(!dau)}
          >
            Dau
          </div>
          <div
            className={
              revenue ? classes.colItem + " " + classes.active : classes.colItem
            }
            onClick={() => setRevenue(!revenue)}
          >
            Revenue
          </div>
        </div>
        <div>
          <button>Table View</button> <button>Graph View</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {app ? <td>App</td> : null}
            {date ? <td>Date</td> : null}
            {platform ? <td>Platform</td> : null}
            {clicks ? <td>Clicks</td> : null}
            {impr ? <td>Impressions</td> : null}
            {installs ? <td>Installs</td> : null}
            {dau ? <td>Dau</td> : null}
            {revenue ? <td>Revenue</td> : null}
          </tr>
        </thead>
        <tbody>
          {data.map((app) => {
            return (
              <tr>
                <td className={app ? null : classes.hidden}>{app.app}</td>
                <td>{app.date}</td>
                <td>{app.platform}</td>
                <td>{app.clicks}</td>
                <td>{app.impressions}</td>
                <td>{app.installs}</td>
                <td>{app.dau}</td>
                <td>{app.revenue.toString().slice(0, 8)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
