import { useState } from "react";
import { useStore } from "@/store";
import dayjs from "dayjs";
import ApplyBack from "../applyBack";
import customParseFormat from "dayjs/plugin/customParseFormat";

import styles from "./styles.module.scss";
dayjs.extend(customParseFormat);

export default function Birthday() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const init = data.user.birth_date
    ? data.user.birth_date.split("-").join("/")
    : "";
  const [value, setValue] = useState(init);
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (value.length !== 10) {
      setError("Please enter a valid date in DD/MM/YYYY format.");
      return;
    }

    const selectedDate = dayjs(value, "DD/MM/YYYY");
    if (!selectedDate.isValid()) {
      setError("Invalid date format.");
      return;
    }

    const age = dayjs().diff(selectedDate, "year");
    if (age < 18 || age > 75) {
      setError("You must be between 18 and 75 years old.");
      return;
    }

    const birth_date = value.split("/").join("-");

    setData({
      ...data,
      page: 4,
      user: {
        ...data.user,
        birth_date,
      },
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleanInput = input.replace(/\D/g, ""); // Remove non-numeric characters

    // Format the input to DD/MM/YYYY as user types
    let formattedValue = "";
    if (cleanInput.length <= 2) {
      formattedValue = cleanInput;
    } else if (cleanInput.length <= 4) {
      formattedValue = `${cleanInput.slice(0, 2)}/${cleanInput.slice(2, 4)}`;
    } else {
      formattedValue = `${cleanInput.slice(0, 2)}/${cleanInput.slice(
        2,
        4
      )}/${cleanInput.slice(4, 8)}`;
    }
    setValue(formattedValue);

    // Once we have a full valid date, perform validation
    if (formattedValue.length === 10) {
      validateAge(formattedValue);
    } else {
      setError(""); // Clear any existing error if not fully typed
    }
  };

  const validateAge = (dateStr: string) => {
    // Parse the date using the DD/MM/YYYY format
    const parsedDate = dayjs(dateStr, "DD/MM/YYYY");

    if (!parsedDate.isValid()) {
      setError("Invalid date format.");
      return;
    }

    const today = dayjs();
    const age = today.diff(parsedDate, "year");

    if (age < 18 || age > 75) {
      setError("You must be between 18 and 75 years old.");
    } else {
      setError(""); // Clear the error if valid
    }
  };

  return (
    <div className={styles.applyPage3}>
      <h2>What is your date of birth?</h2>
      <div className={styles.input_container}>
        <label className={styles.input_label}>
          Date of birth<span className={styles.required_star}>*</span>
        </label>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          value={value}
          onChange={onChange}
          autoComplete="bday"
          data-form-type="birth,date"
          className={styles.input_field}
        />
      </div>
      <div className={styles.error}>{error ? error : null}</div>
      <button onClick={handleSubmit} className={styles.applyPage3__button}>
        Continue<span>➜</span>
      </button>
      <ApplyBack page={2} />
    </div>
  );
}
