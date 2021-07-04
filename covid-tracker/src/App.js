import { useState,useEffect} from 'react';
import {FormControl,Select,MenuItem} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import './App.css';

function App() {
  const[countries,setCountries]=useState([]);  //how to write variable in reacct -useState
  const[country,setCountry]=useState('worldwide');
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

  const onCountryChange=(event) =>{
    const countryCode=event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app_header">
      <h1>Covid-19</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map(country=>
          <MenuItem value={country.value}>{country.name}</MenuItem>)
          }
        </Select>
      </FormControl>
      </div>  
      <div className="app_status">
        <InfoBox title="Coronavirus Cases" total={4000}  cases={500}/>
        <InfoBox title="Recovered"  total={700} cases={4000}/>
        <InfoBox title="Deaths" total={300} cases={3000}/>
      </div>
    </div>
  );
}

export default App;
