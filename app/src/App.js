import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function Card(title, value) {

  return (
    <div className='card'>

          <h3>Title</h3>
          <p>Value</p>

    </div>
  )

}

const endpoint = "https://api.weatherapi.com/v1/current.json?Key=6b83308e80864700a8d155116252806&q=";

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);

  const fetchData = () => {

    if (search) {

      const url = endpoint + search;
      fetch(url)
      .then((data) => data.json())
      .then((data) => {
        console.log("data >> ", data);
        setWeatherData(data);
      })
      .catch(error => {
        console.error("Error while fetching data : ", error);
        alert("Failed to fetch weather data");
      })
    }
  }

  return (
    <div className="App">

        <input placeholder='Enter the city'
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        />
        <button className='button' 
        onClick={fetchData}
        >Search</button>

        

    </div>
  );
}

export default App;
