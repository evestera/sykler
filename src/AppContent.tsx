import React, { useState } from 'react';
import './App.css';
import { useFetch } from './useFetch';
import { StationInformation } from './api/StationInformation';
import { StationStatus } from './api/StationStatus';
import { StationView } from './StationView';
import StationInformationSchema from './api/StationInformationSchema.json';
import StationStatusSchema from './api/StationStatusSchema.json';

export const AppContent: React.FC = () => {
  const stationInformationState = useFetch<StationInformation>('/station_information.json', StationInformationSchema);
  const stationStatusState = useFetch<StationStatus>('/station_status.json', StationStatusSchema);
  const [search, setSearch] = useState('');

  if (!stationInformationState || !stationStatusState) {
    return <p>Laster...</p>;
  }

  if (stationInformationState.isErr()) {
    return <p>Feil ved henting av stasjonsdata:<br /> {stationInformationState.error}</p>
  }
  if (stationStatusState.isErr()) {
    return <p>Feil ved henting av tilgjengelighetsdata:<br /> {stationStatusState.error}</p>
  }

  const stationStatusById = new Map(stationStatusState.value.data.stations
    .map(station => [station.station_id, station]));

  return (
    <>
      <input placeholder="Søk" autoFocus onChange={e => setSearch(e.target.value)} />

      {stationInformationState.value.data.stations
        .filter(station => station.name.toLowerCase().includes(search.toLowerCase())
            || station.address.toLowerCase().includes(search.toLowerCase()))
        .map(station =>
          <StationView
            key={station.station_id}
            station={station}
            status={stationStatusById.get(station.station_id)}
          />
        )
      }
    </>
  );
};
