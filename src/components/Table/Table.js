import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import axios from "axios";
import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Table = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState();
  const [backup, setBackup] = useState([]);
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
        setData(res.data.data);
        setBackup(res.data.data);
        setTable(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
    // setTable(
    //   data.map((app) => {
    //     return (
    //       <tr>
    //         <td style={app == true ? { display: "none" } : {}}>{app.app}</td>
    //         <td>{app.date}</td>
    //         <td>{app.platform}</td>
    //         <td>{app.clicks}</td>
    //         <td>{app.impressions}</td>
    //         <td>{app.installs}</td>
    //         <td>{app.dau}</td>
    //         <td>{app.revenue.toString().slice(0, 8)}</td>
    //       </tr>
    //     );
    //   })
    // );
    setTable(backup);
    console.log(table);
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
            onClick={() => {
              setClicks(!clicks);
            }}
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
            {platform ? (
              <td>
                Platform{" "}
                <Menu>
                  <MenuButton
                    marginLeft="21px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Filter
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "Android";
                        });
                        // let filtered = [];
                        // for (let i = 0; i < data.length; i++) {
                        //   if (data[i].platform == "Android") {
                        //     filtered.push(data[i]);
                        //   }
                        // }

                        setTable(filtered);
                      }}
                    >
                      Android
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "iOS";
                        });
                        // let filtered = [];
                        // for (let i = 0; i < data.length; i++) {
                        //   if (data[i].platform == "Android") {
                        //     filtered.push(data[i]);
                        //   }
                        // }

                        setTable(filtered);
                      }}
                    >
                      iOS
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            ) : null}
            {clicks ? <td>Clicks</td> : null}
            {impr ? <td>Impressions</td> : null}
            {installs ? <td>Installs</td> : null}
            {dau ? <td>Dau</td> : null}
            {revenue ? <td>Revenue</td> : null}
          </tr>
        </thead>
        <tbody>
          {/* {data.map((app) => {
            return (
              <tr>
                <td
                  style={
                    app === true ? { display: "block" } : { display: "none" }
                  }
                >
                  {app.app}
                </td>
                <td>{app.date}</td>
                <td>{app.platform}</td>
                <td>{app.clicks}</td>
                <td>{app.impressions}</td>
                <td>{app.installs}</td>
                <td>{app.dau}</td>
                <td>{app.revenue.toString().slice(0, 8)}</td>
              </tr>
            );
          })} */}
          {/* {table
            ? table.map((app) => {
                return (
                  <tr key={app.app + app.dau + app.revenue + app.installs}>
                    <td>{app.app}</td>
                    <td>{app.date}</td>
                    <td>{app.platform}</td>
                    <td>{app.clicks}</td>
                    <td>{app.impressions}</td>
                    <td>{app.installs}</td>
                    <td>{app.dau}</td>
                    <td>
                      {app.revenue ? app.revenue.toString().slice(0, 8) : null}
                    </td>
                  </tr>
                );
              })
            : data.map((app) => {
                return (
                  <tr key={app.app + app.dau + app.revenue + app.installs}>
                    <td>{app.app}</td>
                    <td>{app.date}</td>
                    <td>{app.platform}</td>
                    <td>{app.clicks}</td>
                    <td>{app.impressions}</td>
                    <td>{app.installs}</td>
                    <td>{app.dau}</td>
                    <td>{app.revenue.toString().slice(0, 8)}</td>
                  </tr>
                );
              })} */}
          {table ? table.map((app) => {
            return (
              <tr key={app.app + app.dau + app.revenue + app.installs}>
                <td>{app.app}</td>
                <td>{app.date}</td>
                <td>{app.platform}</td>
                <td>{app.clicks}</td>
                <td>{app.impressions}</td>
                <td>{app.installs}</td>
                <td>{app.dau}</td>
                <td>
                  {app.revenue ? app.revenue.toString().slice(0, 8) : null}
                </td>
              </tr>
            );
          }) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
