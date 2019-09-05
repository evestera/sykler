import React from 'react';
import './App.css';
import { Station as StationInformationStation } from './api/StationInformation';
import { Station as StationStatusStation } from './api/StationStatus';

type Props = {
  station: StationInformationStation,
  status?: StationStatusStation,
}

export const StationView: React.FC<Props> = ({ station, status }) => {
  return (
    <p>
      {station.name}:{" "}
      {status ? status.num_bikes_available : "-"} <i className="fa fa-bicycle"></i>{" "}
      {status ? status.num_docks_available : "-"} <i className="fa fa-lock"></i> - {" "}
      <a className="map-link" href={`https://www.google.com/maps/@${station.lat},${station.lon},17z`}>
        <i className="fa fa-map-marker"></i>
      </a>
    </p>
  );
};
