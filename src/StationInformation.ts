// generated with json_typegen from https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json

export interface StationInformation {
  last_updated: number;
  ttl: number;
  data: Data;
}

export interface Data {
  stations: Station[];
}

export interface Station {
  station_id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}
