import React, { ChangeEventHandler, FunctionComponent } from 'react';

const FilterRegion: FunctionComponent<{
    handleFilterRegion: ChangeEventHandler<HTMLSelectElement>, 
    selected: string
  }> = ({ handleFilterRegion, selected }) => {
  const regionOptions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  
  return (
    <select className='filter-region-select' name="" id="" onChange={handleFilterRegion}>
      <option id="" value=""></option>
      {
        regionOptions.map(region => <option key={region} id={region}>{region}</option>)
      }
    </select>
  )
}

export default FilterRegion;