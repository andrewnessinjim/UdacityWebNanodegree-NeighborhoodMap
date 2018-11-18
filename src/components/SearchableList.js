import React from 'react';

const SearchableList = (props) => (
  <ul>
    {props.items.map(place => (<li key={place.id}>{place.name}</li>))}
  </ul>
);

export default SearchableList;