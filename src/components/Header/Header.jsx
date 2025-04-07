import styles from "./Header.module.css";
import PropTypes from "prop-types";

export default function Header({ name }) {
  return (
    <header className={styles.header}>
      <div className={styles.hostelName}>
        <h1>{name}</h1>
      </div>
      <div className={styles.options}>
        <select name="language" id="language">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
        <select name="currency" id="currency">
          <option value="usd">USD</option>
          <option value="ars">ARS</option>
        </select>
      </div>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
