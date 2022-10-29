import React from 'react';

export function Team({ entry, widgetFor, getAsset }) {
  const image = entry.getIn(['data', 'avatar']);
  const name = entry.getIn(['data', 'title']);
  const titles = entry.getIn(['data', 'titles']).split('\n');
  const body = widgetFor('body');
  const details = widgetFor('details');

  return (
    <div className="team">
      <img src={getAsset(image).toString()} alt="profile" className="avatar" />
      <h1>{name.toUpperCase()}</h1>
      <blockquote>
        {titles.map((title) => <p>{title}</p>)}
      </blockquote>
      <p className="details">{details}</p>
      <hr className="separator" />
      <p className="description">{body}</p>
    </div>
  );
}
