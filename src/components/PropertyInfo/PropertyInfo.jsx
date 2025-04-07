import { useEffect } from "react";
import styles from "./PropertyInfo.module.css";
import { useState } from "react";
import PropTypes from "prop-types";

export default function PropertyInfo({ propertyInfo, policies }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = window.innerWidth <= 768;
  const imagesPerSlide = isMobile ? 1 : 4;

  const images = [
    {
      url: "https://images.unsplash.com/photo-1626265774643-f1943311a86b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "hostel_image_01",
    },
    {
      url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "hostel_image_02",
    },
    {
      url: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      atl: "hostel_image_03",
    },
    {
      url: "https://images.unsplash.com/photo-1586214601498-4dbcfd0bf2c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zdGVsfGVufDB8fDB8fHwy",
      alt: "hostel_image_04",
    },
    {
      url: "https://images.unsplash.com/photo-1590856029620-9b5a4825d3be?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "hostel_image_05",
    },
    {
      url: "https://images.unsplash.com/photo-1547371890-cd66a3dcf386?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvc3RlbHxlbnwwfHwwfHx8Mg%3D%3D",
      alt: "hostel_image_06",
    },
  ];

  const propertyAmenities = {
    bathroom: [
      "Toilet paper",
      "Hair dryer",
      "Shower",
      "Hot water",
      "Free towels",
    ],
    bedrooms: ["Lines"],
    kitchen: [
      "Share kitchen",
      "Dining table",
      "Toaster",
      "Oven",
      "Microwave",
      "Refrigerator",
    ],
    livingArea: ["Dining area", "Sofa", "Fireplace", "Sitting area"],
    internet: ["Free wifi"],
    parking: ["Free parking"],
    frontDeskService: ["Baggage storage", "Currency exchange"],
    cleaningService: ["Laundry", "Washing machine"],
    safetyAndSecurity: ["Fire extinguishers", "24-hour security"],
  };

  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleImages = () => {
    const start = currentSlide;
    return images.slice(start, start + imagesPerSlide);
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide(0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.subContent}>
        <h1>Property Information</h1>
        <div className={styles.carouselWrapper}>
          <button onClick={prevSlide} className={styles.navButton}>
            &#10094;
          </button>
          <div className={styles.carousel}>
            {getVisibleImages().map((image, index) => (
              <div key={index} className={styles.slide}>
                <img src={image.url} alt={image.alt} />
              </div>
            ))}
          </div>
          <button onClick={nextSlide} className={styles.navButton}>
            &#10095;
          </button>
        </div>
      </div>
      <div className={styles.subContent}>
        <h1>Address and Contact</h1>
        <div className={styles.contactInfoGroup}>
          <div>
            <ul className={styles.contactInfoList}>
              <li>{propertyInfo.address.street}</li>
              <li>{propertyInfo.address.city}</li>
              <li>{propertyInfo.address.alpha_code_2}</li>
              <li>
                {propertyInfo.contact_info.country_code}
                {propertyInfo.contact_info.phone_number}
              </li>
              <li>{propertyInfo.contact_info.email}</li>
            </ul>
          </div>
          <div className={styles.map}>
            <iframe
              width="425"
              height="350"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-71.54559195041658%2C-41.949700153571975%2C-71.53960525989534%2C-41.94732624431202&amp;layer=mapnik"
            ></iframe>
            <br />
            <small>
              <a href="https://www.openstreetmap.org/?#map=18/-41.948513/-71.542599">
                View Larger Map
              </a>
            </small>
          </div>
        </div>
      </div>
      <div className={styles.subContent}>
        <h1>Property Facilities</h1>
        <div className={styles.facilitiesGrid}>
          {Object.keys(propertyAmenities).map((key, index) => (
            <div key={index} className={styles.facilitiesGroup}>
              <h4>{key}</h4>
              <ul>
                {propertyAmenities[key].map((amenity, index) => (
                  <li key={index}>&#x2713;&nbsp;{amenity}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.subContent}>
        <h1>Property Policies</h1>
        <ul className={styles.policiesList}>
          <li>
            <h2>Check-in Time</h2>
            <ul>
              <li>from: {policies.reservationPolicies.check_in_from} hs</li>
              <li>to: {policies.reservationPolicies.check_in_to} hs</li>
            </ul>
          </li>
          <li>
            <h2>Check-out</h2>
            <ul>
              <li>Until: {policies.reservationPolicies.check_out_until}</li>
            </ul>
          </li>
          <li>
            <h2>Length of Stay</h2>
            <ul>
              <li>
                The minimum length of stay is{" "}
                {policies.reservationPolicies.min_length_stay} nights
              </li>
              {policies.reservationPolicies.max_length_stay > 0 && (
                <li>
                  The maximum length of stay is $
                  {policies.reservationPolicies.max_length_stay} nights
                </li>
              )}
            </ul>
          </li>
          <li>
            <h2>Advance payment</h2>
            {policies.advancePaymentPolicies.advance_payment_required ===
            true ? (
              <p>
                This property request a deposit of{" "}
                {parseFloat(policies.advancePaymentPolicies.deposit_amount) *
                  100}
                %. You will arrange the payment of the deposit amount with the
                property owner after confirming the reservation
              </p>
            ) : (
              <p>
                This property does not request any deposit or advance payment
                when booking
              </p>
            )}
          </li>
          <li>
            <h2>Cancellation Policies</h2>
            {Array.isArray(policies.cancellationPolicies) &&
            policies.cancellationPolicies.length > 0 ? (
              policies.cancellationPolicies.map((policy, index) => (
                <p key={index}>
                  {parseFloat(policy.amount_refund) * 100}% of the deposit will
                  be return if guest cancel the reservation{" "}
                  {policy.days_before_arrival} days before arrival
                </p>
              ))
            ) : (
              <p>
                Cancellation are not allow. Any deposit paid will not be
                refunded
              </p>
            )}
          </li>
          <li>
            <h2>Children policies</h2>
            {policies.childrenPolicies.allow_children === 1 ? (
              <ul>
                <li>
                  Children minimum age allowed:{" "}
                  {policies.childrenPolicies.children_min_age === 0
                    ? "Children of all age are welcome."
                    : `+${policies.childrenPolicies.children_min_age} years old`}
                </li>
                <li>
                  Children room types restrictions:{" "}
                  {policies.childrenPolicies.minors_room_types}
                </li>
                {policies.childrenPolicies.free_stay_age > 0 && (
                  <li>
                    Children under {policies.childrenPolicies.free_stay_age}{" "}
                    years old can stay free of charge
                  </li>
                )}
              </ul>
            ) : (
              <p>Children are not allowed in this property </p>
            )}
          </li>
          <li>
            <h2>House rules</h2>
            <ul>
              <li>
                <h3>Quite hours</h3>
                {policies.otherPolicies.quiet_hours_from && (
                  <p>From: {policies.otherPolicies.quiet_hours_from}</p>
                )}
                {policies.otherPolicies.quiet_hours_to && (
                  <p>To: {policies.otherPolicies.quiet_hours_to}</p>
                )}
              </li>
              <li>
                <h3>Smoking rules</h3>
                {policies.otherPolicies.smoking_areas === false ? (
                  <p>Smoke-free property</p>
                ) : (
                  <p>Designated smoking areas</p>
                )}
              </li>
              <li>
                <h3>External guest rule</h3>
                {policies.otherPolicies.external_guest_allowed === true ? (
                  <p>External guest are welcome in this property</p>
                ) : (
                  <p>External guests are not allowed in this property</p>
                )}
              </li>
              <li>
                <h3>Pets rule</h3>
                {policies.otherPolicies.pets_allowed === true ? (
                  <p>Pets are allowed</p>
                ) : (
                  <p>Pets are not allowed</p>
                )}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

PropertyInfo.propTypes = {
  propertyInfo: PropTypes.object.isRequired,
  policies: PropTypes.object.isRequired,
};
