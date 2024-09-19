import { useStore } from "@/store";
import { Dispatch, useEffect, useState } from "react";
import { Postcodes } from "@/services/postcode";
import { AddressStateInterface, Tab } from ".";
import ApplyBack from "../applyBack";

import styles from "./styles.module.scss";

export default function Postcode({
  setAddress,
  address,
}: {
  setAddress: Dispatch<React.SetStateAction<AddressStateInterface>>;
  address: AddressStateInterface;
}) {
  const data = useStore((store) => store.data);
  const setTab = useStore((store) => store.setTab);
  const [postAddresses, setPostAddresses] = useState<Postcodes>();
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) {
      setPostAddresses({
        postcode: "",
        latitude: 0,
        longitude: 0,
        addresses: [],
      });
      return;
    }
    (async () => {
      const res = await fetch(
        `https://api.carplus.co.uk/postcodes/v2/${searchText}`
      );

      if (res.ok) {
        const json = await res.json();
        setPostAddresses(json);
        setError("");
      } else {
        setPostAddresses({
          postcode: "",
          latitude: 0,
          longitude: 0,
          addresses: [],
        });
        setError("Can't see your address?");
      }
    })();
  }, [searchText]);

  return (
    <div className={styles.postcode}>
      <h2>
        {data.addresses.length
          ? "And what was your previous address?"
          : "Next, where do you live?"}
      </h2>
      <div className={styles.postcode__block}>
        <p className={styles.postcode__block__text}>Enter postcode</p>
        <div className="position-relative">
          <input
            type="text"
            className={`${styles.postcode__block__postcodeInput} ${
              error ? "border-1 border-danger" : ""
            }`}
            onChange={(e) => {
              setSearchText(e.target.value.toUpperCase());
            }}
          />
        </div>

        {error ? (
          <p className={styles.postcode_error}>
            {error}
            <span className="text-green" onClick={() => setTab("manually")}>
              Enter address manually
            </span>
          </p>
        ) : null}

        {postAddresses?.addresses.length ? (
          <div className={styles.postcode__block__addresses}>
            {postAddresses.addresses.map((item, index) => (
              <div
                key={index + item.building_number}
                className={styles.postcode__block__addresses__item}
                onClick={() => {
                  setAddress({
                    ...address,
                    building_name: item.building_name,
                    building_number: item.building_number,
                    postcode: postAddresses.postcode,
                    street: item.thoroughfare,
                    town: item.town_or_city,
                    country: item.country,
                    addressText: `${item.formatted_address
                      .filter((item) => item !== "")
                      .join(", ")}, ${postAddresses.postcode}`,
                  });
                  setTab("postcodecheck");
                  setSearchText("");
                }}
              >
                {postAddresses.postcode}{" "}
                {item.formatted_address
                  .filter((item) => item !== "")
                  .join(", ")}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <ApplyBack page={4} />
    </div>
  );
}
