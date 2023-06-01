import { MONTH } from "./constants.js";

export const getMonth = (month) => {
  const result = MONTH.find((item) => {
    return item.id === month;
  });

  return result.text;
};

export const nextMonth = (month) => {
  let num = parseInt(month, 10);
  return (num + 1).toString().padStart(2, "0");
};

//function to transform the date to the format YYYYMMDD
export function formatDate(date) {
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = "" + date.getFullYear();

  //if the month is less than 10, add a 0 to the month
  if (month.length < 2) month = "0" + month;
  //if the day is less than 10, add a 0 to the day
  if (day.length < 2) day = "0" + day;

  //return the date in the format YYYYMMDD
  return [year, month, day].join("");
}
