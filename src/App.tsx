import React, { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import CountriesCard from './components/CountriesCard/CountriesCard';

interface countryData {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

function App() {
  const [data, setData] = useState<countryData[]>([]);

  useEffect(() => {
    const countriesFields: countryData = {  
      flag: "",
      name: "",
      population: -1,
      region: "",
      capital: ""
    };

    getCountryDataFiltered(countriesFields)
      .then(filteredData => {
        console.log(filteredData);
        setData(filteredData)
      });
  }, [])

  const getCountryDataFiltered = async (obj: countryData): Promise<Array<countryData>> => {
    let fields = "fields=";

    for (let key in obj) {
      fields = fields + key + ';';
    }

    const res = await fetch(`https://restcountries.eu/rest/v2/all?${fields}`);
    const json = await res.json();
    return json;
  }
  
  return (
    <Layout>
        {
          data.length === 0 
          ? 'No Countries' 
          : data.map(countryData => {
              return <CountriesCard 
                key={countryData.name} 
                flagUrl={countryData.flag} 
                countryName={countryData.name} 
                capital={countryData.capital} 
                population={countryData.population} 
                region={countryData.region} />
          })
        }
    </Layout>
  );
}

export default App;
