import axios from "axios";

export interface Postcodes {
  postcode: string;
  latitude: number;
  longitude: number;
  addresses: Addresses[];
}

interface Addresses {
  formatted_address: string[];
  thoroughfare: string;
  building_name: string;
  sub_building_name: string;
  sub_building_number: string;
  building_number: string;
  line_1: string;
  line_2: string;
  line_3: string;
  line_4: string;
  locality: string;
  town_or_city: string;
  county: string;
  district: string;
  country: string;
}

export async function getPostcodes(e: string) {
  const res = await axios.get<Postcodes>(
    `https://api.carplus.co.uk/postcodes/v2/${e}`
  );
  return res.data;
}
