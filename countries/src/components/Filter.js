import React from 'react';

const Filter = ({ filter, changeFilter }) => {
  return (
    <div>
      find countries <input value={filter} onChange={changeFilter} />
    </div>
  );
};

export default Filter;