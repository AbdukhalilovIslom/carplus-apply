import { Dispatch, useState } from "react";
import styles from "./styles.module.scss";
import { AddressStateInterface, Tab } from ".";
import ApplyBack from "../applyBack";
import { useStore } from "@/store";

export default function Manually({
  setAddress,
  address,
}: {
  setAddress: Dispatch<React.SetStateAction<AddressStateInterface>>;
  address: AddressStateInterface;
}) {
  const setTab = useStore((store) => store.setTab);
  const [manuallError, setManuallError] = useState({
    postcode: false,
    buildingName: false,
    buldingNumber: false,
    flatNumber: false,
    street: false,
    town: false,
    country: false,
  });

  const handleCheck = (key: string, condition: boolean) => {
    if (condition) {
      setManuallError((prev) => ({ ...prev, [key]: false }));
      return true;
    }
    setManuallError((prev) => ({ ...prev, [key]: true }));
    return false;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const postcode = e.target[0].value;
    const buildingName = e.target[1].value;
    const buildingNumber = e.target[2].value;
    const flatNumber = e.target[3].value;
    const street = e.target[4].value;
    const town = e.target[5].value;
    const country = e.target[6].value;

    const isValidPostcode = handleCheck("postcode", postcode.length > 5);
    const isValidBuildingName = handleCheck(
      "buildingName",
      buildingName.length > 2
    );
    const isValidBuildingNumber = handleCheck(
      "buildingNumber",
      buildingNumber.length > 1
    );
    const isValidFlatNumber = handleCheck("flatNumber", flatNumber.length > 1);
    const isValidStreet = handleCheck("street", street.length > 2);
    const isValidTown = handleCheck("town", town.length > 2);
    const isValidCountry = handleCheck("country", country.length > 4);

    if (
      isValidPostcode &&
      isValidBuildingName &&
      isValidBuildingNumber &&
      isValidFlatNumber &&
      isValidStreet &&
      isValidTown &&
      isValidCountry
    ) {
      const item = {
        building_name: buildingName,
        building_number: buildingNumber,
        flat_number: flatNumber,
        postcode: postcode,
        street: street,
        town: town,
        country: country,
        addressText: `${buildingNumber} ${street}, ${buildingName}, ${flatNumber}, ${town}, ${postcode}`,
      };

      setAddress({
        ...address,
        ...item,
      });

      setTab("postcodecheck");

      return;
    }
  };

  return (
    <div className={styles.manually}>
      <h2>Enter manually your address</h2>

      <form className={styles.manually__block} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="postcode"
            minLength={6}
            maxLength={7}
            placeholder="Postcode"
            required
            // defaultValue={address?.postcode}
          />
          {!!manuallError.postcode && (
            <p className={styles.manually__block__error}>
              Please enter your Postcode
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="building-name"
            minLength={2}
            placeholder="Building name"
            required
            // defaultValue={address?.building_name}
          />
          {!!manuallError.buildingName && (
            <p className={styles.manually__block__error}>
              Please enter your Building name
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="buldingNumber"
            minLength={1}
            placeholder="Building number"
            required
            // defaultValue={address?.building_number}
          />
          {!!manuallError.buldingNumber && (
            <p className={styles.manually__block__error}>
              Please enter your Building number
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="flat-number"
            minLength={2}
            placeholder="Flat number"
            required
            // defaultValue={address?.sub_building_name}
          />
          {!!manuallError.flatNumber && (
            <p className={styles.manually__block__error}>
              Please enter your Flat number
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="street"
            minLength={2}
            placeholder="Street"
            required
            // defaultValue={address?.thoroughfare}
          />
          {!!manuallError.street && (
            <p className={styles.manually__block__error}>
              Please enter your Street
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="town"
            minLength={2}
            placeholder="Town"
            required
            // defaultValue={address?.town_or_city}
          />
          {!!manuallError.town && (
            <p className={styles.manually__block__error}>
              Please enter your Town
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="country"
            minLength={2}
            placeholder="Country"
            required
            // defaultValue={address?.country}
          />
          {!!manuallError.country && (
            <p className={styles.manually__block__error}>
              Please enter your Country
            </p>
          )}
        </div>

        <button type="submit" className={styles.manually__button}>
          Add address<span>➜</span>
        </button>
      </form>
      <ApplyBack tab="postcode" />
    </div>
  );
}
