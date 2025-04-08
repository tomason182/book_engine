import styles from "./GuestForm.module.css";

export default function GuestForm({ setIndex }) {
  function onClick() {
    setIndex(0);
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
            required
            aria-required
          />
        </label>
      </div>
      <div className={styles.groupContainer}>
        <div className={styles.formGroup}>
          <label>
            <div>
              Phone number <span className={styles.label}>*</span>
            </div>
            <select name="phoneCode" id="">
              <option value="ar">+549</option>
              <option value="cl">+569</option>
              <option value="uy">+598</option>
              <option value="us">+1</option>
            </select>
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>
            <span className={styles.label} style={{ visibility: "hidden" }}>
              Phone number
            </span>
            <input type="tel" name="phone" className={styles.input} />
          </label>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>
          <div>
            Address <span className={styles.label}>*</span>
          </div>
          <input type="text" name="Street" className={styles.input} />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>
            City <span className={styles.label}>*</span>
          </div>
          <input type="text" name="city" className={styles.input} />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>Postal code</div>
          <input type="text" name="postalCode" className={styles.input} />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          <div>
            Country <span className={styles.label}>*</span>
          </div>
          <select name="country">
            <option value="ar">Argentina</option>
            <option value="cl">Chile</option>
            <option value="uy">Uruguay</option>
          </select>
        </label>
      </div>
    </form>
  );
}
