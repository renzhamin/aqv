export const colorIndex = (aqi_score) => {
  if (aqi_score <= 50) {
    return "colGreen";
  } else if (aqi_score <= 100) {
    return "colYellow";
  } else if (aqi_score <= 150) {
    return "colOrange";
  } else if (aqi_score <= 200) {
    return "colRed";
  } else if (aqi_score <= 300) {
    return "colPurple";
  } else {
    return "colPink";
  }
};

export const colorIndex2 = (aqi_score) => {
  if (aqi_score <= 50) {
    return "colLightGreen"; // Light Green
  } else if (aqi_score <= 100) {
    return "colLightYellow"; // Light Yellow
  } else if (aqi_score <= 150) {
    return "colLightOrange"; // Light Orange
  } else if (aqi_score <= 200) {
    return "colLightRed"; // Light Red
  } else if (aqi_score <= 300) {
    return "colLightPurple"; // Light Purple
  } else {
    return "colLightPink"; // Light Pink
  }
};
