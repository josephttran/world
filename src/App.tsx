import React from 'react';
import Layout from './components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Country from './pages/Country';
import Countries from './pages/Countries';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/world' component={Countries} />
        <Route path='/world/country/:countryName' component={Country} />
        <Route path='*'>
          No Match 404
        </Route>        
      </Switch>
    </Layout>
  );
}

export default App;
