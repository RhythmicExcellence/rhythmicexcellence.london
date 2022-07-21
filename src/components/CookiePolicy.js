import React, { useState, useEffect } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import './CookiePolicy.css';

const CookiePolicyComponent = ({ cookies }) => {
  const [cookie, setCookie] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const acceptedCookies = Boolean(cookies.get('Accepted_cookies'));
    setCookie(acceptedCookies);
  }, [cookies]);

  const onAccept = () => {
    setFadeOut(true);

    setTimeout(() => {
      cookies.set('Accepted_cookies', true, { path: '/', maxAge: 86400 * 365 });
      setCookie(true);
    }, 1000);
  };

  return (
    !cookie && (
      <div className={`CookiePolicy${fadeOut ? ' fade-out' : ''}`}>
        <div className="CookiePolicy__notification">
          <div className="CookiePolicy__notification__content">
            <div className="CookiePolicy__notification__content__copy">
              <p className="CookiePolicy__copy">
                To ensure the best experience on our website, we recommend that you allow cookies,
                as described in our <Link to="/legal/cookies">Cookie Policy</Link>.
              </p>
              <p className="actions">
                <button
                  type="button"
                  className="button large light primary accept-cookies"
                  onClick={onAccept}
                >
                  Got it
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

CookiePolicyComponent.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
};

export const CookiePolicy = withCookies(CookiePolicyComponent);
