import React from 'react';
import propTypes from 'prop-types';

import { Hero } from './Hero';
import { Homepage } from './Homepage';
import { MedalCollection } from './MedalCollection';
import { LatestNews } from './LatestNews';
import { Courses } from './Courses';
import { Map } from './Map';
import { ContactUs } from './ContactUs';

export const IndexPage = ({ data, apiKey, height, zoom }) => {
  return (
    <div className="App">
      <Hero />
      <section className="Home__content">
        {data.home && data.home.edges.map(edge => <Homepage key={edge.node.id} node={edge.node} />)}

        <MedalCollection data={data.medals.edges[0].node.frontmatter} />

        <LatestNews edges={data.news.edges} />

        <Courses courses={data.disciplines} />

        <Map
          isMarkerShown
          zoom={zoom}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `${height}px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

        <ContactUs />
      </section>
    </div>
  );
};

IndexPage.propTypes = {
  data: propTypes.any.isRequired,
  apiKey: propTypes.string.isRequired,
  height: propTypes.number.isRequired,
  zoom: propTypes.number.isRequired,
};
