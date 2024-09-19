import ApplyBack from "../applyBack";
import styles from "./styles.module.scss";

import { useStore } from "@/store";

export default function Income() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const { job } = data;

  const incomeOptions = [
    {
      title: "Under £1,500",
      value: 2001,
    },
    {
      title: "£1,500 - £2,000",
      value: 2001,
    },
    {
      title: "£2,000 - £3,000",
      value: 3000,
    },
    {
      title: "Over £3,000",
      value: 3000,
    },
  ];

  const handleClick = (income: number) => {
    setData({ ...data, page: 5, job: { ...job, income } });
  };

  return (
    <div className={styles.income}>
      <div className={styles.income__title}>
        What is your total <b>net monthly</b> income, after tax?
      </div>
      <div className={styles.income__block}>
        {incomeOptions.map((item) => (
          <div
            className={styles.income__block__item}
            key={item.title}
            onClick={() => handleClick(item.value)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <ApplyBack page={3} />
    </div>
  );
}
