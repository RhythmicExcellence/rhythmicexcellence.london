import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layouts/index';

function CustomerInfo() {
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
    </Layout>
  );
}

export default CustomerInfo;