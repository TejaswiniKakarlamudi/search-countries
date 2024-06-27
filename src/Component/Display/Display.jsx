import React, { useEffect, useState } from 'react';
import Card from '../Cards/Card';
import _ from 'lodash'; 

// https://restcountries.com/v3.1/all
function Display() {
    const [data,setData] = useState([]);
    const [onSearch, setOnSearch] = useState(false);
    const [searchData,setSearchedData] = useState([]);
    const [search,setSearch] = useState('');
    const api = 'https://restcountries.com/v3.1/all';

    const getData = async (url) =>{

        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result.length);
            return result;   
        } catch (error) {
            console.log(error);
            return [];
        }

    };

    useEffect(() =>{
      async function fetchData(){
        const required = await getData(api);
        setData(required);
        
      };

      fetchData();
     
    },[]);

    const debouncedSearch = _.debounce((query) => {
        const filteredData = data.filter((country) =>
          country.name.common.toLowerCase().includes(query)
        );
        setSearchedData(filteredData);
        setOnSearch(true);
      }, 300);

     function handleOnchange(event) {
        setOnSearch(true);
        const query = event.target.value.toLowerCase();
        setSearch( event.target.value);
        debouncedSearch(query);
        setTimeout(() => {}, 300); 
        console.log(event.target.value);
    };
    
  return (
    <div className="container mt-4">
    <div className="row mb-4">
      <div className="col">
        <input
          type="text"
          className="form-control"
          placeholder="Search for countries"
          onChange={handleOnchange}
          style={{width:'50%', height:'30px', margin:'1vh', borderRadius:'25px', padding:'10px', border:'1px solid rgba(0,0,0,0.4)'}}
          value={search}
        />
      </div>
    </div>
    <div className="row " style={{ display: 'flex', flexWrap: 'wrap', margin: '2vh 2vw', justifyContent: 'space-around' }}>
      {!onSearch ? (
            data.map((country) => (
                <Card data={country}  key={country.cca3} />
            ))
        ) : (
            searchData.map((country) => (
                <Card data={country}  key={country.cca3}  />
            ))
        )
        } 
    </div>
  </div>
  )
}

export default Display;


