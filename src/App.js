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
      temp.push({
        name: data[i].split(":")[1],
        uid: data[i].split(":")[0],
      });
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

      <Widgets cities={cities} setCities={setCities} getCities= {getCities}/>
      <Form setCities={setCities} getCities= {getCities} />
    </div>
  );
}

export default App;
