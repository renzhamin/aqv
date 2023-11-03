import React from 'react'
import styles from './CityDescription.module.css'
import Navigation from '../navigation/Navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const CityDescription = () => {
  return (
    <div className={styles.cityDescription}>
      <Navigation/>
      <h2 className={styles.topSpace}></h2>
      <div className={styles.topBox}>
        <div className={styles.titleBox}>
          <h2>Air quality in Delhi</h2>
          <p>Air quality index (AQI) and PM2.5 air pollution in Delhi</p>
        </div>
        <div className={styles.aqiColorBox}>
          <div className={styles.aqiScoreBox}>
            <p>US AQI</p>
            <h2>346</h2>
          </div>
          <div className={styles.aqiTextBox}>
            <p>LIve AQI INDEX</p>
            <h2>Hazardous</h2>
          </div>
        </div>
      </div>
      
      <div className={styles.tableBox}>
        <p>OVERVIEW</p>
        <h2>What is the current air quality in Delhi?</h2>

        <Table className={styles.table1}>
          <TableHeader>
            <TableRow className={styles.tableHeader}>
              <TableHead>Air pollution level</TableHead>
              <TableHead>Air quality index</TableHead>
              <TableHead>Main pollutant</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Hazardous</TableCell>
              <TableCell>346 US AQI</TableCell>
              <TableCell>PM10</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        
        <Table className={styles.table2}>
          <TableHeader>
            <TableRow className={styles.tableHeader}>
              <TableHead>Polutant</TableHead>
              <TableHead></TableHead>
              <TableHead>concentration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell>PM2.5</TableCell>
                <TableCell>

                </TableCell>
                <TableCell>229µg/m³</TableCell>
              </TableRow>
            </TableBody>

        </Table>
      </div>
    </div>
  )
}

export default CityDescription