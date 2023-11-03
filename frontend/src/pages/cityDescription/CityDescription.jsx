import React, { useEffect } from 'react'
import styles from './CityDescription.module.css'
import Navigation from '../navigation/Navigation'
import { get_city_info,get_country_info } from '@/fetch/rankings';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const CityDescription = () => {
  const [city, setCity] = React.useState(null);
  
  useEffect(() => {
    get_city_info("Dhaka").then((data) => {
      setCity(data);
    });
  }, []); 

  console.log(city);

  return ( 
    <div className={styles.cityDescription}>
      <Navigation/>
      <h2 className={styles.topSpace}></h2>
      <div className={styles.topBox}>
        <div className={styles.titleBox}>
          <h2>Air quality in {city?.city_name}</h2>
          <p>Air quality index (AQI) and PM2.5 air pollution in {city?.city_name}</p>
        </div>
        <div className={styles.aqiColorBox}>
          <div className={styles.aqiScoreBox}>
            <p> US AQI</p>
            <h2>{city?.data[0].aqi}</h2>
          </div>
          <div className={styles.aqiTextBox}>
            <p>LIve AQI INDEX</p>
            <h2>Hazardous</h2>
          </div>
        </div>
      </div>
      
      <div className={styles.tableBox}>
        <p>OVERVIEW</p>
        <h2>What is the current air quality in {city?.city_name}?</h2>

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
              <TableCell>{city?.data[0].aqi} US AQI</TableCell>
              <TableCell>PM2.5</TableCell>
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
                <TableCell>{city?.data[0].pm25} µg/m³</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>PM10</TableCell>
                <TableCell>

                </TableCell>
                <TableCell>{city?.data[0].pm10} µg/m³</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Ozone (O3) </TableCell>
                <TableCell>

                </TableCell>
                <TableCell>{city?.data[0].o3} µg/m³</TableCell>
              </TableRow>
            </TableBody>

        </Table>
        <br/>
        <h2>What is the socio economic factor in Bangladesh?</h2>
        <Table className={styles.table2}>
          <TableHeader>
            <TableRow className={styles.tableHeader}>
              <TableHead>Indicator</TableHead>
              <TableHead></TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <TableCell>Total GDP</TableCell>
                <TableCell>

                </TableCell>
                <TableCell>{city?.gdp}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>GDP per capita</TableCell>
                <TableCell>

                </TableCell>
                <TableCell>{city?.gdpPerCapita}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>GDP growth</TableCell>
                <TableCell>

                </TableCell>
                <TableCell>{city?.gdpGrowth}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Total Population</TableCell>
                <TableCell>

                </TableCell>
                <TableCell>{city?.population}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Population Growth</TableCell>
                <TableCell>

                </TableCell>
                <TableCell>{city?.populationGrowth}</TableCell>
              </TableRow>


            </TableBody>

        </Table>

      </div>
    </div>
  )
}

export default CityDescription