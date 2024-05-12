import React from "react";
import { Container } from "reactstrap";

export default function LandingPage() {
  return (
    <main>
      <Container className="container">
        {/* title */}
        <h1 className='title'>Volcanoes of the World</h1>
        {/* image */}
        <div id='img'>
          <img src="img/mountain.jpeg" alt="image of Volcanoes surounded by clouds" />
        </div>
      </Container>
    </main>
  );
}