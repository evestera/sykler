import React, { useState } from 'react';
import './App.css';
import { useFetch } from './useFetch';
import { StationInformation } from './StationInformation';
import { StationStatus, Station as StationStatusStation } from './StationStatus';
import { StationView } from './StationView';
import StationInformationSchema from './StationInformationSchema.json';
import StationStatusSchema from './StationStatusSchema.json';

export const AppContent: React.FC = () => {
  const stationInformationState = useFetch<StationInformation>('/station_information.json', StationInformationSchema);
  const stationStatusState = useFetch<StationStatus>('/station_status.json', StationStatusSchema);
  const [search, setSearch] = useState('');

  if (stationInformationState === undefined || stationStatusState === undefined) {
    return <p>Laster...</p>;
  }

  if (stationInformationState.isErr()) {
    return <p>Feil ved henting av stasjonsdata:<br /> {stationInformationState.error}</p>
  }

  if (stationStatusState.isErr()) {
    return <p>Feil ved henting av tilgjengelighetsdata:<br /> {stationStatusState.error}</p>
  }

  const stationInformation = stationInformationState.value;
  const stationStatus = stationStatusState.value;

  const stationStatusById: { [key: string]: StationStatusStation } = {};

  stationStatus.data.stations.forEach(station => {
    stationStatusById[station.station_id] = station;
  });

  return (
    <>
      <input placeholder="Søk" autoFocus onChange={e => setSearch(e.target.value)} />
      {stationInformation.data.stations
        .filter(station => station.name.toLowerCase().includes(search.toLowerCase()))
        .map(station =>
          <StationView
            key={station.station_id}
            station={station}
            status={stationStatusById[station.station_id]}
          />
        )
      }
    </>
  );
}
