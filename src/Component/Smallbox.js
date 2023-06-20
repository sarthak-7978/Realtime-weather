import React from 'react';
import "./css/smallbox.css";
import { WiHumidity } from "react-icons/wi";

export default function Smallbox(props) {
  return (
    <div>
        <div className="box">
        <h6>{props.phyEnt}</h6>
        <div className="smallBoxText">
        <h1>{props.phyEntIcon}</h1>
        <h2>{props.phyEntValue}</h2>
        <h3>{props.unit}</h3>
        </div>
        </div>
    </div>
  )
}
