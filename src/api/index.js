import axios from "axios";
import { toast } from "react-toastify";

const BACKEND = "http://127.0.0.1:5000/";
const API_KEY = process.env.REACT_APP_API_KEY;

export async function getCitys() {
  const result = await axios.get(BACKEND + "books");
  console.log("result", result);
  return result.data;
}

export async function addCity(newCity) {
  console.log("newCity", newCity, API_KEY);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    newCity +
    "&appid=" +
    API_KEY +
    "&units=metric";
  try{
    const response = await axios.get(url)
    const { data } = response;
      //round the temperature
      data.main.temp = Math.round(data.main.temp);
      //add a date + time to the city weather object
      const today = new Date();
      const hour = function () {
        const hr = today.getUTCHours() + data.timezone / 3600;
        return hr < 10 ? "0" + hr : hr;
      };
      const minutes = function () {
        return today.getMinutes() < 10
          ? "0" + today.getMinutes()
          : today.getMinutes();
      };
      data.time = hour() + ":" + minutes();
      data.day = today.toLocaleDateString("en-US", { weekday: "long" });
      // const data = {
      //   newBook: newCity,
      // };
      const result = await axios.post(BACKEND + "books", data);
      return result.uid;
    }catch {
      toast.error("That city is not exist!");
      return;
    };
}

export async function removeCity(uid) {
  const result = await axios.delete(BACKEND + "books/" + uid);
  return result;
}

export async function updateCity(uid, value) {
  const data = {
    newBook: value,
  };
  const result = await axios.put(BACKEND + "books/" + uid, data);
  return result;
}
