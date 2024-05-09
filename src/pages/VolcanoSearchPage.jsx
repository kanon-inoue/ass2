import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from '@ag-grid-community/core';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const populatedWithin = [5, 10, 30, 100];

export default function VolcanoSearchPage() {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [volcanoes, setVolcanoes] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedPopulatedWithin, setSelectedPopulatedWithin] = useState(5);

  useEffect(() => {
    fetch("http://4.237.58.241:3000/countries")
      .then(res => res.json())
      .then(countryData => {
        setCountries(countryData); // countries = countryData
        setSelectedCountry(countryData[0]) // selected country = countryData[0]
      })
  }, [])

  const fetchVolcanoes = () => {
    if (selectedCountry != null) {
      fetch(`http://4.237.58.241:3000/volcanoes?country=${selectedCountry}&populatedWithin=${selectedPopulatedWithin}km`)
        .then(res => res.json())
        .then(volcanoData => setVolcanoes(volcanoData)) // volucanos = VolucanoData
    }
  }

  const columnDefs = [
    {field: "name"},
    {field: "region"},
    {field: "subregion"}
  ];

  return (
    <Container>
      <div className="title">
        <h1>Searching Volcanoes</h1>
      </div>
      <div className="filters">
        <label>Country:</label>
        <select className="filter" name="country" id="country" onChange={(event) => setSelectedCountry(event.target.value)}>
          {countries.map((countryName) => <option key={countryName} value={countryName}>{countryName}</option>)}
        </select>
        <select className="filter" name="populatedWithinNum" id="populatedWithinNum" onChange={(event) => setSelectedPopulatedWithin(event.target.value)}>
          {populatedWithin.map((populatedWithinNum) => <option key={populatedWithinNum} value={populatedWithinNum}>{populatedWithinNum}</option>)}
        </select>
        <button className="btn btn-outline-primary btn-sm" type="submit" value="Search" accesskey="S" onClick={() => fetchVolcanoes()}>Search</button>
      </div>
      <div 
        className="ag-theme-quartz table" // applying the grid theme
        style={{ width: '100%', height: '500px' }}
      >
        <AgGridReact
          rowData={volcanoes}
          columnDefs={columnDefs}
          onRowClicked={(event) => navigate(`/individualvolcano/${event.data.id}`)}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </Container>
  );
}
