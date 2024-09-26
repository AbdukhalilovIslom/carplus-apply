"use client";
import { useStore } from "@/store";
import styles from "./styles.module.scss";
import Link from "next/link";
import ApplyBack from "../applyBack";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apply } from "@/services/apply";
import { useRouter } from "next/navigation";

export default function EmailAndPhone() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const api_key = (searchParams.get("key") ||
    "default") as keyof typeof api_keys;
  const api_keys = {
    max: "Carfinancemax",
    carplus: "Carplus2",
    money: "Carfinance",
    carboom: "Carboom",
    default: "Carfinancemax",
  };

  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);

  const sendMessageToParent = () => {
    window.parent.postMessage(
      { type: "MESSAGE_FROM_IFRAME", payload: "Hello from the iframe!" },
      "http://localhost:3000" // Ensure correct origin
    );
  };

  console.log(localStorage.getItem("key"));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedAddresses = data.addresses.map((item) => {
      const { addressText, live_months, live_years, livingStatus, ...rest } =
        item;

      return {
        ...rest,
        livingStatus: "Private tenant",
        live_months: Number(live_months),
        live_years: Number(live_years),
      };
    });

    const finalResult = {
      borrow: "15000",
      vehicleType: "Car",
      user: {
        title: data.user.title,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        email: data.user.email,
        phone: data.user.phone,
        personState: "Single",
        hasDrivingLicense: "Yes",
        birth_date: data.user.birth_date.split("-").reverse().join("-"),
      },
      jobs: [
        {
          title:
            data.job.employment_status === "Retired"
              ? "Retired"
              : data.job.title,
          employer: data.user.first_name,
          income: data.job.income,
          employment_status: "Full-Time Employment",
        },
      ],
      addresses: updatedAddresses,
      api_key: api_keys[api_key],
      gclid: sessionStorage.getItem("gclid")
        ? sessionStorage.getItem("gclid")
        : "",
      utm_source: sessionStorage.getItem("utm_source")
        ? sessionStorage.getItem("utm_source")
        : "",
    };

    apply(finalResult)
      .then(function (response) {
        if (response.success) {
          // sessionStorage.setItem("user_name", finalResult.user.first_name);
          // sessionStorage.setItem("user_email", finalResult.user.email);
          // sessionStorage.setItem("user_phone", finalResult.user.phone);
          // sessionStorage.setItem("id", res.data.id);
          router.push("/success");
          sendMessageToParent();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.mail_phone}>
      <h2>Your car finance quote is ready, where should we send to?</h2>
      <form onSubmit={handleSubmit} className={styles.mail_phone__form}>
        <div className={styles.mail_phone__form__block}>
          <div>
            <input
              type="email"
              minLength={2}
              placeholder="Email address"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  user: {
                    ...data.user,
                    email: e.target.value,
                  },
                })
              }
            />
            {/* {!!error.email && (
              <p className={styles.mail_phone__form__block__error}>
                Please enter your Email Address
              </p>
            )} */}
          </div>
          <div>
            <input
              type="tel"
              minLength={11}
              maxLength={11}
              placeholder="Phone number"
              required
              value={data.user.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  user: {
                    ...data.user,
                    phone: e.target.value.replace(/\D/g, ""),
                  },
                })
              }
            />
            {/* {!!error.phone && (
              <p className={styles.mail_phone__form__block__error}>
                Please enter valid mobile number. Ex: 01234567890
              </p>
            )} */}
          </div>
          <div className={styles.mail_phone__form__block__terms}>
            <label htmlFor="mobileInput"></label>
            <div className={styles.mail_phone__form__block__terms__block}>
              <div>
                By submitting your application, you agree to our{" "}
                <Link href="/terms" target="_blank" rel="noreferrer">
                  terms & conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" rel="noreferrer">
                  privacy policy
                </Link>
                . If you wish to opt-out of any marketing about our other offers
                at any time, you will be given an instant option to do so or
                please refer to our{" "}
                <Link href="/privacy" target="_blank" rel="noreferrer">
                  privacy policy
                </Link>{" "}
                for more details.
              </div>
            </div>
            {/* {error.isCheckedError && (
              <p className={styles.mail_phone__form__block__error}>
                You must agree to the Terms & Conditions and Privacy Policy to
                proceed.
              </p>
            )} */}
          </div>
          <button type="submit" className={styles.mail_phone__button}>
            Finish
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : null}
          </button>
        </div>
        <ApplyBack page={8} />
      </form>
    </div>
  );
}

const d = {
  borrow: "15000",
  vehicleType: "Car",
  user: {
    title: "Mr",
    first_name: "sad",
    last_name: "asd",
    email: "sad@sas.da",
    phone: "13212312312",
    personState: "Single",
    hasDrivingLicense: "Yes",
    birth_date: "2000-12-12",
  },
  jobs: [
    {
      title: "asd",
      employer: "sad",
      income: 2001,
      employment_status: "Full-Time Employment",
    },
  ],
  addresses: [
    {
      building_name: "",
      building_number: "1",
      flat_number: "",
      postcode: "M30 9PU",
      street: "Kirtley Avenue",
      town: "Manchester",
      country: "England",
      live_years: 3,
      live_months: 1,
      livingStatus: "Private tenant",
    },
  ],
  api_key: "Carfinancemax",
  gclid: "",
};
