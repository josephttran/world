import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import CountriesCard from '../components/CountriesCard/CountriesCard';
import FilterRegion from '../components/FilterRegion/FilterRegion';
import SearchInput from '../components/SearchInput/SearchInput';
import './Countries.css';

interface countryData {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

const Countries = () => {
  const [data, setData] = useState<countryData[]>([]);
  const [selected, setSelected] = useState("Filter by Region");

  const countriesFieldsMemo: countryData = useMemo(() => {
    const countriesFields: countryData = {
      flag: "",
      name: "",
      population: -1,
      region: "",
      capital: ""
    }    
    return countriesFields;
  }, []);

  useEffect(() => {
    (async () => {
      const filteredData = await getCountryDataFiltered(countriesFieldsMemo);
      setData(filteredData);
    })();
  }, [countriesFieldsMemo])

  const getCountryDataFiltered = async (obj: countryData): Promise<Array<countryData>> => {
    let fields = "";

    for (let key in obj) {
      fields = fields + key + ',';
    }

    const res = await fetch(`https://restcountries.com/v2/all?fields=${fields}`);
    const json = await res.json();
    return json;
  }

  const handleCountriesSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    if (selected === "Filter by Region") {
      getCountryDataFiltered(countriesFieldsMemo)
      .then(filteredData => {
        const countries = filteredData.filter(countryData => {
          return countryData.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        setData(countries);
      });      
    } else {
      const res = await fetch(`https://restcountries.com/v2/region/${selected}`);
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

    if (region === "Filter by Region") {
      res = await fetch('https://restcountries.com/v2/all');
    } else {
      res = await fetch(`https://restcountries.com/v2/region/${region}`);  
    }
    
    const json = await res.json();
    setData(json);    
    setSelected(region);
  }
  
  return (
    <div>
      <div className='filter-container'>
        <div className='search'>
          <SearchInput handleSearch={handleCountriesSearch} />
        </div>
        <div className='filter'>
          <FilterRegion handleFilterRegion={handleFilterRegion} selected={selected}/>
        </div>
      </div>
      <div className="countries">
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
      </div>
    </div>
  )
}

export default Countries;