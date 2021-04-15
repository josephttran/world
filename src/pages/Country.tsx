import React from 'react';
import { useHistory, useParams } from 'react-router';

interface para {
  countryName:string
}

const Country = () => {
  const history = useHistory();
  const {countryName} = useParams<para>();

  return (
    <div>
      <button onClick={() => history.goBack()}>Go Back</button>
      <div>{countryName}</div>
    </div>
  )
}

export default Country;