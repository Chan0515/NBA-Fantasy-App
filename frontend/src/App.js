import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NBA from './NBA';
import Home from './Home';
function App() {
    return(
        <div>
            <Navbar/>
            <NBA/>
        </div>
    )
}
export default App