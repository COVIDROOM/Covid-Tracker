import React from 'react';
import './Table.css';

function Table({countries}){
    return (
      <div className="table">
        {countries.map(({country,deaths}) => (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{deaths}</strong>
            </td>
          </tr>
        ))}
      </div>
    );
  }
  
  export default Table;