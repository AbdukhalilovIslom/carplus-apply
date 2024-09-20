import type { StoreApi } from "zustand";

export interface AddressInterface {
  building_name: string;
  building_number: string;
  flat_number: string;
  postcode: string;
  street: string;
  town: string;
  country: string;
  live_years: string;
  live_months: string;
  livingStatus: string;
  addressText: string;
}

interface JobInterface {
  title: string;
  employer: string;
  income: number;
  employment_status: string;
  input2: string;
}

export type Tab =
  | "postcode"
  | "manually"
  | "period"
  | "postcodecheck"
  | "living-status";
interface States {
  data: {
    budget: string;
    user: {
      title: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      personState: string;
      livingStatuses: string;
      hasDrivingLicense: string;
      birth_date: string;
    };
    job: JobInterface;
    addresses: AddressInterface[];
    api_key: string;
    page: number;
  };
  tab: Tab;
}

interface Setters {
  setData: (s: States["data"]) => void;
  setTab: (s: States["tab"]) => void;
}

export type UserSliceType = States & Setters;

const initialValues = {
  data: {
    budget: "",
    user: {
      title: "Mr",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      personState: "",
      livingStatuses: "",
      hasDrivingLicense: "",
      birth_date: "",
    },
    job: {
      title: "",
      employer: "",
      income: 0,
      employment_status: "",
      input2: "",
    },
    addresses: [],
    api_key: "",
    page: 1,
  },
  tab: "postcode",
} satisfies States;

type set = StoreApi<UserSliceType>["setState"];
type get = StoreApi<UserSliceType>["getState"];

export const userSlice = (set: set, get: get): UserSliceType => ({
  ...initialValues,
  setData: (newValue) => {
    set({ data: newValue });
  },
  setTab: (newValue) => {
    set({ tab: newValue });
  },
});
