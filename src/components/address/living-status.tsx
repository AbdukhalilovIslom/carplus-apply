import { Dispatch } from "react";
import styles from "./styles.module.scss";
import { AddressStateInterface, Tab } from ".";
import { useStore } from "@/store";
import ApplyBack from "../applyBack";

export default function LivingStatus({
  setAddress,
  address,
}: {
  setAddress: Dispatch<React.SetStateAction<AddressStateInterface>>;
  address: AddressStateInterface;
}) {
  const data = useStore((store) => store.data);
  const setTab = useStore((store) => store.setTab);
  const livingStatuses = [
    "Private tenant",
    "Home owner",
    "Living with parents",
  ];

  const handleClickStatus = (livingStatus: string) => {
    setAddress({
      ...address,
      livingStatus,
    });
    setTab("period");
  };

  return (
    <div className={styles.living_status}>
      <h2>Ok, which best describes you?</h2>
      <div className={styles.living_status__block}>
        {livingStatuses.map((item) => (
          <div
            className={`${styles.living_status__block__item} ${
              data.addresses[data.addresses.length - 1]?.livingStatus === item
                ? styles.living_status__block__item__active
                : ""
            }`}
            key={item}
            onClick={() => handleClickStatus(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <ApplyBack tab="postcodecheck" />
    </div>
  );
}
