import styles from "./styles.module.scss";

import { useStore } from "@/store";
import ApplyBack from "../applyBack";

export default function EploymentStatus() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);

  const statuses = [
    { title: "Full-time", value: "Full-time" },
    { title: "Part-time", value: "Part-time" },
    { title: "Self-employed", value: "Self-employed" },
    { title: "Retired", value: "Retired" },
  ];

  const handleClick = (item: string) => {
    setData({
      ...data,
      page: 7,
      job: {
        ...data.job,
        employment_status: item,
      },
    });
  };

  return (
    <div className={styles.emp_status}>
      <h2>What is your employment status?</h2>
      <div className={styles.emp_status__block}>
        {statuses.map((item) => (
          <div
            className={`${styles.emp_status__block__item} ${
              data.job.employment_status === item.value
                ? styles.emp_status__block__item__active
                : ""
            }`}
            key={item.title}
            onClick={() => handleClick(item.value)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <ApplyBack page={5} />
    </div>
  );
}
