import { useQuery } from "react-query";
import ApplyBack from "../applyBack";
import styles from "./styles.module.scss";

import { useEffect, useState } from "react";
import { getPostcodes, Postcodes } from "@/services/postcode";
import axios from "axios";

type Tab = "postcode" | "manually" | "period";

export default function Address() {
  const [tab, setTab] = useState<Tab>("postcode");
  const [postAddresses, setPostAddresses] = useState<Postcodes>();
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;
    (async () => {
      const res = await axios.get<Postcodes>(
        `https://api.carplus.co.uk/postcodes/v2/${searchText}`
      );

      if (res.data.addresses.length) {
        setPostAddresses(res.data);
      } else {
        setError("Can't see your address?");
      }
    })();
  }, [searchText]);

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
              {/* {typePostCode &&
                (error ? (
                  <img
                    src="/inputError.svg"
                    alt="error"
                    className={styles.postcode__block__input}
                  />
                ) : (
                  <img
                    src="/inputChecked.svg"
                    alt="checked"
                    className={styles.postcode__block__input}
                  />
                ))} */}
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
    case "manually":
      return "manually";
    case "period":
      return (
        <div className={styles.period}>
          <h2>
            How
            {/* {length > 1 ? "And how" : "How"} long did you live at{" "}
            {addresses[length - 1]?.addressText}.{" "}
            {addresses[length - 1]?.postcode}? */}
          </h2>

          <form className={styles.period__form}>
            <input
              type="tel"
              className={`${styles.period__form__input}`}
              // className={`${styles.period__form__input} ${
              //   error.field === "years"
              //     ? styles.period__form__input__error
              //     : ""
              // }`}
              placeholder="Years"
              // value={inputs.years}
              // onChange={(e) => validateInput(e.target.value, "years")}
              minLength={2}
              required
            />

            <input
              type="tel"
              className={`${styles.period__form__input}`}
              // className={`${styles.period__form__input} ${
              //   error.field === "months"
              //     ? styles.period__form__input__error
              //     : ""
              // }`}
              placeholder="Months"
              // value={inputs.months}
              // onChange={(e) => validateInput(e.target.value, "months")}
              minLength={2}
              required
            />
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
