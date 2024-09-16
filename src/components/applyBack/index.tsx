import { useStore } from "@/store";
import styles from "./applyBack.module.scss";

const ApplyBack = ({ page }: { page: number }) => {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);

  return (
    <div
      onClick={() => setData({ ...data, page })}
      className={styles.applyBack}
    >
      <div className={styles.applyBack__block}>
        <span>➜</span> Previous
      </div>
      <div className={styles.applyBack__text}>
        You won&apos;t lose your information
      </div>
    </div>
  );
};

export default ApplyBack;
