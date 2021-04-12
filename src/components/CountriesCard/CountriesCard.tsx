import React, { FunctionComponent } from 'react';
import './CountriesCard.css';

interface CountriesCardProps {
  flagUrl: string;
  countryName: string;
  population: number;
  region: string;
  capital: string;
}

const CountriesCard: FunctionComponent<CountriesCardProps> = ({ flagUrl, countryName, population, region, capital }) => {
  return (
    <div className='card'>
      <img className='flag' src={flagUrl} alt={countryName}/>
      <div className='country'>{countryName}</div>
      <div className='population'><span>Population:</span> {population}</div>
      <div className='region'><span>Region:</span> {region}</div>
      <div className='capital'><span>Capital:</span> {capital}</div>
    </div>
  )
}

export default CountriesCard;