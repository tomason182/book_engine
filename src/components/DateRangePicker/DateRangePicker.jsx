import styles from "./DateRangePicker.module.css";
export default function DateRangePicker() {
  return (
    <div className={styles.container}>
      <form className={styles.datePickerForm}>
        <h1>Select stay days</h1>
        <div className={styles.formGroup}>
          <label htmlFor="checkIn">Check-in</label>
          <input type="date" name="checkIn" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkOut">Check-out</label>
          <input type="date" name="checkOut" required />
        </div>

        <button>Search</button>
      </form>
    </div>
  );
}
