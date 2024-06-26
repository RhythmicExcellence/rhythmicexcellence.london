import React from 'react';

import Layout from '../layouts/index';

import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <Layout>
      <div className="NotFoundPage">
        <div className="container">
          <header>
            <h2>Oops!</h2>
            <span>404 Page Not Found</span>
          </header>
          <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        </div>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
