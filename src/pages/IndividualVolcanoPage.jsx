import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { Map, Marker } from "pigeon-maps";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function IndividualVolcanoPage() {
  let { id } = useParams();
  const [volcano, setVolcano] = useState();
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    fetch(`http://4.237.58.241:3000/volcano/${id}`, token !== "" && token != null ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
      
    } : {})
      .then(res => res.json())
      .then(volcanoData => {
        setVolcano(volcanoData); // volcano = volcanoData
      })
  }, [])

  if (volcano == null) {
    return <div />
  }

  console.log(volcano);

  const latitude = parseInt(volcano.latitude);
  const longitude = parseInt(volcano.longitude);

  const pop5km = parseInt(volcano.population_5km);
  const pop10km = parseInt(volcano.population_10km);
  const pop30km = parseInt(volcano.population_30km);
  const pop50km = parseInt(volcano.population_50km);

  return (
    <Container>
      <div className="listandmap">
        <div className="list">
          <h3> {volcano.name} </h3>
          <p>Country: {volcano.country}</p>
          <p>Region: {volcano.region}</p>
          <p>Subregion: {volcano.subregion}</p>
          <p>Last Eruption: {volcano.last_eruption}</p>
          <p>Summit: {volcano.summit} m</p>
          <p>Elevation: {volcano.elevation} ft</p>
        </div>
        <div className="map">
          <Map 
            height={300} 
            defaultCenter={[latitude, longitude]} 
            defaultZoom={1}>
            <Marker 
              width={50}
              anchor={[latitude, longitude]} 
              color={color} 
              onClick={() => setHue(hue + 20)} 
            />
            <Marker 
              width={50}
              anchor={[latitude, longitude]} 
              color={color} 
              onClick={() => setHue(hue + 20)} 
            >
            </Marker>
          </Map>
        </div>
      </div>
      { token !== "" ? (
        <div className="barchart">
          <Bar
            data={{
              labels: ['5km', '10km', '30km', '50km'],
              datasets: [{
                label: "Population Density",
                data: [pop5km, pop10km, pop30km, pop50km],
                boaderWidth: 1
              }]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      ) : null}
    </Container>
  );
}