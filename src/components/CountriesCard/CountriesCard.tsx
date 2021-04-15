import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import './CountriesCard.css';

interface CountriesCardProps {
  flagUrl: string;
  countryName: string;
  population: number;
  region: string;
  capital: string;
}

const CountriesCard: FunctionComponent<CountriesCardProps> = ({ flagUrl, countryName, population, region, capital }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/world/country/${countryName}`);
  }

  return (
    <div className='card' onClick={handleClick}>
      <img className='flag' src={flagUrl} alt={countryName}/>
      <div className='country'>{countryName}</div>
      <div className='population'><span>Population:</span> {population}</div>
      <div className='region'><span>Region:</span> {region}</div>
      <div className='capital'><span>Capital:</span> {capital}</div>
    </div>
  )
}

export default CountriesCard;