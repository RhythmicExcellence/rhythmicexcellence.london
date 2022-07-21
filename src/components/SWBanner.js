import React, { useEffect, useState } from 'react';

import './SWBanner.css';

const windowGlobal = typeof window !== 'undefined' && window;

export const SWBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const activate = () => {
      windowGlobal.navigator.serviceWorker.ready.then(reg => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;

          newWorker.addEventListener('statechange', () => {
            switch (newWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  // new update available
                  showUpdateBar();
                }

                // No update available
                break;

              default:
                break;
            }
          });
        });
      });
    };

    if (windowGlobal['navigator'] && 'serviceWorker' in windowGlobal['navigator']) {
      activate();
    }
  }, []);

  const reload = () => {
    windowGlobal.location.reload();
  };

  const showUpdateBar = () => {
    setShow(true);
  };

  return (
    <div className={`SWBanner ${show ? ' show' : ''}`}>
      {show && (
        <div className="container">
          A new version of RhythmicExcellence is available. Click{' '}
          <span
            tabIndex="-1"
            role="link"
            className="click-here"
            onClick={reload}
            onKeyDown={reload}
          >
            here
          </span>{' '}
          to update.
        </div>
      )}
    </div>
  );
};
