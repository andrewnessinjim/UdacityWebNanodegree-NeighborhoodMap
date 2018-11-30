import React, { Component } from 'react';
import SearchableList from './SearchableList';
import testData from '../test_data/sights_in_london';
import Map from './Map';
import config from '../generated/config';
import { ERROR_MESSAGES } from './ErrorPanel';
import ErrorBoundary from './ErrorBoundary';

class ListAndMapContainer extends Component {
  state = {
    places: [],
    filter: "",
    selectedVenue: ""
  }

  extractRequiredDetails(jsonResponse) {
    const places = jsonResponse.response.groups
      .find(item => item.type === "Recommended Places")
      .items
      .map(place => ({
        name: place.venue.name,
        id: place.venue.id,
        location: {
          lat: place.venue.location.lat,
          lng: place.venue.location.lng
        }
      }));

    this.setState({ places });
  }

  componentWillMount() {

    if (config.stubbed) {
      //If running in stubbed mode, use hardcoded test data
      this.extractRequiredDetails(testData);

    } else {
      fetch('https://api.foursquare.com/v2/venues/explore?client_id=YHR2IVO0ARLPWGNCAJJXHREDICGKN4RU1QRPUQZGP52FXQVQ&client_secret=P0KAN4DDE4XLWLI3RBUT02YLZAR4REDDGGEZLAQBRUBUX3A1&v=20180323&limit=10&ll=51.50,0.08&section=sights')
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.extractRequiredDetails(data)
            })
          } else { //Means there was an error when making the request
            this.props.onError(ERROR_MESSAGES.NETWORK_ERROR_MESSAGE);
          }
        })
        .catch(() => {
          this.props.onError(ERROR_MESSAGES.NETWORK_ERROR_MESSAGE);
        });
    }

  }

  onFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
      selectedVenue: ""
    })
  }

  onListClick = (event) => {
    //update selectedVenue state with the target's venueid. Target's venueid is when rendering it
    this.setState({ selectedVenue: event.target.getAttribute('venueid') });
  }

  onCloseClick = () => {
    //Clear selectedVenue when the InfoWindow is closed
    this.setState({ selectedVenue: "" });
  }

  onMarkerClick = (clickedVenue) => {
    //venue id is set on the marker as an attribute. Same id is returned when a marker is clicked.
    this.setState({ selectedVenue: clickedVenue })
  }

  render() {
    //Render places only after filtering based on the filter query
    const filteredPlaces = this.state.places
      .filter(place => place.name.match(new RegExp(this.state.filter, "i")));

    return (
      <main className="list-map-container">
        <SearchableList
          items={filteredPlaces}
          listVisible={this.props.listVisible}
          onFilterChange={this.onFilterChange}
          filter={this.state.filter}
          onListClick={this.onListClick}
          selectedVenueId={this.state.selectedVenue}
        />
        <ErrorBoundary>
          <Map
            places={filteredPlaces}
            selectedVenueId={this.state.selectedVenue}
            onCloseClick={this.onCloseClick}
            onMarkerClick={this.onMarkerClick}
            onError={this.props.onError}
          />
        </ErrorBoundary>
      </main>
    );
  }
}

export default ListAndMapContainer;