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
  const [games, setGames] = useState([]);

  const loadData = () => {
    axios({
      url: "https://recruitment-mock-data.gjg-ads.io/data",
      method: "get",
    })
      .then((res) => {
        setData(res.data.data);
        setBackup(res.data.data);
        setTable(res.data.data);
        const unique = [...new Set(res.data.data.map((item) => item.app))];
        setGames(unique);
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
            {app ? (
              <td>
                App
                <Menu>
                  <MenuButton
                    marginLeft="21px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Filter
                  </MenuButton>
                  <MenuList>
                    {games.map((game) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            let filtered = data.filter(function (el) {
                              return el.app == game;
                            });

                            setTable(filtered);
                          }}
                        >
                          {game}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
              </td>
            ) : null}
            {date ? (
              <td>
                <div className={classes.date}>
                  {" "}
                  Date <input type="date" /> <input type="date" />{" "}
                </div>
              </td>
            ) : null}
            {platform ? (
              <td>
                Platform
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

                        setTable(filtered);
                      }}
                    >
                      Ascending
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "iOS";
                        });

                        setTable(filtered);
                      }}
                    >
                      iOS
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            ) : null}
            {clicks ? (
              <td>
                Clicks{" "}
                <Menu>
                  <MenuButton
                    marginLeft="21px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        Array.prototype.sortBy = function (p) {
                          return this.slice(0).sort(function (a, b) {
                            return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
                          });
                        };

                        const asd = data.sortBy("clicks");

                        setTable(asd);
                      }}
                    >
                      Ascending
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        Array.prototype.sortBy = function (p) {
                          return this.slice(0).sort(function (a, b) {
                            return a[p] > b[p] ? -1 : a[p] < b[p] ? 1 : 0;
                          });
                        };

                        const asd = data.sortBy("clicks");

                        setTable(asd);
                      }}
                    >
                      Descending
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            ) : null}
            {impr ? (
              <td>
                Impressions{" "}
                <Menu>
                  <MenuButton
                    marginLeft="21px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "Android";
                        });

                        setTable(filtered);
                      }}
                    >
                      Ascending
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "iOS";
                        });

                        setTable(filtered);
                      }}
                    >
                      Descending
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            ) : null}
            {installs ? (
              <td>
                Installs{" "}
                <Menu>
                  <MenuButton
                    marginLeft="21px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "Android";
                        });

                        setTable(filtered);
                      }}
                    >
                      Ascending
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "iOS";
                        });

                        setTable(filtered);
                      }}
                    >
                      Descending
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            ) : null}
            {dau ? (
              <td>
                Dau{" "}
                <Menu>
                  <MenuButton
                    marginLeft="21px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "Android";
                        });

                        setTable(filtered);
                      }}
                    >
                      Ascending
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "iOS";
                        });

                        setTable(filtered);
                      }}
                    >
                      Descending
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            ) : null}
            {revenue ? (
              <td>
                Revenue{" "}
                <Menu>
                  <MenuButton
                    marginLeft="21px"
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Sort
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "Android";
                        });

                        setTable(filtered);
                      }}
                    >
                      Ascending
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        let filtered = data.filter(function (el) {
                          return el.platform == "iOS";
                        });

                        setTable(filtered);
                      }}
                    >
                      Descending
                    </MenuItem>
                  </MenuList>
                </Menu>
              </td>
            ) : null}
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
          {table
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
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
