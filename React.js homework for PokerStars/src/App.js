import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState();
  const [temperature, setTemperature] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [humidity, setHumidity] = useState();
  const [pressure, setPressure] = useState();

  const onClick = () => {
    
    if (isNaN(location) && location !== undefined) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=37c689d8c93066153ad764c1c8ca9a0d`)
        .then((response) => response.json()) 
        .then((data) => {
          setTemperature(data.main.temp);
          setFeelsLike(data.main.feels_like);
          setHumidity(data.main.humidity);
          setPressure(data.main.pressure);
        }).catch((error) => {
          alert('Sorry, not found.');
        })
    } else {
      alert('Please enter а valid location.');
    }
  }

  const onChange = (event) => {
    setLocation(event.target.value);
  }
  return (

    <div className="App">
      <h1>Day Weather</h1>
      <section>
        <label>Location: <input type="text" placeholder="Enter Location" onChange={onChange}></input></label>
        <button onClick={onClick}>Show the weather!</button>
      </section>
      <article>
        {temperature ? <p className="paragraph">Temperature: {(temperature - 273.15).toFixed(2)}°C</p> : ''}
        {feelsLike ? <p className="paragraph">Feels Like: {(feelsLike - 273.15).toFixed(2)}°C</p> : ''}
        {humidity ? <p className="paragraph">Humidity: {humidity}%</p> : ''}
        {pressure ? <p className="paragraph">Pressure: {pressure} hPa</p> : ''}
      </article>
    </div>
  );
}

export default App;
