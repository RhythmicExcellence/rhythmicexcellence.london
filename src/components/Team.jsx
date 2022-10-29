import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import { IconClose } from '../icons';
import './Team.css';

export function TeamMember({
  name,
  id,
  content,
  titles,
  picture,
  slug,
  active,
  show,
  onActive,
  onDismiss,
}) {
  /* eslint-disable react/no-danger */
  return (
    <div className={`TeamMember ${show ? 'show' : ''} ${active ? 'active' : ''}`}>
      <div
        role="button"
        aria-label="team member"
        tabIndex="-1"
        className={active ? 'TeamMember__background visible' : 'TeamMember__background'}
        onClick={() => onDismiss()}
        onKeyDown={() => onDismiss()}
      />
      <div className="TeamMember__container">
        <div className="TeamMember__dismiss">
          <button type='button' onClick={() => onDismiss()}>
            <div className="TeamMember__dismiss__icon-wrapper">
              <IconClose iconTitle="close" width="18" height="18" />
            </div>
          </button>
        </div>
        <div
          role="button"
          aria-label="dismiss"
          tabIndex="-1"
          className="TeamMember__container__content"
          onClick={() => onActive(id)}
          onKeyDown={() => onActive(id)}
        >
          <div className="TeamMember__container__picture">
            <div className="TeamMember__avatar" style={{ backgroundImage: `URL(${picture})` }} />
          </div>
          <div className="TeamMember__content__copy__container">
            <h4>{name}</h4>
            <div className="TeamMember__content__copy">
              <blockquote>
                {titles && titles.split('\n').map((title) => <p key={title}>{title}</p>)}
              </blockquote>
              <div dangerouslySetInnerHTML={{ __html: content }} />
              <Link to={slug} className="TeamMember__content__readmore">
                Read More...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TeamMember.propTypes = {
  show: PropTypes.bool.isRequired,
};
