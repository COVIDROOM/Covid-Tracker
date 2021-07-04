import { useState,useEffect} from 'react';
import {FormControl,Select,MenuItem,Card,CardContent} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map'; 
import './App.css';

function App() {

  const[countries,setCountries]=useState([]);//how to write variable in reacct -useState
  const[country,setCountry]=useState('worldwide');
  const[countryInfo,setCountryInfo]=useState({});


  
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
   .then(response =>response.json())
   .then((data) => {
        setCountryInfo(data);
      });
  },[]);
 

 
  useEffect(()=>{                          //runs a piece of code,based on given condition
    //the code inside here will run once
    //when the component loads and not again
    //async-->send a request,wait for it,do something
    const getCountriesData=async()=>{
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=>{
        const countries=data.map((item)=>(
          {
            name:item.country,
            value: item.countryInfo.iso2
              
          })
        );
        setCountries(countries)
      });
    };
    getCountriesData()
  },[]);


  const onCountryChange= async (event)=>{
    const countryCode=event.target.value;
    //setCountry(countryCode);
    const url= countryCode === "Worldwide"
    ?  "https://disease.sh/v3/covid-19/all"
    :   `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response =>response.json())
    .then((data) =>{
      setCountry( countryCode);
      setCountryInfo(data);
    });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
        <h1>Covid-19</h1>
        <FormControl className="app_dropdown">
          <Select 
          variant="outlined" 
          value={country} 
          onChange={onCountryChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country=>
            <MenuItem value={country.value}>{country.name}</MenuItem>)
            }
          </Select>
        </FormControl>
        </div>  
        <div className="app_status">
        <InfoBox
            title="cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
          
            title="Recovered"
           
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
           
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map/>

      </div>
      <Card className="app_right">
        <CardContent>
          <h3>World wide New Case </h3>
          <h3>Live Cases</h3>

        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
