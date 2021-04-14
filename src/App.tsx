import React, { useState, useEffect, ChangeEvent } from 'react';
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
  const [selected, setSelected] = useState("");

  const countriesFields: countryData = {  
    flag: "",
    name: "",
    population: -1,
    region: "",
    capital: ""
  };

  useEffect(() => {
    getCountryDataFiltered(countriesFields)
      .then(filteredData => {
        setData(filteredData)
      });
  }, [])

  const getCountryDataFiltered = async (obj: countryData): Promise<Array<countryData>> => {
    let fields = "";

    for (let key in obj) {
      fields = fields + key + ';';
    }

    const res = await fetch(`https://restcountries.eu/rest/v2/all?fields=${fields}`);
    const json = await res.json();
    return json;
  }

  const handleCountriesSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getCountryDataFiltered(countriesFields)
    .then(filteredData => {
      const countries = filteredData.filter(countryData => {
        return countryData.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      console.log(countries);
      setData(countries);
    });
  }

  const handleFilterRegion = async (event: ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    let res;

    if (region === "") {
      res = await fetch('https://restcountries.eu/rest/v2/all');
    } else {
      res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);  
    }

    const json = await res.json();
    setData(json);        
  }

  return (
    <Layout handleSearch={handleCountriesSearch} handleFilterRegion={handleFilterRegion} selected={selected}>
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
