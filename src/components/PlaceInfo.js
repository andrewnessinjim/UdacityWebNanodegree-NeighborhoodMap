import React, { Component } from 'react';
import venueTestData from '../test_data/venue_detail'

class PlaceInfo extends Component {
  state = {
    placeInfo: {}
  }

  componentDidMount() {
    const placeInfo = {
      name: venueTestData.response.venue.name,
      rating: venueTestData.response.venue.rating,
      canonicalUrl: venueTestData.response.venue.canonicalUrl
    }
    this.setState({ placeInfo });
  }

  render() {
    const {name, rating, canonicalUrl} = this.state.placeInfo;
    return (
      <section>
        <h3>{name}</h3>
        <p>Rating: {rating}</p>
        <a href={canonicalUrl} target="_blank" rel="noopener noreferrer">More Details</a>
      </section>
    )
  }
}

export default PlaceInfo;