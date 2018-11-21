import React, { Component } from 'react';
import venueTestData from '../test_data/venue_detail';
import fourscoreIcon from '../icons/foursquare.png';

class PlaceInfo extends Component {
  state = {
    placeInfo: {}
  }

  componentDidMount() {
    const { name, rating, canonicalUrl, bestPhoto } = venueTestData.response.venue;
    const placeInfo = {
      name: name,
      rating: rating,
      canonicalUrl: canonicalUrl,
      bestPhotoUrl: `${bestPhoto.prefix}150x100${bestPhoto.suffix}`
    }
    this.setState({ placeInfo });
  }

  render() {
    const { name, rating, canonicalUrl, bestPhotoUrl } = this.state.placeInfo;
    return (
      <section className="place-details">
        <h2>{name}</h2>
        <img src={bestPhotoUrl}></img>
        <div className="rating-and-link-container">
          <p><strong>Rating:</strong> {rating}</p>
          <a className="more-details-link" href={canonicalUrl} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
        <img className="fourscore-img" src={fourscoreIcon} alt="Powered By Fourscore"/>
      </section>
    )
  }
}

export default PlaceInfo;