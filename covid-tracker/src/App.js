import './App.css';
import { useState } from 'react';
import {FormControl,Select,MenuItem} from '@material-ui/core';

function App() {
  const[countries,setCountries]=useState(['worldWide','SriLanka','India','UK'])
  return (
    <div className="app">
      <div className="app_header">
      <h1>Covid19</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value="dummy">
          {countries.map(country=><MenuItem value={country}>{country}</MenuItem>)}
        </Select>
      </FormControl>
      </div>  
    </div>
  );
}

export default App;
