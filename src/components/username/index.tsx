import { useStore } from "@/store";
import styles from "./styles.module.scss";
import ApplyBack from "../applyBack";

export default function Username() {
  const data = useStore((store) => store.data);
  const setData = useStore((store) => store.setData);
  const titleTypes = ["Mr", "Mrs", "Miss", "Ms"];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setData({
      ...data,
      page: 9,
      user: {
        ...data.user,
        first_name: e.target[0].value,
        last_name: e.target[1].value,
      },
    });
  };

  return (
    <div className={styles.username}>
      <h2>Almost done, let us know who you are?</h2>
      <div className={styles.username__titles}>
        <div>Your title</div>
        <div className={styles.username__titles__block}>
          {titleTypes.map((item) => (
            <div
              className={`${styles.username__titles__block__item} ${
                data.user.title === item
                  ? styles.username__titles__block__item__active
                  : ""
              }`}
              key={item}
              onClick={() =>
                setData({
                  ...data,
                  user: {
                    ...data.user,
                    title: item,
                  },
                })
              }
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.username__form}>
        <div>
          <input
            type="text"
            defaultValue={data.user.first_name}
            minLength={2}
            placeholder="First name"
            required
            onChange={(e) => {
              let filteredValue = e.target.value.replace(/[^A-Za-z]/gi, "");
              setData({
                ...data,
                user: {
                  ...data.user,
                  first_name: filteredValue,
                },
              });
            }}
          />
          {/* {!!error && <p>Please enter your first name</p>} */}
        </div>
        <div>
          <input
            type="text"
            defaultValue={data.user.last_name}
            minLength={2}
            placeholder="Last name"
            required
            onChange={(e) => {
              let filteredValue = e.target.value.replace(/[^A-Za-z]/gi, "");
              setData({
                ...data,
                user: {
                  ...data.user,
                  last_name: filteredValue,
                },
              });
            }}
          />
          {/* {!!error && <p>Please enter your last name</p>} */}
        </div>
        <button type="submit" className={styles.username__button}>
          Continue<span>➜</span>
        </button>
      </form>
      <ApplyBack page={7} />
    </div>
  );
}
