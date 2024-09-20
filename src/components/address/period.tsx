import { Dispatch, useState } from "react";
import styles from "./styles.module.scss";
import { AddressStateInterface, Tab } from ".";
import { useStore } from "@/store";
import { AddressInterface } from "@/store/slices/userSlice";
import ApplyBack from "../applyBack";

export default function Period({
  address,
}: {
  address: AddressStateInterface;
}) {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const setTab = useStore((store) => store.setTab);
  const [period, setPeriod] = useState({
    years: data.addresses[data.addresses.length - 1]?.live_years || "",
    months: data.addresses[data.addresses.length - 1]?.live_months || "",
  });
  const [errors, setErrors] = useState({
    years: "",
    months: "",
  });

  const validateInput = (value: string, key: string) => {
    let error = "";
    const valueNumber = Number(value);

    if (key === "years") {
      if (valueNumber < 0 || valueNumber > 75) {
        error = "Years must be between 0 and 75.";
      }
    } else if (key === "months") {
      if (valueNumber < 0 || valueNumber > 12) {
        error = "Months must be between 0 and 12.";
      }
    }

    setPeriod((prevPeriod) => ({
      ...prevPeriod,
      [key]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [key]: error,
    }));
  };

  const handleClick = () => {
    const months = Number(period.months) + Number(period.years) * 12;
    if (months <= 0 || errors.months || errors.years) return;

    const newAddresses = [
      ...data.addresses,
      {
        ...address,
        live_months: period.months || "0",
        live_years: period.years || "0",
      },
    ];

    if (handleCheckAddressPeriod(newAddresses)) {
      setData({
        ...data,
        addresses: newAddresses,
        page: 6,
      });
    } else {
      setData({
        ...data,
        addresses: newAddresses,
      });
      setTab("postcode");
      setPeriod({ years: "", months: "" });
    }
  };

  const handleCheckAddressPeriod = (addresses: AddressInterface[]) => {
    let period = 0;
    addresses.forEach((address) => {
      period += Number(address.live_years) * 12 + Number(address.live_months);
    });

    return period >= 36;
  };

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
          type="number"
          className={`${styles.period__form__input} ${
            errors.years ? styles.period__form__input__error : ""
          }`}
          placeholder="Years"
          value={period.years}
          onChange={(e) => validateInput(e.target.value, "years")}
          required
        />

        <input
          type="number"
          className={`${styles.period__form__input} ${
            errors.months ? styles.period__form__input__error : ""
          }`}
          placeholder="Months"
          value={period.months}
          onChange={(e) => validateInput(e.target.value, "months")}
          required
        />
      </form>
      {errors.months && <span className="error">{errors.months}</span>}
      <br />
      {errors.years && <span className="error">{errors.years}</span>}

      <button
        type="submit"
        className={styles.period__button}
        onClick={handleClick}
      >
        Continue<span>➜</span>
      </button>

      <ApplyBack tab="living-status" />
    </div>
  );
}
