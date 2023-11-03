import React, { useEffect } from "react";
import styles from "./TopTen.module.css";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { colorIndex } from "@/helpers/colorIndex";

const TopTen = ({ airQualityData }) => {
  const colColor = (aqi_score) => {
    if (aqi_score >= 0 && aqi_score <= 5) {
      return (
        <TableCell>
          <p className={styles.colBlue}>{aqi_score}</p>
        </TableCell>
      );
    } else if (aqi_score >= 5.1 && aqi_score <= 10) {
      return (
        <TableCell>
          <p className={styles.colGreen}>{aqi_score}</p>
        </TableCell>
      );
    } else if (aqi_score >= 10.1 && aqi_score <= 15) {
      return (
        <TableCell>
          <p className={styles.colYellow}>{aqi_score}</p>
        </TableCell>
      );
    } else if (aqi_score >= 15.1 && aqi_score <= 25) {
      return (
        <TableCell>
          <p className={styles.colOrange}>{aqi_score}</p>
        </TableCell>
      );
    } else if (aqi_score >= 25.1 && aqi_score <= 35) {
      return (
        <TableCell>
          <p className={styles.colRed}>{aqi_score}</p>
        </TableCell>
      );
    } else if (aqi_score >= 35.1 && aqi_score <= 50) {
      return (
        <TableCell>
          <p className={styles.colPink}>{aqi_score}</p>
        </TableCell>
      );
    } else {
      return (
        <TableCell>
          <p className={styles.colPurple}>{aqi_score}</p>
        </TableCell>
      );
    }
  };

  return (
    <div>
      <Table className={styles.table}>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className={styles.tableHeader}>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>CITY</TableHead>
            <TableHead>STATE</TableHead>
            <TableHead>AQI SCORE</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {airQualityData.map((item, index) => (
            <TableRow key={item.city}>
              <TableCell className="font-bold text-xl">{index + 1}</TableCell>
              <TableCell>
                <div className="float-left mr-4">
                  <img src={item.flagURL} width={50} />
                </div>
                <p>{item.city}</p>
              </TableCell>
              <TableCell>{item.state}</TableCell>
              {/* {colColor(item.aqi)} */}
              <TableCell>
                <p className={colorIndex(item.aqi)}>{item.aqi}</p>
              </TableCell>

              {/* <TableCell>{country.aqi_score}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopTen;
