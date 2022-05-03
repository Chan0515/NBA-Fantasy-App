import React from 'react';
import './AppDisplay.css';
import { Button } from '../Button/Button';
import { AppsList } from './AppsList';

export default function AppDisplay() {
    return(
        <>
            {AppsList.map((item,index) => {
                return(
                    <div key = {index} className="textBox">
                        <h3>{item.title}</h3>
                        <p className="leftAlign">
                            {item.appDesc}
                        </p>
                        <p className = "bold" id = "libContainer">
                            Frameworks: {item.frameworks}
                            <br/><br/>
                            Libraries: {item.libraries}
                        </p>
                        <div id = "buttonContainer">
                            <Button onClick = {() => window.open(item.github)}><i className="fa-brands fa-github"></i> Github</Button>
                            <Button onClick = {() => window.location.href=(window.location.origin + "/" + item.appLink)}><i className={item.appIcon}></i> App</Button>
                        </div>       
                    </div>
                )
            })}
        </>
    )
}
        