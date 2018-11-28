import React, { Component } from 'react';
import SearchableList from './SearchableList';
import testData from '../test_data/sights_in_london';
import Map from './Map';
import config from '../config';

const interestedKeys = ["ArrowDown", "ArrowUp", "Home", "End"];
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
      this.extractRequiredDetails(testData);

    } else {
      fetch('https://api.foursquare.com/v2/venues/explore?client_id=YHR2IVO0ARLPWGNCAJJXHREDICGKN4RU1QRPUQZGP52FXQVQ&client_secret=P0KAN4DDE4XLWLI3RBUT02YLZAR4REDDGGEZLAQBRUBUX3A1&v=20180323&limit=10&ll=51.50,0.08&section=sights')
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.extractRequiredDetails(data)
            })
          } else {
            this.props.onError("Unable to contact servers! Please check your internet connection and retry");
          }
        })
        .catch(() => {
          this.props.onError("Unable to contact servers! Please check your internet connection and retry");
        });
    }

  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
      selectedVenue: ""
    })
  }

  onListClick = (event) => {
    this.setState({ selectedVenue: event.target.getAttribute('venueid') });
  }

  setSelectedVenue = (selectedVenue) => {
    this.setState({ selectedVenue });
  }

  onCloseClick = () => {
    this.setState({ selectedVenue: "" });
  }

  onMarkerClick = (clickedVenue) => {
    this.setState({ selectedVenue: clickedVenue })
  }

  onListFocus = () => {
    if (this.state.places[0]) {
      this.setState({ selectedVenue: this.state.places[0].id });
    }
  }

  onKeyDown = ({ key }) => {
    const { places, selectedVenue } = this.state;

    const currentVenueIndex = places.findIndex(place => place.id === selectedVenue);
    if (key === 'ArrowDown') {
      if (currentVenueIndex < places.length - 2) {
        this.setState({ selectedVenue: places[currentVenueIndex + 1].id });
      }
    } else if (key === 'ArrowUp') {
      if (currentVenueIndex >= 1) {
        this.setState({ selectedVenue: places[currentVenueIndex - 1].id });
      }
    } else if (key === 'Home') {
      if (places[0]) {
        this.setState({ selectedVenue: places[0].id });
      }
    } else if (key === 'End') {
      if (places[places.length - 1]) {
        this.setState({selectedVenue: places[places.length - 1].id});
      }
    }
  }

  render() {
    const filteredPlaces = this.state.places
      .filter(place => place.name.match(new RegExp(this.state.filter, "i")));
    return (
      <main className="list-map-container">
        <SearchableList
          items={filteredPlaces}
          listVisible={this.props.listVisible}
          onFilterChange={this.handleFilterChange}
          filter={this.state.filter}
          onListClick={this.onListClick}
          selectedVenueId={this.state.selectedVenue}
          setSelectedVenue={this.setSelectedVenue}
          onFocus={this.onListFocus}
          interestedKeys={interestedKeys}
          onKeyDown={this.onKeyDown}
        />
        <Map
          places={filteredPlaces}
          selectedVenueId={this.state.selectedVenue}
          onCloseClick={this.onCloseClick}
          onMarkerClick={this.onMarkerClick}
          onError={this.props.onError}
        />
      </main>
    );
  }
}

export default ListAndMapContainer;