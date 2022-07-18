import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow, Marker } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { mapStyles } from './MapStyles';

import './Map.css';

const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{ lat: 51.52, lng: -0.108 }}
      defaultOptions={{
        fullscreenControl: false,
        mapTypeControl: false,
        styles: mapStyles,
      }}
    >
      <MarkerClusterer enableRetinaIcons gridSize={20}>
        <Marker position={{ lat: 51.5300666, lng: -0.0781743 }}>
          <InfoWindow>
            <div>
              <p>Rhythmic Excellence</p>
              <a target="_blank" rel="noopener noreferrer" href="https://goo.gl/maps/q1jVjWsgYN32">
                Open in Google Maps
              </a>
            </div>
          </InfoWindow>
        </Marker>
      </MarkerClusterer>
    </GoogleMap>
  ))
);

const MapContainer = ChildComponent => props => (
  <div className="Map">
    <ChildComponent {...props} />
  </div>
);

export const Map = MapContainer(MapComponent);
