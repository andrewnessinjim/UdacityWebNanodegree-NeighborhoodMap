import React from 'react';

const SearchableList = (props) => {
  function onKeyDown(event) {
    event.preventDefault();
    console.log(event);
  }

  return (
    <section className={`searchable-list-container${props.listVisible ? " searchable-list-container__visible" : " searchable-list-container__invisible"}`}>
      <span id="select_place_label">Select a place:</span>
      <input
        className="input-text-filter"
        type="text"
        placeholder="Filter"
        value={props.filter}
        onChange={props.onFilterChange} />
      <ul
        className="places-list"
        onClick={props.onListClick}
        role="listbox"
        tabIndex="0"
        aria-labelledby="select_place_label"
        onKeyDown={onKeyDown}>
        {props.items.map(place => (
          <li
            key={place.id}
            venueid={place.id}
            id={place.id}
            className={props.selectedVenueId === place.id ? "selected" : ""}
            role="option"
            aria-selected={props.selectedVenueId === place.id ? "true" : "false"}>
            {place.name}
          </li>
        ))}
      </ul>
    </section>
  )
};

export default SearchableList;