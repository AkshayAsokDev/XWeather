
import './App.css';
import { useState } from 'react';


function Card({title, value}) {

  return (
    <div className='weather-card'>

      <h3>{title}</h3>
      <p>{value}</p>

    </div>
  )

}

const endpoint = "https://api.weatherapi.com/v1/current.json?Key=6b83308e80864700a8d155116252806&q=";
const tempKey = ["Temperature", "Humidity", "Condition", "Wind Speed"];


function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {

    setDisplay(false);

    if (search) {

      setLoading(true);

      const url = endpoint + search;
      fetch(url)
      .then((data) => {

        // error handling
        if(!data.ok){
          throw new Error(data.error.message)
        }

        return data.json()
      })
      .then((data) => {
        console.log("data >> ", data);
        
        const temp = [];
        temp.push(`${data.current.temp_c} °C`);
        temp.push(`${data.current.humidity} %`);
        temp.push(`${data.current.condition.text}`)
        temp.push(`${data.current.wind_kph} kph`);
        console.log("temp >>", temp);

        setWeatherData(temp);

      })
      .catch(error => {
        console.error("Error while fetching data : ", error);
        window.alert("Failed to fetch weather data");
      })
      .finally(() => {
        setLoading(false);
        setDisplay(true);
      })
    }

  }

  return (
    <div className="App">

        <div>

          <input placeholder='Enter the city'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type='text'
          />

          <button className='button' 
          onClick={fetchData}
          >Search</button>

        </div>

        {/* Loading */}
        {
          loading && <p>Loading data...</p>
        }

        {
          display && (
            <div className="weather-cards" >

              {
                weatherData.map((value, index) => <Card title={tempKey[index]} value={value} key={index} />)
              }

            </div>
          )
        }

        

    </div>
  );
}

export default App;
