import styles from "@/pages/topTen/TopTen.module.css";

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
