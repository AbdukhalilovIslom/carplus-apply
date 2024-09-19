import axios from "axios";

interface AddressInterface {
  building_name: string;
  building_number: string;
  flat_number: string;
  postcode: string;
  street: string;
  town: string;
  country: string;
  live_years: number;
  live_months: number;
  livingStatus: string;
}

interface JobInterface {
  title: string;
  employer: string;
  income: number;
  employment_status: string;
}

interface ApplyBody {
  borrow: string;
  vehicleType: string;
  user: {
    title: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    personState: string;
    hasDrivingLicense: string;
    birth_date: string;
  };
  addresses: AddressInterface[];
  jobs: JobInterface[];
  api_key: string;
  gclid: string | null;
  utm_source: string | null;
}

export async function apply(data: ApplyBody) {
  const res = await axios.post<any>(
    `https://api2.carplus.co.uk/requests/new`,
    data
  );
  return res.data;
}
