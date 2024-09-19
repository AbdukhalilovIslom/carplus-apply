import styles from "./styles.module.scss";
import { Dispatch } from "react";
import { AddressStateInterface, Tab } from ".";
import { penIcon } from "../../shared/penIcon";
import ApplyBack from "../applyBack";
import { useStore } from "@/store";

export default function PostcodeCheck({
  setAddress,
  address,
}: {
  setAddress: Dispatch<React.SetStateAction<AddressStateInterface>>;
  address: AddressStateInterface;
}) {
  const data = useStore((store) => store.data);
  const setTab = useStore((store) => store.setTab);

  const inputValue = address?.addressText
    ? address?.addressText
    : `${data.addresses[data.addresses.length - 1].building_number}, ${
        data.addresses[data.addresses.length - 1].country
      }, ${data.addresses[data.addresses.length - 1].street}, ${
        data.addresses[data.addresses.length - 1].town
      }, ${data.addresses[data.addresses.length - 1].postcode},
    `;

  return (
    <div className={styles.check}>
      <h2>
        {data.addresses.length
          ? "And what was your previous address?"
          : "Next, where do you live?"}
      </h2>

      <div className={styles.check__block}>
        <div className={styles.check__block__item}>
          <input value={inputValue} />
          <span
            onClick={() => {
              setAddress({
                ...address,
                building_name: "",
                flat_number: "",
                building_number: "",
                postcode: "",
                street: "",
                town: "",
                country: "",
                addressText: "",
                live_years: "",
                live_months: "",
              });
              setTab("postcode");
            }}
          >
            {penIcon}
          </span>
        </div>
      </div>
      <button
        type="submit"
        className={styles.check__button}
        onClick={() => setTab("living-status")}
      >
        Add address<span>➜</span>
      </button>
      <ApplyBack tab="postcode" />
    </div>
  );
}
