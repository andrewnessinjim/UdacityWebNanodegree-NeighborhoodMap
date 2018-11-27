import React from 'react';
import { withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow } from "react-google-maps"
import PlaceInfo from './PlaceInfo';


const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 51.50, lng: 0.08 }}
  >
    {props.places.map(place =>
      <Marker
        key={place.id}
        position={place.location}
        onClick={props.onMarkerClick.bind(null, place.id)}
        animation={props.selectedVenueId === place.id ? window.google.maps.Animation.BOUNCE : null}>
        {(props.selectedVenueId === place.id) &&
          <InfoWindow onCloseClick={props.onCloseClick}>
            <PlaceInfo venueId={place.id} onError={props.onError} />
          </InfoWindow>}
      </Marker>)}
  </GoogleMap>
));

const Map = (props) => {
  return (
    <div className="map-container">
      <MapComponent
        selectedVenueId={props.selectedVenueId}
        onCloseClick={props.onCloseClick}
        places={props.places}
        onMarkerClick={props.onMarkerClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD2xj7Uf3-5r4zfmDqSmgwwiVEH9QhE0Js"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onError={props.onError}
      />
    </div>
  );
}

export default Map;