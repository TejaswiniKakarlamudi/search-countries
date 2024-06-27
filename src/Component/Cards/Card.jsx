import React from 'react';

function Card({ data }) {
  return (
    
      <div className='countryCard' style={{ width: '150px', height:'auto', margin:'15px'}}>
        <img src={data.flags.png} className="card-img-top countryFlag" alt={data.name.common} style={{ width: '80px', height: '80px', objectFit: 'cover' , boxShadow: '0 2px 4px rgba(0,0,0,0.5)'  }}/>
        <h2 className="card-title name" >{data.name.common}</h2>
      </div>
    
  );
}

export default Card;
