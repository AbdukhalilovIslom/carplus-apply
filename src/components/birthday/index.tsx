import { useState } from "react";
import { useStore } from "@/store";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import ApplyBack from "../applyBack";

import styles from "./styles.module.scss";

export default function Birthday() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const [value, setValue] = useState<Dayjs | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (value) {
      const currentDate = dayjs();
      const age = currentDate.diff(value, "year");

      if (age < 18 || age > 75) {
        setError("You must be between 18 and 75 years old.");
        return;
      }

      setData({
        ...data,
        page: 4,
        user: {
          ...data.user,
          birth_date: `${value.format("DD")}-${value.format(
            "MM"
          )}-${value.format("YYYY")}`,
        },
      });
      window.scrollTo(0, 0);
    }
  };

  const onChange = (e: Dayjs | null) => {
    setValue(e);
    setError(null);
  };

  return (
    <div className={styles.applyPage3}>
      <h2>What is your date of birth?</h2>
      <div className={styles.applyPage3__inputs}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            className={styles.applyPage3__inputs__input}
            format="DD/MM/YYYY"
            label="Date of birth*"
            value={value}
            maxDate={dayjs().subtract(18, "year")}
            minDate={dayjs().subtract(75, "year")}
            onChange={onChange}
            onError={console.log}
            disableOpenPicker={true}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.error}>{error ? error : null}</div>
      <button onClick={handleSubmit} className={styles.applyPage3__button}>
        Continue<span>➜</span>
      </button>
      <ApplyBack page={2} />
    </div>
  );
}
