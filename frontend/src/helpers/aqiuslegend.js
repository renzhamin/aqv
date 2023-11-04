export const aqiuslegend = (aqi_score) => {
    if (aqi_score <= 50) {
      return "Good";
    } else if (aqi_score <= 100) {
      return "Moderate";
    } else if (aqi_score <= 150) {
      return "Unhealthy for Sensitive Groups";
    } else if (aqi_score <= 200) {
      return "Unhealthy";
    } else if (aqi_score <= 300) {
      return "Very Unhealthy";
    } else {
      return "Hazardous";
    }
  };