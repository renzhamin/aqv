import styles from "@/pages/topTen/TopTen.module.css";

export const colorIndex = (aqi_score) => {
  if (aqi_score <= 50) {
    return styles.colGreen;
  } else if (aqi_score <= 100) {
    return styles.colYellow;
  } else if (aqi_score <= 150) {
    return styles.colOrange;
  } else if (aqi_score <= 200) {
    return styles.colRed;
  } else if (aqi_score <= 300) {
    return styles.colPurple;
  } else {
    return styles.colPink;
  }
};
