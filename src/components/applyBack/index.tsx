import { useStore } from "@/store";
import styles from "./applyBack.module.scss";
import { Tab } from "../address";

const ApplyBack = ({ page, tab }: { page?: number; tab?: Tab }) => {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const setTab = useStore((store) => store.setTab);

  const handleClick = () => {
    if (tab && page) {
      setData({ ...data, page });
      setTab(tab);
    } else if (page) {
      setData({ ...data, page });
    } else if (tab) {
      setTab(tab);
    }
  };

  return (
    <div onClick={handleClick} className={styles.applyBack}>
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
