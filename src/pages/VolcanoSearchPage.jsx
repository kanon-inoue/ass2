import { useEffect, useState } from "react"

const populatedWithin = [5, 10, 30, 100];

export default function VolcanoSearchPage() {
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

  return (
    <div>
      <div>
        <label>Country:</label>
        <select name="country" id="country" onChange={(event) => setSelectedCountry(event.target.value)}>
          {countries.map((countryName) => <option key={countryName} value={countryName}>{countryName}</option>)}
        </select>
        <select name="populatedWithinNum" id="populatedWithinNum" onChange={(event) => setSelectedPopulatedWithin(event.target.value)}>
          {populatedWithin.map((populatedWithinNum) => <option key={populatedWithinNum} value={populatedWithinNum}>{populatedWithinNum}</option>)}
        </select>
        <button type="submit" value="Search" onClick={() => fetchVolcanoes()}>Search</button>
      </div>
      <div>
        <table>
          <tr>
            <td>Name</td>
            <td>Region</td>
            <td>Subregion</td>
          </tr>
          {volcanoes.map((volcano) => {
            return (
              <tr>
                <td>{volcano.name}</td>
                <td>{volcano.region}</td>
                <td>{volcano.subregion}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}
