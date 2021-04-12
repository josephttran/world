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
    getAllCountryData();
  }, [])

  const getAllCountryData = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const newData: countryData[] = json.map((obj: any) => {
      const {flag,name,population,region,capital} = obj;
      return {flag,name,population,region,capital};
    });

    setData(newData)
    // console.log(json);
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
