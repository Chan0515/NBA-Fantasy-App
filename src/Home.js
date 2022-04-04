import React from 'react';
import './App.css';
import AppDisplay from './components/AppDisplay/AppDisplay';
import { AppsList } from './components/AppDisplay/AppsList';
export default function Home() {
    return(
        <div className = "content">
            <header>
                <h1>Hi, my name is Alex.</h1>
                <p>I am a former Mechanical Engineer currently pursuing Software Development.</p>
                <p>Check out my projects below:</p>
            </header>
            {AppsList.map((item,index) => {
                return(
                    <AppDisplay
                    key = {index} 
                    title = {item.title}
                    github = {item.github}
                    appLink = {item.appLink}
                    appIcon = {item.appIcon}
                    appDesc = {item.appDesc}
                    frameworks = {item.frameworks}
                    libraries = {item.libraries}
                    />
                )
            })}
            
        </div>
                    
    )
}