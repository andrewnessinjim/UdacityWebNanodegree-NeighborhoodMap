import React, { Component } from 'react';
import venueTestData from '../test_data/venue_detail';
import fourscoreIcon from '../icons/foursquare.png';
import config from '../config';

class PlaceInfo extends Component {
  state = {
    placeInfo: {}
  }

  extractRequiredDetails(jsonResponse) {
    const { name, rating, canonicalUrl, bestPhoto } = jsonResponse.response.venue;
    const placeInfo = {
      name: name,
      rating: rating,
      canonicalUrl: canonicalUrl,
      bestPhotoUrl: `${bestPhoto.prefix}150x100${bestPhoto.suffix}`
    }
    this.setState({ placeInfo });
  }

  componentDidMount() {
    if (config.stubbed) {
      this.extractRequiredDetails(venueTestData);
    } else {
      fetch(`https://api.foursquare.com/v2/venues/${this.props.venueId}?client_id=YHR2IVO0ARLPWGNCAJJXHREDICGKN4RU1QRPUQZGP52FXQVQ&client_secret=P0KAN4DDE4XLWLI3RBUT02YLZAR4REDDGGEZLAQBRUBUX3A1&v=20180323`)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              this.extractRequiredDetails(data);
            });
          } else {
            this.props.onError("Unable to contact servers! Please check your internet connection and retry");
          }
        }).catch(() => {
          this.props.onError("Unable to contact servers! Please check your internet connection and retry");
        });
    }
  }

  render() {
    const { name, rating, canonicalUrl, bestPhotoUrl } = this.state.placeInfo;
    return (
      <section className="place-details" role="dialog" aria-labelledby="place_info_heading">
        <h2 id="place_info_heading">{name}</h2>
        <img src={bestPhotoUrl} alt={name}></img>
        <div className="rating-and-link-container">
          <p><strong>Rating:</strong> {rating}</p>
          <a className="more-details-link" href={canonicalUrl} target="_blank" rel="noopener noreferrer">More Info</a>
        </div>
        <img className="fourscore-img" src={fourscoreIcon} alt="Powered By Fourscore" />
      </section>
    )
  }
}

export default PlaceInfo;