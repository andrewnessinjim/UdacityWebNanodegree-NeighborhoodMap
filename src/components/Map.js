import React from 'react';
import { withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow } from "react-google-maps"
import PlaceInfo from './PlaceInfo';

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 51.506729805271924, lng: 0.07301467287201877 }}
  >
    {props.places.map(place =>
      <Marker key={place.id} position={place.location}>
        {place.isOpen &&
          <InfoWindow>
            <PlaceInfo venueId={place.id} />
          </InfoWindow>}
      </Marker>)}
  </GoogleMap>
));

const Map = (props) => {
  return (
    <div className="map-container">
      <MapComponent
        places={props.places}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD2xj7Uf3-5r4zfmDqSmgwwiVEH9QhE0Js"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default Map;