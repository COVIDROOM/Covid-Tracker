import { useState,useEffect} from 'react';
import {FormControl,Select,MenuItem,Card,CardContent,Avatar} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map'; 
import Table from './components/Table';
import { sortData } from './components/Util';
import img1 from './img/11.jpg'
import './App.css';

import 'leaflet/dist/leaflet.css';

function App() {
  const[country,setCountry]=useState('worldwide');
  const[countries,setCountries]=useState([]);//how to write variable in reacct -useState
  const[countryInfo,setCountryInfo]=useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);



  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
        <Avatar alt="img1" src={img1} />
          <h1>COVID-19 Tracker</h1>
         
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_status">
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            // cases={prettyPrintStat(countryInfo.todayCases)}
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <div className="app_information">
            <h3>Deaths by Country</h3>
            <Table countries={tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

  
//   useEffect(()=>{
//     fetch("https://disease.sh/v3/covid-19/all")
//    .then(response =>response.json())
//    .then((data) => {
//         setCountryInfo(data);
//       });
//   },[]);
 

 
//   useEffect(()=>{                          //runs a piece of code,based on given condition
//     //the code inside here will run once
//     //when the component loads and not again
//     //async-->send a request,wait for it,do something
//     const getCountriesData=async()=>{
//       fetch("https://disease.sh/v3/covid-19/countries")
//       .then((response)=> response.json())
//       .then((data)=>{
//         const countries=data.map((item)=>(
//           {
//             name:item.country,
//             value: item.countryInfo.iso2
              
//           })
//         );
//         let sortedData = sortData(data);
//         setTableData(sortedData);
//         setCountries(countries);
//       });
//     };
//     getCountriesData()
//   },[]);


//   const onCountryChange= async (event)=>{
//     const countryCode=event.target.value;
//     //setCountry(countryCode);
//     const url= countryCode === "Worldwide"
//     ?  "https://disease.sh/v3/covid-19/all"
//     :   `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
//     await fetch(url)
//     .then(response =>response.json())
//     .then((data) =>{
//       setCountry( countryCode);
//       setCountryInfo(data);
//     });
//   };

//   return (
//     <div className="app">   
//       <div className="app_left">
//         <div className="app_header">     
//           <FormControl className="app_dropdown">
//             <Select 
//             variant="outlined" 
//             value={country} 
//             onChange={onCountryChange}
//             >
//               <MenuItem value="worldwide">Worldwide</MenuItem>
//               {countries.map(country=>
//               <MenuItem value={country.value}>{country.name}</MenuItem>)
//               }
//             </Select>
//           </FormControl>
//           < Typography color="primary" variant="h2" display="inline">
//            Covid-19
//           </Typography>   
//       </div>  
//         <div className="app_status">
//         <InfoBox
//             title="cases"
//             cases={countryInfo.todayCases}
//             total={countryInfo.cases}
//           />
//         <InfoBox
        
//           title="Recovered"
          
//           cases={countryInfo.todayRecovered}
//           total={countryInfo.recovered}
//         />
//         <InfoBox
          
//           title="Deaths"
//           total={countryInfo.deaths}
//           cases={countryInfo.todayDeaths}
         
//         />
//         </div>
//         <Map  center={mapCenter} zoom={mapZoom}/>

//       </div>
//       <Card className="app_right">
//         <CardContent>
//         <h3>Deaths By Country </h3>
//           <Table countries={tableData}/>
         
//           <h3>Live Cases</h3>

//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default App;
