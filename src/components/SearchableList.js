import React from 'react';

const SearchableList = (props) => {
  return (
    <section className={`searchable-list-container${props.listVisible ? " searchable-list-container__visible" : " searchable-list-container__invisible"}`}>
      <h2 id="select_place_label">Select a place:</h2>
      <label htmlFor="input-text-filter" id="input-text-filter-label">Filter Places</label>
      <input
        id="input-text-filter"
        className="input-text-filter"
        type="text"
        placeholder="Filter"
        value={props.filter}
        onChange={props.onFilterChange}
        autoFocus />
      <ul
        className="places-list"
        onClick={props.onListClick}
        role="region"
        aria-live="polite">
        {props.items.map(place => {
          const isVenueSelected = props.selectedVenueId === place.id;
          return (
            <li
              key={place.id}
              className={isVenueSelected ? "selected" : ""}>
              <button venueid={place.id}>{place.name}</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
};

export default SearchableList;