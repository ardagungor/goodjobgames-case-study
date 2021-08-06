import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import axios from "axios";
import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
} from "recharts";

const Table = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState();
  const [backup, setBackup] = useState([]);
  const [app, setApp] = useState(false);
  const [date, setDate] = useState(true);
  const [platform, setPlatform] = useState(false);
  const [clicks, setClicks] = useState(true);
  const [impr, setImpr] = useState(true);
  const [installs, setInstalls] = useState(true);
  const [dau, setDau] = useState(true);
  const [revenue, setRevenue] = useState(true);
  const [games, setGames] = useState([]);
  const [tableView, setTableView] = useState(true);
  const [date1, setDate1] = useState(new Date(2020, 4, 2));
  const [date2, setDate2] = useState(new Date(2020, 6, 30));
  const [graphData, setGraphData] = useState([
    { date: "2020-07-30", price: 52342 },
    { date: "2020-07-31", price: 51104 },
    { date: "2020-08-01", price: 55643 },
    { date: "2020-08-02", price: 54342 },
    { date: "2020-08-03", price: 63562 },
    { date: "2020-08-04", price: 51905 },
    { date: "2020-08-05", price: 54367 },
  ]);
  const [label, setLabel] = useState("");

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
            onClick={() => {
              setImpr(!impr);
              console.log(table);
              console.log(data);
            }}
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
          <button
            className={
              tableView
                ? classes.colItem + " " + classes.active
                : classes.colItem
            }
            onClick={() => setTableView(!tableView)}
          >
            Table View
          </button>{" "}
          <button
            className={
              !tableView
                ? classes.colItem + " " + classes.active
                : classes.colItem
            }
            onClick={() => {
              setTableView(!tableView);
              let arr = [];
              table.forEach((element) => {
                arr.push({ date: element.date, clicks: element.clicks });
              });

              setGraphData(arr);
              console.log(graphData);
            }}
          >
            Graph View
          </button>
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
                        return el.date > date.toISOString().split("T")[0];
                      });
                      setTable(filtered);
                      setDate1(date);
                    }}
                  />
                  <DatePicker
                    selected={date2}
                    dateFormat="yyyy-MM-dd"
                    onChange={(date) => {
                      let filtered = table.filter(function (el) {
                        return el.date < date.toISOString().split("T")[0];
                      });
                      setTable(filtered);
                      setDate2(date);
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
      <div className={classes.chartContainer}>
        <LineChart
          width={950}
          height={500}
          data={graphData}
          margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" label="Date" />
          <YAxis domain={["auto", "auto"]} label="Stock Price" />
          <Tooltip
            wrapperStyle={{
              borderColor: "white",
              boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
            }}
            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            labelStyle={{ fontWeight: "bold", color: "#666666" }}
          />
          <Line dataKey="clicks" stroke="#ff7300" dot={true} />
          <Brush dataKey="date" startIndex={graphData.length - 40}>
            <AreaChart>
              <CartesianGrid />
              <YAxis hide domain={["auto", "auto"]} />
              <Area
                dataKey="price"
                stroke="#ff7300"
                fill="#ff7300"
                dot={true}
              />
            </AreaChart>
          </Brush>
        </LineChart>
      </div>
    </div>
  );
};

export default Table;
