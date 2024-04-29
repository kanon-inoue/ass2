import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { Map, Marker } from "pigeon-maps";

export default function IndividualVolcanoPage() {
  let { id } = useParams();
  const [volcano, setVolcano] = useState();
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    fetch(`http://4.237.58.241:3000/volcano/${id}`)
      .then(res => res.json())
      .then(volcanoData => {
        setVolcano(volcanoData); // volcano = volcanoData
      })
  }, [])

  if (volcano == null) {
    return <div />
  }

  console.log(volcano)

  const latitude = parseInt(volcano.latitude)
  const longitude = parseInt(volcano.longitude)

  return (
    <div>
      <Container>
        <h3> {volcano.name} </h3>
        <p>Country: {volcano.country}</p>
        <p>Region: {volcano.region}</p>
        <p>Subregion: {volcano.subregion}</p>
        <p>Last Eruption: {volcano.last_eruption}</p>
        <p>Summit: {volcano.summit} m</p>
        <p>Elevation: {volcano.elevation} ft</p>

      </Container>
      <div>
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
      <div> // chart image

      </div>
    </div>
  );
}