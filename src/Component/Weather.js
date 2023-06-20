import React, { useState } from 'react';
import "./css/weather.css";
import Smallbox from './Smallbox';
import Loader from './Loader';
import { WiHumidity } from "react-icons/wi";
import { BsSearch } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { BiCurrentLocation } from "react-icons/bi";
import rain from "./image/rain.png";
import clearSky from "./image/clear-sky.png";
import clouds from "./image/clouds.png";
import drizzle from "./image/drizzle.png";
import dust from "./image/dust.png";
import fog from "./image/fog.png";
import haze from "./image/haze.png";
import sand from "./image/sand.png";
import smog from "./image/smog.png";
import snow from "./image/snow.png";
import thunderStorm from "./image/thunderstorm.png";
import tornado from "./image/tornado.png";



export default function Weather(props) {

    const [temp, settemp] = useState("")
    const [search, setsearch] = useState("")
    const [img, setimg] = useState("")
    const [speed, setspeed] = useState("")
    const [humidity, sethumidity] = useState("")
    const [country, setcountry] = useState("")
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [lat, setlat] = useState("")
    const [long, setlong] = useState("")
    const [perClouds, setperClouds] = useState("")
    const [loading, setloading] = useState(false)
    const [dt, setdt] = useState("")


    const update = (jsonData) => {
        setloading(false)
        settemp(jsonData.main);
        setcountry(jsonData.sys.country);
        setname(jsonData.name);
        setimg(jsonData.weather[0].main);
        setspeed(jsonData.wind.speed)
        sethumidity(jsonData.main.humidity)
        setdescription(jsonData.weather[0].description)
        setperClouds(jsonData.clouds.all)
        setdt(new Date(jsonData.dt * 1000));
    }

    const fetchAPI = async () => {
        let APIkey1 = "e31e62337e5b137fbe8c62285019f75d";
        let APIkey2 = "6536e4e7eed16ae04e3ce07a73c4a713";
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${APIkey2}`
        setloading(true)
        let data = await fetch(URL);
        let jsonData = await data.json();
        update(jsonData);

    }

    const curlocation = async () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setlat(position.coords.latitude);
            setlong(position.coords.longitude);
        })
        if (navigator.geolocation) {
            let APIkey1 = "e31e62337e5b137fbe8c62285019f75d";
            let APIkey2 = "6536e4e7eed16ae04e3ce07a73c4a713";
            let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${APIkey2}`
            setloading(true)
            let data = await fetch(URL);
            let jsonData = await data.json();
            update(jsonData);


        }
        else {
            alert(" Location Access Denied ");
        }
    }
    let all;
    if (img === "Clouds") {
        all = `: clouds = ${perClouds}%`
    }
    else {
        all = ""
    }
    let icon;
    switch (img) {
        case "Haze":
            icon = haze;
            break;
        case "Thunderstorm":
            icon = thunderStorm;
            break;
        case "Drizzle":
            icon = drizzle;
            break;
        case "Rain":
            icon = rain;
            break;
        case "Snow":
            icon = snow;
            break;
        case "Haze":
            icon = haze;
            break;
        case "Mist":
            icon = haze;
            break;
        case "Smoke":
            icon = smog;
            break;
        case "Dust":
            icon = dust;
            break;
        case "Fog":
            icon = fog;
            break;
        case "Sand":
            icon = sand;
            break;
        case "Tornado":
            icon = tornado;
            break;
        case "Clear":
            icon = clearSky;
            break;
        case "Clouds":
            icon = clouds;
            break;

        default:
            icon = clearSky;
            break;
    }

    return (

        <div>
            <div className="search">
                <div className="form-control">
                    <input onChange={(e) => { setsearch(e.target.value) }} value={search} className="input" placeholder="Search" required="" type="text" />
                </div>
                <button className="my-button" onClick={fetchAPI}>
                    <h2><BsSearch /></h2>
                </button>
                <button className="my-button two" onClick={curlocation}>
                    <h2><BiCurrentLocation /></h2>
                    <h3 className='crn'> current </h3>
                </button>
            </div>
            {
                loading ? (<div className="loader"><Loader /></div>) : (


                    !temp ? (<div className='container'><p className='error'> City not Found </p></div>) : (
                        <div className="container">
                            <h2 className='city'> {name}  ,  {country} </h2>
                            <h3 className='dt'> {dt.toDateString()} , {dt.getHours()} : {dt.getMinutes()} : {dt.getSeconds()}</h3>
                            <div className="iconDiv">
                                <img src={icon} className='weatherIcon' alt='weather Icon...' />
                            </div>
                            <h2 className='temp'>{Math.round(temp.temp ? temp.temp : 0)} &#xb0;C</h2>
                            <h3 className='description'>{description}  {all} </h3>
                            <div className="info">
                                <Smallbox phyEnt="Humidity" phyEntIcon={<WiHumidity />} phyEntValue={humidity} unit="%" />
                                <Smallbox phyEnt="Wind Speed" phyEntIcon={<FiWind />} phyEntValue={Math.round(speed * (18 / 5))} unit="km/h" />
                            </div>
                        </div>
                    )
                )}

        </div>
    )
}
