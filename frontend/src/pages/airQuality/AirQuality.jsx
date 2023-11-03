import React from 'react'
import styles from './AirQuality.module.css'
import TopTen from '../topTen/TopTen'
import AirQualityWorstJson from './AirQualityWorstJson'

const AirQuality = () => {
  return (
    <div>
      <div className={[styles.airQuality, 'elevated-2xl'].join(' ')}>
        <p className={styles.title}>2022 AQI COUNTRY RANKING</p>

        <p className={styles.tableTitle}>What country has the worst air quality?</p>
        <TopTen airQualityData={AirQualityWorstJson}/>

        <p className={[`${styles.tableTitle} mt-20`]}>Which is the cleanest country in the world?</p>
        <TopTen airQualityData={AirQualityWorstJson}/>
      </div>
    </div>
  )
}

export default AirQuality