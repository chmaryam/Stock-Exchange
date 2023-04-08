import React, { useState, useEffect } from 'react'
import Axios from 'axios'


export default function App() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetch('https://stock-and-options-trading-data-provider.p.rapidapi.com/options/aapl')
      // headers: {
        // 'X-RapidAPI-Proxy-Secret': 'a755b180-f5a9-11e9-9f69-7bf51e845926',
        // 'X-RapidAPI-Key': '8884dfbf43msheb9d5784071dd1ap10662cjsnfd2c548117c2',
        // 'X-RapidAPI-Host': 'stock-and-options-trading-data-provider.p.rapidapi.com'})
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.log(error))
    }, []);
  
    return (
        <div>
        <h1>API Data</h1>
      </div>
    );
  }
  
 
  