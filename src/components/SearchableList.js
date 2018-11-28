import React from 'react';

const SearchableList = (props) => {

  function onKeyDown(event) {
    if (props.interestedKeys && props.interestedKeys.includes(event.key)) {
      event.preventDefault();
      props.onKeyDown(event);
    }
  }

  return (
    <section className={`searchable-list-container${props.listVisible ? " searchable-list-container__visible" : " searchable-list-container__invisible"}`}>
      <span id="select_place_label">Select a place:</span>
      <label htmlFor="input-text-filter" id="input-text-filter-label">Filter Places</label>
      <input
        id="input-text-filter"
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
        onFocus={props.onFocus}>
        {props.items.map(place => {
          const isVenueSelected = props.selectedVenueId === place.id;
          return (
            <li
              key={place.id}
              venueid={place.id}
              id={place.id}
              className={isVenueSelected ? "selected" : ""}
              role="option"
              aria-selected={isVenueSelected ? "true" : "false"}>
              {place.name}
            </li>
          )
        })}
      </ul>
    </section>
  )
};

export default SearchableList;