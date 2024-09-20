"use client";
import { useStore } from "@/store";
import styles from "./styles.module.scss";

export default function Success() {
  const data = useStore((store) => store.data);

  const texts = [
    "Your application has been submitted.",
    `We will call you on ${data.user.phone} shortly to discuss your monthly budget and car finance terms.`,
    "Please let us know the car reg and dealer details by emailing these to carfinance@carfinancemax.com",
    "Don’t apply elsewhere - further credit searches will affect your credit score and restrict our ability to hold this offer.",
  ];

  return (
    <>
      <div className={styles.success}>
        <h2 className={styles.success__title}>
          We’re running final price comparison checks with our panel of lenders.
          Your decision will be emailed and messaged to you now.
        </h2>
        <ul className={styles.success__texts}>
          {texts.map((el) => {
            return (
              <li key={el} className={styles.success__texts__text}>
                <img src="/bg_check.png" alt="bg_check" /> {el}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
