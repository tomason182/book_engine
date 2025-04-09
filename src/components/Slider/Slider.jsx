import { useState } from "react";
import styles from "./Slider.module.css";
import PropTypes from "prop-types";

export default function Slider({ imageList = [] }) {
  // State to manage the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(currentSlide);

  function handleNextClick() {
    // Logic to show the next image
    setCurrentSlide(prev => (prev + 1) % imageList.length);
  }
  function handlePrevClick() {
    // Logic to show the previous image
    setCurrentSlide(prev => (prev - 1 + imageList.length) % imageList.length);
  }

  return (
    <div className={styles.sliderContainer}>
      {imageList.map((image, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentSlide ? styles.active : ""
          }`}
        >
          <img src={image} alt={`Slide ${index}`} className={styles.image} />
        </div>
      ))}
      <button className={styles.prev} onClick={() => handlePrevClick()}>
        &#10094;
      </button>
      <button className={styles.next} onClick={() => handleNextClick()}>
        &#10095;
      </button>
    </div>
  );
}

Slider.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
Slider.defaultProps = {
  imageList: [],
};
