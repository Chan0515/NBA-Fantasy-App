import React from 'react';
import './App.css';
import AppDisplay from './components/AppDisplay/AppDisplay';
export default function Home() {
    return(
        <div className = "content">
            <header>
                <h1>Hi, my name is Alex.</h1>
                <p>I am a former Mechanical Engineer currently pursuing Software Development.</p>
                <p>Check out my projects below:</p>
            </header>
            <AppDisplay/>           
        </div>
                    
    )
}