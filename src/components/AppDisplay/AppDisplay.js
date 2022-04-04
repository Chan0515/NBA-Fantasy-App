import React from 'react';
import './AppDisplay.css';
import { Button } from '../Button/Button';

export default function AppDisplay(props) {
    return(
        <div className="textBox">
            <h3>{props.title}</h3>
            <p className="leftAlign">
                {props.appDesc}
            </p>
            <p className = "bold" id = "libContainer">
                Frameworks: {props.frameworks}
                <br/><br/>
                Libraries: {props.libraries}
            </p>
            <div id = "buttonContainer">
                <Button onClick = {() => window.open(props.github)}><i className="fa-brands fa-github"></i> Github</Button>
                <Button onClick = {() => window.location.href=(window.location.origin + "/" + props.appLink)}><i className={props.appIcon}></i> App</Button>
            </div>       
        </div>
    )   
}