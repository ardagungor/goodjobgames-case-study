import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import axios from "axios";
import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());

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
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
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
                            let filtered = table.filter(function (el) {
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
                  Date
                  <DatePicker
                    selected={date1}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => {
                      let filtered = table.filter(function (el) {
                        return el.date >= date.toISOString().split("T")[0];
                      });
                      setTable(filtered);
                    }}
                  />
                  <DatePicker
                    selected={date2}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => {
                      setDate2(date);
                      let filtered = table.filter(function (el) {
                        return el.date <= date.toISOString().split("T")[0];
                      });
                      setTable(filtered);
                    }}
                  />
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
                        let filtered = table.filter(function (el) {
                          return el.platform == "Android";
                        });

                        setTable(filtered);
                      }}
                    >
                      Android
                    </MenuItem>
                    <MenuItem
                      // onClick={() => {
                      //   let filtered = data.filter(function (el) {
                      //     return el.platform == "iOS";
                      //   });

                      //   setTable(filtered);
                      // }}
                      onClick={() => {
                        let filtered = table.filter(function (el) {
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

                        const asd = table.sortBy("clicks");

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

                        const asd = table.sortBy("clicks");

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
                        Array.prototype.sortBy = function (p) {
                          return this.slice(0).sort(function (a, b) {
                            return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
                          });
                        };

                        const asd = table.sortBy("impressions");

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

                        const asd = table.sortBy("impressions");

                        setTable(asd);
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
                        Array.prototype.sortBy = function (p) {
                          return this.slice(0).sort(function (a, b) {
                            return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
                          });
                        };

                        const asd = table.sortBy("installs");

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

                        const asd = table.sortBy("installs");

                        setTable(asd);
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
                        Array.prototype.sortBy = function (p) {
                          return this.slice(0).sort(function (a, b) {
                            return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
                          });
                        };

                        const asd = table.sortBy("dau");

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

                        const asd = table.sortBy("dau");

                        setTable(asd);
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
                        Array.prototype.sortBy = function (p) {
                          return this.slice(0).sort(function (a, b) {
                            return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
                          });
                        };

                        const asd = table.sortBy("revenue");

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

                        const asd = table.sortBy("revenue");

                        setTable(asd);
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
          {table
            ? table.map((item) => {
                return (
                  <tr key={item.app + item.dau + item.revenue + item.installs}>
                    <td style={app === true ? {} : { display: "none" }}>
                      {item.app}
                    </td>
                    <td style={date === true ? {} : { display: "none" }}>
                      {item.date}
                    </td>
                    <td style={platform === true ? {} : { display: "none" }}>
                      {item.platform}
                    </td>
                    <td style={clicks === true ? {} : { display: "none" }}>
                      {item.clicks}
                    </td>
                    <td style={impr === true ? {} : { display: "none" }}>
                      {" "}
                      {item.impressions}
                    </td>
                    <td style={installs === true ? {} : { display: "none" }}>
                      {item.installs}
                    </td>
                    <td style={dau === true ? {} : { display: "none" }}>
                      {item.dau}
                    </td>
                    <td style={revenue === true ? {} : { display: "none" }}>
                      {item.revenue
                        ? item.revenue.toString().slice(0, 8)
                        : null}
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
