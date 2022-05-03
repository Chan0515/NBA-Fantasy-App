import React, {useState, useEffect} from 'react';
import './App.css';
import './components/Table/Table.css';
import { BaseTable }  from './components/Table/Table';
import loading from "./assets/spin.gif"
export default function NBA() {
    const [Season,setSeason] =  useState(null)
    const [L30, setL30] = useState(null)
    const [L7, setL7] = useState(null)
    const [zSeason,setzSeason] = useState(null)
    const [zL30, setzL30] = useState(null)
    const [zL7, setzL7] = useState(null)
    const [activeData,setData] =  useState(null)
    const URL = window.location.origin === "http://localhost:3000" ? "http://127.0.0.1:8000" : window.location.origin
    
    
    useEffect(() => {
        return fetch(URL + "/api/L30/")
        .then((response) => response.json())
        .then((responseJson) => {
              setL30(responseJson)
        },[])
        .catch((error) => {
          console.error(error);
        }),[]
    } , [] )
    useEffect(() => {
        return fetch(URL + "/api/L7/")
        .then((response) => response.json())
        .then((responseJson) => {
              setL7(responseJson)
        },[])
        .catch((error) => {
          console.error(error);
        }),[]
    } , [] )
    useEffect(() => {
        return fetch(URL + "/api/Season/")
        .then((response) => response.json())
        .then((responseJson) => {
              setSeason(responseJson)
              setData(responseJson)
        },[])
        .catch((error) => {
          console.error(error);
        }),[]
    } , [] )
    useEffect(() => {
        return fetch(URL + "/api/zSeason/")
        .then((response) => response.json())
        .then((responseJson) => {
              setzSeason(responseJson)
        },[])
        .catch((error) => {
          console.error(error);
        }),[]
    } , [] )
    useEffect(() => {
        return fetch(URL + "/api/zL30/")
        .then((response) => response.json())
        .then((responseJson) => {
              setzL30(responseJson)
        },[])
        .catch((error) => {
          console.error(error);
        }),[]
    } , [] )
    useEffect(() => {
        return fetch(URL + "/api/zL7/")
        .then((response) => response.json())
        .then((responseJson) => {
              setzL7(responseJson)
        },[])
        .catch((error) => {
          console.error(error);
        }),[]
    } , [] )
    
    if(activeData !== null){
        return (
            <div className="App">
            <BaseTable propdata={activeData} setData={setData} Season={Season} zSeason={zSeason} L30={L30} L7={L7} zL30={zL30} zL7={zL7}/>
            </div>
            
        )
    } else {
        return (
          <div className="center">
            <img className="center" src={loading}/>
          </div>     
        )   
    }
}
