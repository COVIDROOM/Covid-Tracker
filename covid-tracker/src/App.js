import { useState,useEffect} from 'react';
import {FormControl,Select,MenuItem} from '@material-ui/core';
import './App.css';

function App() {
  const[countries,setCountries]=useState([]);  //how to write variable in reacct -useState
  useEffect(()=>{                          //runs a piece of code,based on given condition
    //the code inside here will run once
    //when the component loads and not again
    //async-->send a request,wait for it,do something
    const getCountriesData=async()=>{
      fetch("https://corona.lmao.ninja/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=>{
        const countries=data.map((item)=>(
          {
            name:item.country,
            value: item.countryInfo.iso2
              
          })
        );
        setCountries(countries)
      })
    }
    getCountriesData()
  },[]);

  return (
    <div className="app">
      <div className="app_header">
      <h1>Covid19</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value="dummy">
          {countries.map(country=>
          <MenuItem value={country.value}>{country.name}</MenuItem>)
          }
        </Select>
      </FormControl>
      </div>  
    </div>
  );
}

export default App;
