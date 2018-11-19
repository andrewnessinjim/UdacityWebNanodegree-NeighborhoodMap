import React from 'react';

const SearchableList = (props) => (
  <section className={`searchable-list-container${props.listVisible ? " searchable-list-container__visible" : " searchable-list-container__invisible"}`}>
    <input
      className="input-text-filter"
      type="text"
      placeholder="Filter"
      value={props.filter}
      onChange={props.onFilterChange}/>
    <ul
      className="places-list"
    >
      {props.items.map(place => (<li key={place.id}>{place.name}</li>))}
    </ul>
  </section>
);

export default SearchableList;