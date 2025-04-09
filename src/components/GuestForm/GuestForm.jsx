import styles from "./GuestForm.module.css";
import PropTypes from "prop-types";
import countryCodes from "../../utils/countryCodes.json";

export default function GuestForm({ setIndex, setReservation, reservation }) {
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "phoneCode") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const countryCode = selectedOption.getAttribute("data-value");
      setReservation(prev => ({
        ...prev,
        phoneCode: value,
        countryCode,
      }));
      return;
    }
    setReservation(prev => ({
      ...prev,
      [name]: value,
    }));
  }
  function onClick() {
    setIndex(0);
  }

  function renderCountryCodes() {
    return countryCodes.map(country => (
      <option key={country.value} value={country.value}>
        {country.label}
      </option>
    ));
  }

  function renderPhoneCodes() {
    return countryCodes.map(country => (
      <option
        key={country.value}
        value={country.code}
        data-value={country.value}
      >
        {country.code} - {country.label}
      </option>
    ));
  }

  return (
    <form className={styles.guestForm}>
      <div className={styles.header}>
        <button type="button" onClick={onClick}>
          &#x2190;
        </button>
        <h2>Enter your details</h2>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>
            First name <span className={styles.label}>*</span>
          </div>
          <input
            type="text"
            name="firstName"
            className={styles.input}
            onChange={handleChange}
            value={reservation.firstName}
            required
            aria-required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>
            Last name <span className={styles.label}>*</span>
          </div>
          <input
            type="text"
            name="lastName"
            className={styles.input}
            onChange={handleChange}
            value={reservation.lastName}
            required
            aria-required
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>
            Email <span className={styles.label}>*</span>
          </div>
          <input
            type="email"
            name="email"
            className={styles.input}
            onChange={handleChange}
            value={reservation.email}
            required
            aria-required
          />
        </label>
      </div>
      <div className={styles.groupContainer}>
        <div className={styles.formGroup}>
          <label>
            <div>
              Code
              <span className={styles.label}>*</span>
            </div>
            <select
              name="phoneCode"
              value={reservation.phoneCode}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Select one</option>
              {renderPhoneCodes()}
            </select>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            <div>Phone number</div>
            <input
              type="tel"
              name="phoneNumber"
              onChange={handleChange}
              className={styles.input}
            />
          </label>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>
          <div>
            Address <span className={styles.label}>*</span>
          </div>
          <input
            type="text"
            name="street"
            className={styles.input}
            onChange={handleChange}
            value={reservation.street}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>
            City <span className={styles.label}>*</span>
          </div>
          <input
            type="text"
            name="city"
            className={styles.input}
            onChange={handleChange}
            value={reservation.city}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>Postal code</div>
          <input
            type="text"
            name="postalCode"
            className={styles.input}
            value={reservation.postalCode}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>
            Country <span className={styles.label}>*</span>
          </div>
          <select
            name="countryCode"
            value={reservation.countryCode}
            onChange={handleChange}
            className={styles.input}
          >
            <option value="">Select one</option>
            {renderCountryCodes()}
          </select>
        </label>
      </div>
    </form>
  );
}

GuestForm.propTypes = {
  setIndex: PropTypes.func.isRequired,
  setReservation: PropTypes.func.isRequired,
};
