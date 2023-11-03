import React from 'react'
import Navigation from '../navigation/Navigation'
import MapsComponent from '../maps/MapsComponent'
import AirQuality from '../airQuality/AirQuality'
import Footer from '../footer/Footer'

const HomePage = () => {
  return (
    <div>
        <Navigation/>
       <MapsComponent/>
         <AirQuality/>
        <Footer/> 

    </div>
  )
}

export default HomePage