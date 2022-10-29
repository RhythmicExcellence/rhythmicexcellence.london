import React from 'react';

export function TimetablePreview({ entry, widgetFor }) {
  const title = entry.getIn(['data', 'title']);
  const monday = widgetFor('monday');
  const tuesday = widgetFor('tuesday');
  const wednesday = widgetFor('wednesday');
  const thursday = widgetFor('thursday');
  const friday = widgetFor('friday');
  const saturday = widgetFor('saturday');
  const sunday = widgetFor('sunday');

  return (
    <div className="timetable">
      <h1>{title.toUpperCase()}</h1>
      {monday && (
      <div>
        <h4>Monday</h4>
        <p className="monday">{monday}</p>
      </div>
      )}
      {tuesday && (
      <div>
        <h4>Tuesday</h4>
        <p className="tuesday">{tuesday}</p>
      </div>
      )}
      {wednesday && (
      <div>
        <h4>Wednesday</h4>
        <p className="wednesday">{wednesday}</p>
      </div>
      )}
      {thursday && (
      <div>
        <h4>Thursday</h4>
        <p className="thursday">{thursday}</p>
      </div>
      )}
      {friday && (
      <div>
        <h4>Friday</h4>
        <p className="friday">{friday}</p>
      </div>
      )}
      {saturday && (
      <div>
        <h4>Saturday</h4>
        <p className="saturday">{saturday}</p>
      </div>
      )}
      {sunday && (
      <div>
        <h4>Sunday</h4>
        <p className="sunday">{sunday}</p>
      </div>
      )}
    </div>
  );
}
