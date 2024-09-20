"use client";
import { useStore } from "@/store";
import Address from "@/components/address";
import Budget from "@/components/budget";
import Licence from "@/components/licence";
import Birthday from "@/components/birthday";
import Income from "@/components/income";
import EploymentStatus from "@/components/employment-status";
import Job from "@/components/job";
import Username from "@/components/username";
import EmailAndPhone from "@/components/email-and-phone";

import styles from "./page.module.css";

export default function Home() {
  const data = useStore((store) => store.data);
  const { page } = data;
  const PAGES_COUNT = 9;
  const progress = (100 / PAGES_COUNT) * page - 100 / PAGES_COUNT;

  const getApplyPage = () => {
    switch (page) {
      case 1:
        return <Budget />;
      case 2:
        return <Licence />;
      case 3:
        return <Birthday />;
      case 4:
        return <Income />;
      case 5:
        return <Address />;
      case 6:
        return <EploymentStatus />;
      case 7:
        return <Job />;
      case 8:
        return <Username />;
      case 9:
        return <EmailAndPhone />;
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: `${progress}%` }}></div>
      </div>
      {getApplyPage()}
    </div>
  );
}
