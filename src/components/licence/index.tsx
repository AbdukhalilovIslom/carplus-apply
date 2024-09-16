import ApplyBack from "../applyBack";
import styles from "./styles.module.scss";

import { useStore } from "@/store";

export default function Licence() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);

  const hasDrivingLicenseTypes = ["Yes", "No"];

  const handleClick = (hasDrivingLicense: string) => {
    setData({
      ...data,
      page: 3,
      user: {
        ...data.user,
        hasDrivingLicense: hasDrivingLicense,
      },
    });
  };

  return (
    <div className={styles.licence}>
      <h2>Do you have a full UK driving licence?</h2>
      <div className={styles.licence__block}>
        {hasDrivingLicenseTypes.map((item) => (
          <div
            className={`${styles.licence__block__item} ${
              data.user.hasDrivingLicense === item
                ? styles.licence__block__item__active
                : ""
            }`}
            key={item}
            onClick={() => handleClick(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <ApplyBack page={1} />
    </div>
  );
}
