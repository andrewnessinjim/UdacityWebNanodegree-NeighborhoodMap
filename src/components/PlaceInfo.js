import React, { Component } from 'react';
import venueTestData from '../test_data/venue_detail'

class PlaceInfo extends Component {
  state = {
    placeInfo: {}
  }

  componentDidMount() {
    const {name, rating, canonicalUrl, bestPhoto} = venueTestData.response.venue;
    const placeInfo = {
      name: name,
      rating: rating,
      canonicalUrl: canonicalUrl,
      bestPhotoUrl: `${bestPhoto.prefix}200x150${bestPhoto.suffix}`
    }
    this.setState({ placeInfo });
  }

  render() {
    const {name, rating, canonicalUrl, bestPhotoUrl} = this.state.placeInfo;
    return (
      <section>
        <h3>{name}</h3>
        <img src={bestPhotoUrl}></img>
        <p>Rating: {rating}</p>
        <a href={canonicalUrl} target="_blank" rel="noopener noreferrer">More Details</a>
      </section>
    )
  }
}

export default PlaceInfo;