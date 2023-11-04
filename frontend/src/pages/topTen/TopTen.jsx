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
import { useNavigate } from 'react-router-dom';


const TopTen = ({ airQualityData }) => {

  const navigate = useNavigate();

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
            <TableRow key={item.city} onClick={() => navigate(`/city/${item.state}`)}>
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
                <p className={colorIndex(item.aqi) + " " + "aqiValue"}>
                  {item.aqi}
                </p>
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
