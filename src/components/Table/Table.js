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
    { date: "Jan 04 2016", price: 105.35 },
    { date: "Jan 05 2016", price: 102.71 },
    { date: "Jan 06 2016", price: 100.7 },
    { date: "Jan 07 2016", price: 96.45 },
    { date: "Jan 08 2016", price: 96.96 },
    { date: "Jan 11 2016", price: 98.53 },
    { date: "Jan 12 2016", price: 99.96 },
    { date: "Jan 13 2016", price: 97.39 },
    { date: "Jan 14 2016", price: 99.52 },
    { date: "Jan 15 2016", price: 97.13 },
    { date: "Jan 19 2016", price: 96.66 },
    { date: "Jan 20 2016", price: 96.79 },
    { date: "Jan 21 2016", price: 96.3 },
    { date: "Jan 22 2016", price: 101.42 },
    { date: "Jan 25 2016", price: 99.44 },
    { date: "Jan 26 2016", price: 99.99 },
    { date: "Jan 27 2016", price: 93.42 },
    { date: "Jan 28 2016", price: 94.09 },
    { date: "Jan 29 2016", price: 97.34 },
    { date: "Feb 01 2016", price: 96.43 },
    { date: "Feb 02 2016", price: 94.48 },
    { date: "Feb 03 2016", price: 96.35 },
    { date: "Feb 04 2016", price: 96.6 },
    { date: "Feb 05 2016", price: 94.02 },
    { date: "Feb 08 2016", price: 95.01 },
    { date: "Feb 09 2016", price: 94.99 },
    { date: "Feb 10 2016", price: 94.27 },
    { date: "Feb 11 2016", price: 93.7 },
    { date: "Feb 12 2016", price: 93.99 },
    { date: "Feb 16 2016", price: 96.64 },
    { date: "Feb 17 2016", price: 98.12 },
    { date: "Feb 18 2016", price: 96.26 },
    { date: "Feb 19 2016", price: 96.04 },
    { date: "Feb 22 2016", price: 96.88 },
    { date: "Feb 23 2016", price: 94.69 },
    { date: "Feb 24 2016", price: 96.1 },
    { date: "Feb 25 2016", price: 96.76 },
    { date: "Feb 26 2016", price: 96.91 },
    { date: "Feb 29 2016", price: 96.69 },
    { date: "Mar 01 2016", price: 100.53 },
    { date: "Mar 02 2016", price: 100.75 },
    { date: "Mar 03 2016", price: 101.5 },
    { date: "Mar 04 2016", price: 103.01 },
    { date: "Mar 07 2016", price: 101.87 },
    { date: "Mar 08 2016", price: 101.03 },
    { date: "Mar 09 2016", price: 101.12 },
    { date: "Mar 10 2016", price: 101.17 },
    { date: "Mar 11 2016", price: 102.26 },
    { date: "Mar 14 2016", price: 102.52 },
    { date: "Mar 15 2016", price: 104.58 },
    { date: "Mar 16 2016", price: 105.97 },
    { date: "Mar 17 2016", price: 105.8 },
    { date: "Mar 18 2016", price: 105.92 },
    { date: "Mar 21 2016", price: 105.91 },
    { date: "Mar 22 2016", price: 106.72 },
    { date: "Mar 23 2016", price: 106.13 },
    { date: "Mar 24 2016", price: 105.67 },
    { date: "Mar 28 2016", price: 105.19 },
    { date: "Mar 29 2016", price: 107.68 },
    { date: "Mar 30 2016", price: 109.56 },
    { date: "Mar 31 2016", price: 108.99 },
    { date: "Apr 01 2016", price: 109.99 },
    { date: "Apr 04 2016", price: 111.12 },
    { date: "Apr 05 2016", price: 109.81 },
    { date: "Apr 06 2016", price: 110.96 },
    { date: "Apr 07 2016", price: 108.54 },
    { date: "Apr 08 2016", price: 108.66 },
    { date: "Apr 11 2016", price: 109.02 },
    { date: "Apr 12 2016", price: 110.44 },
    { date: "Apr 13 2016", price: 112.04 },
    { date: "Apr 14 2016", price: 112.1 },
    { date: "Apr 15 2016", price: 109.85 },
    { date: "Apr 18 2016", price: 107.48 },
    { date: "Apr 19 2016", price: 106.91 },
    { date: "Apr 20 2016", price: 107.13 },
    { date: "Apr 21 2016", price: 105.97 },
    { date: "Apr 22 2016", price: 105.68 },
    { date: "Apr 25 2016", price: 105.08 },
    { date: "Apr 26 2016", price: 104.35 },
    { date: "Apr 27 2016", price: 97.82 },
    { date: "Apr 28 2016", price: 94.83 },
    { date: "Apr 29 2016", price: 93.74 },
    { date: "May 02 2016", price: 93.64 },
    { date: "May 03 2016", price: 95.18 },
    { date: "May 04 2016", price: 94.19 },
    { date: "May 05 2016", price: 93.24 },
    { date: "May 06 2016", price: 92.72 },
    { date: "May 09 2016", price: 92.79 },
    { date: "May 10 2016", price: 93.42 },
    { date: "May 11 2016", price: 92.51 },
    { date: "May 12 2016", price: 90.34 },
    { date: "May 13 2016", price: 90.52 },
    { date: "May 16 2016", price: 93.88 },
    { date: "May 17 2016", price: 93.49 },
    { date: "May 18 2016", price: 94.56 },
    { date: "May 19 2016", price: 94.2 },
    { date: "May 20 2016", price: 95.22 },
    { date: "May 23 2016", price: 96.43 },
    { date: "May 24 2016", price: 97.9 },
    { date: "May 25 2016", price: 99.62 },
    { date: "May 26 2016", price: 100.41 },
    { date: "May 27 2016", price: 100.35 },
    { date: "May 31 2016", price: 99.86 },
    { date: "Jun 01 2016", price: 98.46 },
    { date: "Jun 02 2016", price: 97.72 },
    { date: "Jun 03 2016", price: 97.92 },
    { date: "Jun 06 2016", price: 98.63 },
    { date: "Jun 07 2016", price: 99.03 },
    { date: "Jun 08 2016", price: 98.94 },
    { date: "Jun 09 2016", price: 99.65 },
    { date: "Jun 10 2016", price: 98.83 },
    { date: "Jun 13 2016", price: 97.34 },
    { date: "Jun 14 2016", price: 97.46 },
    { date: "Jun 15 2016", price: 97.14 },
    { date: "Jun 16 2016", price: 97.55 },
    { date: "Jun 17 2016", price: 95.33 },
    { date: "Jun 20 2016", price: 95.1 },
    { date: "Jun 21 2016", price: 95.91 },
    { date: "Jun 22 2016", price: 95.55 },
    { date: "Jun 23 2016", price: 96.1 },
    { date: "Jun 24 2016", price: 93.4 },
    { date: "Jun 27 2016", price: 92.04 },
    { date: "Jun 28 2016", price: 93.59 },
    { date: "Jun 29 2016", price: 94.4 },
    { date: "Jun 30 2016", price: 95.6 },
    { date: "Jul 01 2016", price: 95.89 },
    { date: "Jul 05 2016", price: 94.99 },
    { date: "Jul 06 2016", price: 95.53 },
    { date: "Jul 07 2016", price: 95.94 },
    { date: "Jul 08 2016", price: 96.68 },
    { date: "Jul 11 2016", price: 96.98 },
    { date: "Jul 12 2016", price: 97.42 },
    { date: "Jul 13 2016", price: 96.87 },
    { date: "Jul 14 2016", price: 98.79 },
    { date: "Jul 15 2016", price: 98.78 },
    { date: "Jul 18 2016", price: 99.83 },
    { date: "Jul 19 2016", price: 99.87 },
    { date: "Jul 20 2016", price: 99.96 },
    { date: "Jul 21 2016", price: 99.43 },
    { date: "Jul 22 2016", price: 98.66 },
    { date: "Jul 25 2016", price: 97.34 },
    { date: "Jul 26 2016", price: 96.67 },
    { date: "Jul 27 2016", price: 102.95 },
    { date: "Jul 28 2016", price: 104.34 },
    { date: "Jul 29 2016", price: 104.21 },
    { date: "Aug 01 2016", price: 106.05 },
    { date: "Aug 02 2016", price: 104.48 },
    { date: "Aug 03 2016", price: 105.79 },
    { date: "Aug 04 2016", price: 105.87 },
    { date: "Aug 05 2016", price: 107.48 },
    { date: "Aug 08 2016", price: 108.37 },
    { date: "Aug 09 2016", price: 108.81 },
    { date: "Aug 10 2016", price: 108 },
    { date: "Aug 11 2016", price: 107.93 },
    { date: "Aug 12 2016", price: 108.18 },
    { date: "Aug 15 2016", price: 109.48 },
    { date: "Aug 16 2016", price: 109.38 },
    { date: "Aug 17 2016", price: 109.22 },
    { date: "Aug 18 2016", price: 109.08 },
    { date: "Aug 19 2016", price: 109.36 },
    { date: "Aug 22 2016", price: 108.51 },
    { date: "Aug 23 2016", price: 108.85 },
    { date: "Aug 24 2016", price: 108.03 },
    { date: "Aug 25 2016", price: 107.57 },
    { date: "Aug 26 2016", price: 106.94 },
    { date: "Aug 29 2016", price: 106.82 },
    { date: "Aug 30 2016", price: 106 },
    { date: "Aug 31 2016", price: 106.1 },
    { date: "Sept 01 2016", price: 106.73 },
    { date: "Sept 02 2016", price: 107.73 },
    { date: "Sept 06 2016", price: 107.7 },
    { date: "Sept 07 2016", price: 108.36 },
    { date: "Sept 08 2016", price: 105.52 },
    { date: "Sept 09 2016", price: 103.13 },
    { date: "Sept 12 2016", price: 105.44 },
    { date: "Sept 13 2016", price: 107.95 },
    { date: "Sept 14 2016", price: 111.77 },
    { date: "Sept 15 2016", price: 115.57 },
    { date: "Sept 16 2016", price: 114.92 },
    { date: "Sept 19 2016", price: 113.58 },
    { date: "Sept 20 2016", price: 113.57 },
    { date: "Sept 21 2016", price: 113.55 },
    { date: "Sept 22 2016", price: 114.62 },
    { date: "Sept 23 2016", price: 112.71 },
    { date: "Sept 26 2016", price: 112.88 },
    { date: "Sept 27 2016", price: 113.09 },
    { date: "Sept 28 2016", price: 113.95 },
    { date: "Sept 29 2016", price: 112.18 },
    { date: "Sept 30 2016", price: 113.05 },
    { date: "Oct 03 2016", price: 112.52 },
    { date: "Oct 04 2016", price: 113 },
    { date: "Oct 05 2016", price: 113.05 },
    { date: "Oct 06 2016", price: 113.89 },
    { date: "Oct 07 2016", price: 114.06 },
    { date: "Oct 10 2016", price: 116.05 },
    { date: "Oct 11 2016", price: 116.3 },
    { date: "Oct 12 2016", price: 117.34 },
    { date: "Oct 13 2016", price: 116.98 },
    { date: "Oct 14 2016", price: 117.63 },
    { date: "Oct 17 2016", price: 117.55 },
    { date: "Oct 18 2016", price: 117.47 },
    { date: "Oct 19 2016", price: 117.12 },
    { date: "Oct 20 2016", price: 117.06 },
    { date: "Oct 21 2016", price: 116.6 },
    { date: "Oct 24 2016", price: 117.65 },
    { date: "Oct 25 2016", price: 118.25 },
    { date: "Oct 26 2016", price: 115.59 },
    { date: "Oct 27 2016", price: 114.48 },
    { date: "Oct 28 2016", price: 113.72 },
    { date: "Oct 31 2016", price: 113.54 },
    { date: "Nov 01 2016", price: 111.49 },
    { date: "Nov 02 2016", price: 111.59 },
    { date: "Nov 03 2016", price: 109.83 },
    { date: "Nov 04 2016", price: 108.84 },
    { date: "Nov 07 2016", price: 110.41 },
    { date: "Nov 08 2016", price: 111.06 },
    { date: "Nov 09 2016", price: 110.88 },
    { date: "Nov 10 2016", price: 107.79 },
    { date: "Nov 11 2016", price: 108.43 },
    { date: "Nov 14 2016", price: 105.71 },
    { date: "Nov 15 2016", price: 107.11 },
    { date: "Nov 16 2016", price: 109.99 },
    { date: "Nov 17 2016", price: 109.95 },
    { date: "Nov 18 2016", price: 110.06 },
    { date: "Nov 21 2016", price: 111.73 },
    { date: "Nov 22 2016", price: 111.8 },
    { date: "Nov 23 2016", price: 111.23 },
    { date: "Nov 25 2016", price: 111.79 },
    { date: "Nov 28 2016", price: 111.57 },
    { date: "Nov 29 2016", price: 111.46 },
    { date: "Nov 30 2016", price: 110.52 },
    { date: "Dec 01 2016", price: 109.49 },
    { date: "Dec 02 2016", price: 109.9 },
    { date: "Dec 05 2016", price: 109.11 },
    { date: "Dec 06 2016", price: 109.95 },
    { date: "Dec 07 2016", price: 111.03 },
    { date: "Dec 08 2016", price: 112.12 },
    { date: "Dec 09 2016", price: 113.95 },
    { date: "Dec 12 2016", price: 113.3 },
    { date: "Dec 13 2016", price: 115.19 },
    { date: "Dec 14 2016", price: 115.19 },
    { date: "Dec 15 2016", price: 115.82 },
    { date: "Dec 16 2016", price: 115.97 },
    { date: "Dec 19 2016", price: 116.64 },
    { date: "Dec 20 2016", price: 116.95 },
    { date: "Dec 21 2016", price: 117.06 },
    { date: "Dec 22 2016", price: 116.29 },
    { date: "Dec 23 2016", price: 116.52 },
    { date: "Dec 27 2016", price: 117.26 },
    { date: "Dec 28 2016", price: 116.76 },
    { date: "Dec 29 2016", price: 116.73 },
    { date: "Dec 30 2016", price: 115.82 },
  ]);

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
        <div>asd</div>
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
              setGraphData([]);
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
                        setDate1(date);
                      });
                      setTable(filtered);
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

      <LineChart
        width={600}
        height={400}
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
        <Line dataKey="price" stroke="#ff7300" dot={false} />
        <Brush dataKey="date" startIndex={graphData.length - 40}>
          <AreaChart>
            <CartesianGrid />
            <YAxis hide domain={["auto", "auto"]} />
            <Area dataKey="price" stroke="#ff7300" fill="#ff7300" dot={false} />
          </AreaChart>
        </Brush>
      </LineChart>
    </div>
  );
};

export default Table;
