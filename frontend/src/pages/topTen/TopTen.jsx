import React from 'react'
import styles from './TopTen.module.css'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   

const TopTen = ({airQualityData}) => {
  const colColor = (aqi_score) => {
    if (aqi_score >= 0 && aqi_score <= 5) {
      return <TableCell><p className={styles.colBlue}>{aqi_score}</p></TableCell>;
    }
    else if (aqi_score >= 5.1 && aqi_score <= 10) {
      return <TableCell><p className={styles.colGreen}>{aqi_score}</p></TableCell>;
    } 
    else if (aqi_score >= 10.1 && aqi_score <= 15) {
      return <TableCell><p className={styles.colYellow}>{aqi_score}</p></TableCell>;
    } 
    else if (aqi_score >= 15.1 && aqi_score <= 25) {
      return <TableCell><p className={styles.colOrange}>{aqi_score}</p></TableCell>;
    } 
    else if (aqi_score >= 25.1 && aqi_score <= 35) {
      return <TableCell><p className={styles.colRed}>{aqi_score}</p></TableCell>;
    } 
    else if (aqi_score >= 35.1 && aqi_score <= 50) {
      return <TableCell><p className={styles.colPink}>{aqi_score}</p></TableCell>;
    }
    else {
      return <TableCell><p className={styles.colPurple}>{aqi_score}</p></TableCell>;
    }
  };

  return (
    <div>
        <Table className={styles.table}>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader className={styles.tableHeader}>
            <TableRow>
            <TableHead className="w-[5vw]">#</TableHead>
            <TableHead>COUNTRY</TableHead>
            <TableHead>FLAG</TableHead>
            <TableHead>POPULATION</TableHead>
            <TableHead >AQI SCORE</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {airQualityData.map((country, index) => (
            <TableRow key={country.country_name}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{country.country_name}</TableCell>
                <TableCell><img src="https://media.istockphoto.com/id/1061013668/vector/vector-flag-of-the-peoples-republic-of-bangladesh-proportion-3-5-the-national-flag-of.jpg?s=612x612&w=0&k=20&c=2UzlTX9EIPrLJJ9kHcr-VOXvM6FWNWsi3uZmsocshBk=" className={styles.flagImg}/></TableCell>
                <TableCell>{country.population}</TableCell>
                {colColor(country.aqi_score)}
                {/* <TableCell>{country.aqi_score}</TableCell> */}
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  )
}

export default TopTen