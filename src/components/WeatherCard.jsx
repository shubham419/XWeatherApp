
const WeatherCard = ({title, value}) => {
  return (
    <div className="weather-card">
        <h3>{title}</h3>
        <h4>{value}</h4>
    </div>
  )
}

export default WeatherCard