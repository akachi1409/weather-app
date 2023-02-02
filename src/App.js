import React, { useEffect, useState } from "react";
import Heading from "./components/Heading.js";
import Widgets from "./components/widgets/Widgets.js";
import Form from "./components/Form.js";
import { getCitys } from "./api/index.js";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [cities, setCities] = useState([]);

  async function getCities() {
    const data = await getCitys();
    console.log(data);
    var temp = [];
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      console.log("---", data[i].substring(37));
      const cityData = JSON.parse(String(data[i].substring(37)));
      //round the temperature
      cityData.main.temp = Math.round(cityData.main.temp);

      //add a date + time to the city weather object
      const today = new Date();
      const hour = function () {
        const hr = today.getUTCHours() + cityData.timezone / 3600;
        return hr < 10 ? "0" + hr : hr;
      };
      const minutes = function () {
        return today.getMinutes() < 10
          ? "0" + today.getMinutes()
          : today.getMinutes();
      };
      cityData.time = hour() + ":" + minutes();
      cityData.day = today.toLocaleDateString("en-US", { weekday: "long" });
      cityData.uid = data[i].substring(0, 36);
      temp.push(cityData);
    }
    setCities(temp);
  }
  useEffect(() => {
    if (firstLoad) {
      getCities();
      setFirstLoad(false);
    }
  }, [firstLoad]);

  return (
    <div>
      <ToastContainer transition={Slide} />
      {cities.length === 0 ? <Heading /> : <></>}

      <Widgets cities={cities} setCities={setCities} getCities={getCities} />
      <Form setCities={setCities} getCities={getCities} />
    </div>
  );
}

export default App;
