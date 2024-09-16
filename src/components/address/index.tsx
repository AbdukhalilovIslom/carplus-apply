import ApplyBack from "../applyBack";
import styles from "./styles.module.scss";
import { penIcon } from "../../shared/penIcon";

import { useEffect, useState } from "react";
import { getPostcodes, Postcodes } from "@/services/postcode";
import { KeyObject } from "crypto";

type Tab = "postcode" | "manually" | "period" | "postcodecheck";

export default function Address() {
  const [tab, setTab] = useState<Tab>("postcode");
  const [postAddresses, setPostAddresses] = useState<Postcodes>();
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [period, setPeriod] = useState({
    years: "",
    months: "",
  });
  const [errors, setErrors] = useState({
    years: "",
    months: "",
  });

  const [address, setAddress] = useState({
    livingStatus: "Private tenant",
    building_name: "",
    flat_number: "",
    building_number: "",
    postcode: "",
    street: "",
    town: "",
    country: "",
    addressText: "",
    live_years: 0,
    live_months: 0,
  });

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

  const validateInput = (value: string, key: string) => {
    let error = "";
    let numericValue = parseInt(value); // Преобразование строки в число

    if (key === "years") {
      if (isNaN(numericValue) || numericValue < 0 || numericValue > 75) {
        error = "Years must be between 0 and 75.";
      }
    } else if (key === "months") {
      if (isNaN(numericValue) || numericValue < 0 || numericValue > 12) {
        error = "Months must be between 0 and 12.";
      }
    }

    // Сохраняем число в состояние, если оно валидное
    setPeriod({ ...period, [key]: value });
    setErrors({ ...errors, [key]: error });
  };

  switch (tab) {
    case "postcode":
      return (
        <div className={styles.postcode}>
          <h2>
            Next, where do you live?
            {/* {allLive
              ? "And what was your previous address?"
              : "Next, where do you live?"} */}
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
              <p className="mt-2">
                {error}
                <span
                  className="text-blue"
                  style={{ cursor: "pointer" }}
                  // onClick={() => dispatch(setPage({ page: 6 }))}
                >
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
    case "postcodecheck":
      return (
        <div className={styles.check}>
          <h2>
            Next, where do you live?
            {/* {allLive
              ? "And what was your previous address?"
              : "Next, where do you live?"} */}
          </h2>

          <div className={styles.check__block}>
            <div className={styles.check__block__item}>
              <input value={address.addressText} />
              <span
                onClick={() => {
                  setAddress({
                    ...address,
                    building_name: "",
                    flat_number: "",
                    building_number: "",
                    postcode: "",
                    street: "",
                    town: "",
                    country: "",
                    addressText: "",
                    live_years: 0,
                    live_months: 0,
                  });
                  setTab("postcode");
                  setSearchText("");
                }}
              >
                {penIcon}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={styles.check__button}
            onClick={() => setTab("period")}
          >
            Add address<span>➜</span>
          </button>

          {/* <ApplyBack page={4} /> */}
        </div>
      );
    case "manually":
      return "manually";
    case "period":
      return (
        <div className={styles.period}>
          <h2>
            How long did you live at {address.addressText}
            {/* {length > 1 ? "And how" : "How"} long did you live at{" "}
            {addresses[length - 1]?.addressText}.{" "}
            {addresses[length - 1]?.postcode}? */}
          </h2>

          <form className={styles.period__form}>
            <input
              type="tel"
              className={`${styles.period__form__input} ${
                errors.years ? styles.period__form__input__error : ""
              }`}
              placeholder="Years"
              value={period.years}
              onChange={(e) => validateInput(e.target.value, "years")}
              required
            />
            {errors.years && <span className="error">{errors.years}</span>}

            <input
              type="tel"
              className={`${styles.period__form__input} ${
                errors.months ? styles.period__form__input__error : ""
              }`}
              placeholder="Months"
              value={period.months}
              onChange={(e) => validateInput(e.target.value, "months")}
              required
            />
            {errors.months && <span className="error">{errors.months}</span>}
          </form>
          {/* {!!error.message && <p className="my-4 text-red">{error.message}</p>} */}

          <button
            type="submit"
            className={styles.period__button}
            // onClick={handleClick}
          >
            Continue<span>➜</span>
          </button>
        </div>
      );
  }
}
