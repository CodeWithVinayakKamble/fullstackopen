import CountryToShow from "./CountryToShow"

const Display = ({ search, data, selectedCountry, onSelectCountry }) => {

    if (!search) {
        return null
    };

    if (selectedCountry) {
        return <CountryToShow countryData={selectedCountry} />
    }

    if (data.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (data.length === 0) {
        return <p>No match found</p>
    }

    if (data.length === 1) {
        return <CountryToShow countryData={data[0]} />
    }

    return (
        <div>
            {data.map(country => {
                const { name: { common: countryName } } = country
                return <p key={countryName}>{countryName} <button onClick={() => onSelectCountry(country)} >Show</button></p>
            })}
        </div>
    )
};

export default Display;