import Languages from "./Languages";

const CountryToShow = ({ countryData }) => {

    const { name: { common: countryName }, capital, area, languages, flags: { png } } = countryData;

    return (
        <div>
            <h1>{countryName}</h1>
            <p>Capital : {capital}</p>
            <p>Area : {area}</p>
            <h2>Languages</h2>
            <ul>
                <Languages langObj={languages} />
            </ul>
            <img src={png} alt={countryName} width="200" />
        </div >
    )

};

export default CountryToShow;