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
      });// eslint-disable-next-line
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

  const handleCountriesSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    if (selected === "") {
      getCountryDataFiltered(countriesFields)
      .then(filteredData => {
        const countries = filteredData.filter(countryData => {
          return countryData.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setData(countries);
      });      
    } else {
      const res = await fetch(`https://restcountries.eu/rest/v2/region/${selected}`);
      const json = await res.json();
      let newData: Array<countryData> = json.map((countryData:any) => {
        const { flag, name, population, region, capital } = countryData;
        return { flag, name, population, region, capital };
      })
      .filter((countryData: countryData) => countryData.name.toLowerCase().includes(searchValue.toLowerCase()));

      setData(newData);
    }
  }

  const handleFilterRegion = async (event: ChangeEvent<HTMLSelectElement>) => {
    const region = event.target.value;
    let res;

    if (region === "") {
      res = await fetch('https://restcountries.eu/rest/v2/all');
    } else {
      res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);  
      setSelected(region);
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
