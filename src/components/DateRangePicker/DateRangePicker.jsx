import styles from "./DateRangePicker.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export default function DateRangePicker({
  setReservation,
  setIndex,
  minLengthStay,
  minAdvanceBooking,
}) {
  const [dates, setDate] = useState({
    checkIn: "",
    checkOut: "",
    minCheckIn: "",
    maxCheckIn: "",
    minCheckOut: "",
  });

  useEffect(() => {
    function setInitialDates() {
      const today = new Date();
      const minCheckInDate = new Date(
        today.setDate(today.getDate() + minAdvanceBooking)
      );
      const minCheckOutDate = new Date(
        today.setDate(minCheckInDate.getDate() + minLengthStay)
      );
      setDate({
        checkIn: minCheckInDate.toISOString().split("T")[0],
        checkOut: minCheckOutDate.toISOString().split("T")[0],
        minCheckIn: minCheckInDate.toISOString().split("T")[0],
        minCheckOut: minCheckOutDate.toISOString().split("T")[0],
      });
    }
    setInitialDates();
    // Set the initial dates when the component mounts
  }, [minAdvanceBooking, minLengthStay]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (!value) return;
    if (name === "checkIn") {
      const checkIn = new Date(value);
      const minCheckOutDate = new Date(checkIn);
      minCheckOutDate.setDate(minCheckOutDate.getDate() + minLengthStay);

      if (dates.checkOut && new Date(dates.checkOut) < minCheckOutDate) {
        setDate(prev => ({
          ...prev,
          checkOut: minCheckOutDate.toISOString().split("T")[0],
        }));
      }
      setDate(prev => ({
        ...prev,
        checkIn: value,
        minCheckOut: minCheckOutDate.toISOString().split("T")[0],
      }));
    } else {
      setDate(prev => ({
        ...prev,
        checkOut: value,
        maxCheckIn: new Date(
          new Date(value).setDate(new Date(value).getDate() - minLengthStay)
        )
          .toISOString()
          .split("T")[0],
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const checkInDate = e.target.checkIn.value;
    const checkOutDate = e.target.checkOut.value;

    setReservation(prev => ({
      ...prev,
      checkIn: checkInDate,
      checkOut: checkOutDate,
    }));
    setIndex(1);
  };

  return (
    <div className={styles.container}>
      <form className={styles.datePickerForm} onSubmit={handleSubmit}>
        <h1>Book your stay</h1>
        <div className={styles.formGroup}>
          <label htmlFor="checkIn">Check-in</label>
          <input
            type="date"
            name="checkIn"
            required
            min={dates.minCheckIn}
            max={dates.maxCheckIn}
            onChange={handleChange}
            value={dates.checkIn}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="checkOut">Check-out</label>
          <input
            type="date"
            name="checkOut"
            required
            onChange={handleChange}
            min={dates.minCheckOut}
            value={dates.checkOut}
          />
        </div>

        <button type="submit">Search</button>
      </form>
    </div>
  );
}

DateRangePicker.propTypes = {
  setReservation: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
};
