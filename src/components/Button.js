import styles from "../css/Button.module.css";

export default function Button({ onClick, value, keys }) {
  return (
    <button name={keys} className={styles.button} onClick={onClick}>
      {value}
    </button>
  );
}
