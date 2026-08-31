import { useState, useEffect } from "react";
import countriesServices from "./services/service";
import SearchBar from "./components/SearchBar";
import Display from "./components/Display"


const App = () => {

  const [search, setSearch] = useState('');
  const [countriesData, setCountriesData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null)

  const searchHandler = (event) => {
    setSearch(event.target.value);
    setSelectedCountry(null)
  }

  useEffect(() => {
    countriesServices
      .getAll()
      .then(data => {
        setCountriesData(data)
      })
  }, [])

  let countriesToShow = countriesData.filter(countries => {
    const { name: { common: countryName } } = countries;
    return countryName.toLowerCase().includes(search.toLowerCase());
  });

  const excatMatch = countriesToShow.find(country => {
    const { name: { common: countryName } } = country;
    return countryName.toLowerCase() === search.toLowerCase();
  })

  if (excatMatch) {
    countriesToShow = [excatMatch]
  }

  return (
    <div>
      <SearchBar value={search} searchHandler={searchHandler} />
      <Display search={search} data={countriesToShow} selectedCountry={selectedCountry} onSelectCountry={setSelectedCountry} />
    </div>
  )
};

export default App;