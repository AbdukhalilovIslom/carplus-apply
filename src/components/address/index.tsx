import Postcode from "./postcode";
import PostcodeCheck from "./postcode-check";
import Manually from "./manually";
import Period from "./period";
import LivingStatus from "./living-status";
import { useState } from "react";
import { useStore } from "@/store";
export interface AddressStateInterface {
  livingStatus: string;
  building_name: string;
  flat_number: string;
  building_number: string;
  postcode: string;
  street: string;
  town: string;
  country: string;
  addressText: string;
  live_months: string;
  live_years: string;
}

export type Tab =
  | "postcode"
  | "manually"
  | "period"
  | "postcodecheck"
  | "living-status";

export default function Address() {
  const tab = useStore((store) => store.tab);
  const [address, setAddress] = useState<AddressStateInterface>({
    livingStatus: "Private tenant",
    building_name: "",
    flat_number: "",
    building_number: "",
    postcode: "",
    street: "",
    town: "",
    country: "",
    addressText: "",
    live_months: "",
    live_years: "",
  });

  switch (tab) {
    case "postcode":
      return <Postcode setAddress={setAddress} address={address} />;
    case "manually":
      return <Manually setAddress={setAddress} address={address} />;
    case "postcodecheck":
      return <PostcodeCheck setAddress={setAddress} address={address} />;
    case "living-status":
      return <LivingStatus setAddress={setAddress} address={address} />;
    case "period":
      return <Period address={address} />;
  }
}
