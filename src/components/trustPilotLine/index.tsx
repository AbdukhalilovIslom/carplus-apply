import Image from "next/image";

import styles from "./trustPL.module.scss";

const TrustPilotLine = () => {
  return (
    <a href="#" target="_blank" className={styles.trustPL}>
      <div className={styles.trustPL__block}>Excellent</div>
      <Image
        src="/trustpilot/tp-2.svg"
        alt="trustpilot"
        width={107}
        height={20}
        className={styles.trustPL__image}
      />
      <Image
        src="/trustpilot/trustpilot_logo.png"
        alt="trustpilot"
        width={109}
        height={30}
      />
    </a>
  );
};

export default TrustPilotLine;
