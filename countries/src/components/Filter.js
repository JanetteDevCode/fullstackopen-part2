import React from 'react';

const Filter = ({ filter, changeFilter }) => {
  return (
    <div>
      <strong>find countries </strong> <input value={filter} onChange={changeFilter} />
    </div>
  );
};

export default Filter;