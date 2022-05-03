import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import NBA from './NBA';
import Home from './Home';
function App() {
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route index element = {<Home/>} path = "/"></Route>
                <Route element = {<NBA/>} path = "/NBA"></Route>
            </Routes>
        </div>
    )
}
export default App