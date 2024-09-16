import Link from "next/link";
import styles from "./styles.module.scss";

import { useStore } from "@/store";
import Image from "next/image";

export default function Budget() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const { budget } = data;

  const budgets = [
    "£150 - £250",
    "£251 - £350",
    "£351 - £450",
    "£451 - £550",
    "Over £550",
  ];

  const handleClick = (budget: string) => {
    setData({ ...data, budget, page: 2 });
  };

  return (
    <div className={styles.budget}>
      <h2>What is your monthly budget?</h2>
      <div className={styles.budget__block}>
        {budgets.map((item) => (
          <div
            className={`${styles.budget__block__item} ${
              budget === item ? styles.budget__block__item__active : ""
            }`}
            key={item}
            onClick={() => handleClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <p>
        By starting your quote you&apos;re agreeing to our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
      <div className={styles.budget__text}>
        <Image src="/bg_check.png" alt="check" width={24} height={24} />
        <div>Your no-obligation quote is just 1 minute away!</div>
      </div>
    </div>
  );
}
