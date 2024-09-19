import styles from "./styles.module.scss";

import ApplyBack from "../applyBack";
import { useStore } from "@/store";

export default function Job() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const isRetired = data.job.employment_status === "Retired";

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setData({
      ...data,
      page: 8,
      job: {
        ...data.job,
        title: e.target[0].value,
        input2: e.target[1].value,
      },
    });
  };

  return (
    <div className={styles.job}>
      <h2>
        {isRetired
          ? "How long have you been retired?"
          : "What is your current job title?"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.job__block}>
          {isRetired ? (
            <>
              <div className={styles.job__block__inputs2}>
                <input
                  className={styles.job__block__inputs__item}
                  defaultValue={data.job.title}
                  placeholder={"Years"}
                  required
                  type="number"
                  max={100}
                />
                <input
                  className={styles.job__block__inputs__item}
                  defaultValue={data.job.input2}
                  placeholder={"Months"}
                  required
                  type="number"
                  max={12}
                />
              </div>
              {/* {!!error.text && <p>{error.text}</p>} */}
            </>
          ) : (
            <>
              <div className={styles.job__block__inputs}>
                <input
                  className={styles.job__block__inputs__item}
                  defaultValue={data.job.title}
                  placeholder={"What is your current job title?"}
                  required
                />
                <input
                  className={styles.job__block__inputs__item}
                  defaultValue={data.job.input2}
                  placeholder={
                    data.job.employment_status === "Self-employed"
                      ? "Town"
                      : "Which company do you work for?"
                  }
                  required
                />
              </div>
              {/* {!!error.text && <p>{error.text}</p>} */}
            </>
          )}
        </div>
        <button type="submit" className={styles.job__button}>
          Continue<span>➜</span>
        </button>
      </form>
      <ApplyBack page={6} />
    </div>
  );
}
