import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './Country.css';

interface countryNameParam {
  countryName:string
}

interface country {
  flag: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string;
  currencies: Array<{ code: string, name: string, symbol: string }>;
  languages: Array<{iso639_1: string, iso639_2: string, name: string, nativeName: string}>
  borders: Array<string>
}

const Country = () => {
  const history = useHistory();
  const {countryName} = useParams<countryNameParam>();
  const [countryData, setCountryData] = useState<Array<country>>([]);

  useEffect(() => {
    async function getAndSetCountryData() {
      const data = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
      const json = await data.json();
      setCountryData(json);
    }

    getAndSetCountryData();
  }, [countryName]);

  return (
    <div className='country-container'>
      <button className="btn-previous" onClick={() => history.goBack()}>
        &lt;-  Back
      </button>

      {
        countryData.length === 0 
        ? " LOADING"
        : <div className='country-main'>
            <img className='country-flag' src={countryData[0].flag} alt={countryName}/>
            <h2 className='country-header'>{countryData[0].name}</h2>
            <dl className='country-info-container info-one'>
              <dt>Native Name: </dt><dd>{countryData[0].nativeName}</dd>
              <dt>Population: </dt><dd>{countryData[0].population}</dd>
              <dt>Region: </dt><dd>{countryData[0].region}</dd>
              <dt>Sub Region: </dt><dd>{countryData[0].subregion}</dd>
              <dt>Capital: </dt> <dd>{countryData[0].capital}</dd>
            </dl>
            <dl className='country-info-container info-two'>
              <dt>Top Level Domain: </dt><dd>{countryData[0].topLevelDomain}</dd>
              <dt>Currencies: </dt><dd>{countryData[0].currencies.length === 0 ? 'none' : countryData[0].currencies[0].name}</dd>
              <dt>Languages: </dt><dd>{countryData[0].languages.length === 0 ? 'none' : countryData[0].languages[0].name}</dd>          
            </dl>
            <dl className='country-info-container country-borders'><dt>Borders:</dt> 
            {
              countryData[0].borders.length === 0 
              ? <dd>{'NONE'}</dd>
              : <dd>{countryData[0].borders.join(', ')}</dd>
            }
            </dl>
          </div>
      }
    </div>
  )
}

export default Country;