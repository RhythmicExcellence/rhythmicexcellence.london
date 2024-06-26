import React from 'react';
import { Link } from 'gatsby';
import { Map } from '../components/Map';

import Layout from '../layouts/index';

function CustomerInfo() {
  const zoom = 11;
  const height = 600;
  const apiKey = process.env.GATSBY_GOOGLE_MAPS_API_KEY;

  return (
    <Layout>
      <div className="container">
        <h1>Customer Information</h1>

        <div>
          <h3>
            <Link to="/policies">Club Policies</Link>
          </h3>
          <br />
          <hr />
        </div>
        <div>
          <h3>
            <Link to="/registrations">Registration documents</Link>
          </h3>
          <br />
          <hr />
        </div>
        <div>
          <h3>
            <Link to="/faq">FAQ</Link>
          </h3>
          <br />
          <hr />
        </div>
      </div>
      <div className="container">
        <h2>Where are we?</h2>
      <Map
        isMarkerShown
        zoom={zoom}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: `${height}px` }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
      </div>
    </Layout>
  );
}

export default CustomerInfo;