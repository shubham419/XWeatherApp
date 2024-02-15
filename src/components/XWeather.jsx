import { useState } from "react";
import styles from "./WeatherCard.module.css";
import WeatherCard from "./WeatherCard";

const XWeather = () => {

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [apiData, setApiData] = useState("");


  async function fetchData() {
    try{
        setApiData("");
        setLoading(true)
        const url = new URL("https://api.weatherapi.com/v1/current.json");
        url.searchParams.append("key", "64956985695e4ca881765309241601");
        url.searchParams.append("q", search);
        const res = await fetch(url.href);
        const data = await res.json();
        if(data.error){
            throw(data);
        }
        console.log(data);
        setLoading(false);
        setApiData(data);
    }catch (e){
        alert("Failed to fetch weather data")
        console.error(e);
    }
    
  }

  return (
    <div>
      <input
        className={styles.searchInput}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Enter city name"
        type="text"
      />
      <button onClick={fetchData}>Search</button>
      {loading? <p>Loading data…</p> : null}
      {apiData ? 
      <div className={`${styles.cardWrapper} weather-cards`}>
        <WeatherCard title="Temperature" value={`${apiData.current.temp_c}°C`} />
        <WeatherCard title="Humidity"  value={`${apiData.current.humidity}%`} />
        <WeatherCard title="Condition"  value={`${apiData.current.condition.text}`} />
        <WeatherCard title="Condition Speed"  value={`${apiData.current.gust_kph} kph`} />
      </div>
      
      : null}
    </div>
  );
};

export default XWeather;
