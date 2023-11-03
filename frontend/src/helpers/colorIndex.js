import styles from "@/pages/topTen/TopTen.module.css";

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
