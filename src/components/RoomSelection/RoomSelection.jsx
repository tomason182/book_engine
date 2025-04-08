import styles from "./RoomSelection.module.css";
import { formatToLocaleDate } from "../../utils/dateFormattingHelper";

export default function RoomSelection() {
  const availabilityResult = {
    totalNights: 3,
    currencies: {
      id: 10,
      base_currency: "USD",
      payment_currency: "ARS",
    },
    paymentPolicies: {
      advance_payment_required: 1,
      deposit_amount: "0.35",
    },
    roomList: [
      {
        id: 2,
        description: "Dormitory - 4max",
        type: "dorm",
        gender: "mixed",
        max_occupancy: 4,
        inventory: 2,
        availability: 6,
        totalRate: 45,
      },
      {
        id: 7,
        description: "Private room 2max (doble bed)",
        type: "private",
        gender: "mixed",
        max_occupancy: 2,
        inventory: 2,
        availability: 1,
        totalRate: 225,
      },
    ],
  };

  const roomAmenities = [
    {
      id: 2,
      amenities: ["wifi", "breakfast", "tv", "air_conditioning", "heating"],
    },
    {
      id: 7,
      amenities: ["wifi", "breakfast", "tv", "air_conditioning", "heating"],
    },
    {
      id: 10,
      amenities: [
        "wifi",
        "breakfast",
        "tv",
        "air_conditioning",
        "heating",
        "kitchen",
      ],
    },
  ];

  const roomImages = [
    {
      id: 2,
      images: [
        "https://placehold.co/300",
        "https://placehold.co/300",
        "https://placehold.co/300",
      ],
    },
    {
      id: 7,
      images: [
        "https://placehold.co/300",
        "https://placehold.co/300",
        "https://placehold.co/300",
      ],
    },
    {
      id: 10,
      images: [
        "https://placehold.co/300",
        "https://placehold.co/300",
        "https://placehold.co/300",
      ],
    },
  ];

  const checkIn = formatToLocaleDate("2025-01-25");
  const checkOut = formatToLocaleDate("2025-01-28");
  return (
    <div className={styles.roomSelection}>
      {availabilityResult.roomList.length === 0 ? (
        <div className={styles.noRooms}>
          <h1>No rooms available</h1>
          <p>Please select different dates or check back later.</p>
        </div>
      ) : (
        <div className={styles.rightContainer}>
          {availabilityResult.roomList.map(room => {
            const roomImage = roomImages.find(image => image.id === room.id);
            const roomAmenity = roomAmenities.find(
              amenity => amenity.id === room.id
            );
            const availability = room.availability;

            return (
              <div key={room.id} className={styles.roomCard}>
                <div className={styles.roomDetails}>
                  <div className={styles.roomImage}>
                    {/* Here we need an image slider, not a single image */}
                    <img
                      src={
                        roomImage && roomImage.images.length > 0
                          ? roomImage.images[0]
                          : "https://placehold.co/400"
                      }
                      alt={room.description}
                    />
                  </div>
                  <div className={styles.details}>
                    <h3>{room.description}</h3>
                    <span>
                      {room.type === "private" ? "Private" : "Dormitory"}{" "}
                      {room.max_occupancy}
                    </span>
                    <ul>
                      {roomAmenity &&
                        roomAmenity.amenities.map((amenity, index) => (
                          <li key={index}>&#x1F5F8; {amenity}</li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.priceDetails}>
                  <div className={styles.rates}>
                    <h4>Standard Rate</h4>
                    <p>Deposits:</p>
                    <p>Cancellations:</p>
                  </div>

                  <div className={styles.price}>
                    <p>
                      {availabilityResult.currencies.base_currency}{" "}
                      {room.totalRate}
                    </p>
                    <span>{availabilityResult.totalNights} nights</span>
                    <select name="roomSelection" id="roomSelection">
                      <option value="select">Select</option>
                      {Array.from({ length: availability }, (_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.leftContainer}>
        <div className={styles.summary}>
          <h1>Reservation summary</h1>
          <div className={styles.dates}>
            <p>{checkIn}</p>
            <span>&#x27A1;</span>
            <p>{checkOut}</p>
          </div>

          <span className={styles.totalNights}>
            {availabilityResult.totalNights} nights
          </span>
        </div>
      </div>
    </div>
  );
}
