import React, { useState } from "react";
import { toast } from "react-toastify";
import {removeCity, updateCity} from "../../api/index.js";

function Widget(props){
    const { city, getCities, index} = props;
    const [updateCityValue, setUpdateCityValue] = useState("");
    const [buttonText, setButtonText] = useState("See details");

    async function handleRemoveCity(uid){
        const result = await removeCity(uid);
        if (result.data.success) {
            toast.success("Successfully removed the city!");
            getCities();
        }
    }

    async function handleUpdateCity(uid){
        if (updateCity === "")return;
        const result = await updateCity(uid, updateCityValue);
        if (result.data.success) {
            toast.success("Successfully updated the city!");
            getCities();
        }
    }
    return(
        <div className="col-sm-6 col-md-4 col-xl-3 px-4">
                <div className="card mb-5">
                    <div className="card-body">
                        <button className="close-button btn btn-danger rounded-circle p-2 tt" onClick={()=>handleRemoveCity(city.uid)}><span className="tttext bg-dark">Close widget</span></button>
                        {/* <button className="refresh-button btn btn-warning rounded-circle p-2 tt" onClick={refreshCity}><span className="tttext bg-dark">Refresh widget</span></button> */}
                        <h4 className="card-title">{city.name}</h4>
                        <h5 className="card-subtitle text-muted lead">{city.day} {city.time}</h5>
                        <h5 className="card-subtitle text-muted lead">{city.weather[0].description}</h5>
                        <img className="" src={"http://openweathermap.org/img/wn/" + city.weather[0].icon + "@2x.png"} alt="weather icon" style={{width: "100px", float: "right"}} />
                        <div className="pt-3">
                            <p className="card-text display-6 mb-3">{city.main.temp}°C</p>
                            <div className="collapse" id={"collapseExample" + index} style={{whiteSpace: "nowrap" }}>
                                <p className="card-text">Feels like: {city.main.feels_like}°C</p>
                                <p className="card-text">Humidity: {city.main.humidity}%</p>
                                <br />
                                <p className="card-text">Pressure: {city.main.pressure} hPa</p>
                                <p className="card-text">Wind: {city.wind.speed} km/h - {city.wind.deg}°</p>
                            </div>
                        </div>
                        <button type="button" className="collapsible btn btn-dark mt-3" data-bs-toggle="collapse" data-bs-target={"#collapseExample" + index} aria-expanded="false" aria-controls={"collapseExample" + index}
                        onClick={()=>{
                            if(buttonText === "See details"){
                                setButtonText("Hide details");
                            }else{
                                setButtonText("See details");
                            }
                        }}
                        >{buttonText}</button>
                        {/* <div className="pt-3">
                            <input className="form-control  mt-3" type="text" placeholder="City to update" value={updateCityValue} onChange={(e)=> setUpdateCityValue(e.target.value)}/>
                            <button type="button" className="collapsible btn btn-dark mt-3" onClick={()=> handleUpdateCity(city.uid)}>Update</button>
                        </div> */}
                    </div>
                </div>
            </div>
    )
}

export default Widget;