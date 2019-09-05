// generated with json_typegen from https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json

export interface StationStatus {
  last_updated: number;
  ttl: number;
  data: Data;
}

export interface Data {
  stations: Station[];
}

export interface Station {
  station_id: string;
  is_installed: number;
  is_renting: number;
  is_returning: number;
  last_reported: number;
  num_bikes_available: number;
  num_docks_available: number;
}
