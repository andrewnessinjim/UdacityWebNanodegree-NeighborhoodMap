import React from 'react';

const SearchableList = (props) => {

  function onKeyDown(event) {
    event.preventDefault();
    const currentVenueIndex = props.items.findIndex(place => place.id === props.selectedVenueId)
    if (event.key === 'ArrowDown') {
      if (currentVenueIndex < props.items.length - 2) {
        props.setSelectedVenue(props.items[currentVenueIndex + 1].id);
      }
    } else if (event.key === 'ArrowUp') {
      if (currentVenueIndex >= 1) {
        props.setSelectedVenue(props.items[currentVenueIndex - 1].id);
      }
    } else if (event.key === 'Home') {
      if (props.items[0]) {
        props.setSelectedVenue(props.items[0].id);
      }
    } else if (event.key === 'End') {
      if (props.items[props.items.length-1]) {
        props.setSelectedVenue(props.items[props.items.length-1].id);
      }
    }
  }

  function handleFocus() {
    props.setSelectedVenue(props.items[0].id);
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
        onKeyDown={onKeyDown}
        aria-activedescendant={props.selectedVenueId ? props.selectedVenueId : null}
        onFocus={handleFocus}>
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