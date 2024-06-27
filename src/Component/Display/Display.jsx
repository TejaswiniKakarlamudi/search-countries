import React, { useEffect, useState } from 'react';

function Display() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const api = 'https://restcountries.com/v3.1/all';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const filteredData = data.filter((country) =>
    country.name.common.toLowerCase().includes(search)
  );

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search for countries"
            onChange={handleOnChange}
            style={{ width: '50%', height: '30px', margin: '1vh', borderRadius: '25px', padding: '10px', border: '1px solid rgba(0,0,0,0.4)' }}
            value={search}
          />
        </div>
      </div>
      <div className="row" style={{ display: 'flex', flexWrap: 'wrap', margin: '2vh 2vw', justifyContent: 'space-around' }}>
        {filteredData.map((country) => (
          <div className="countryCard" key={country.cca3} style={{ width: '150px', height: 'auto', margin: '15px' }}>
            <img
              src={country.flags.png}
              className="card-img-top countryFlag"
              alt={country.name.common}
              style={{ width: '80px', height: '80px', objectFit: 'cover', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
            />
            <h2 className="card-title name">{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;
