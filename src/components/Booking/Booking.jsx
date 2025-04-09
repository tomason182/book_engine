import styles from "./Booking.module.css";
import { formatToLocaleDate } from "../../utils/dateFormattingHelper";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import GuestForm from "../GuestForm/GuestForm";
import PropTypes from "prop-types";
import Slider from "../Slider/Slider";

export default function Booking({ setReservation, reservation }) {
  const [availabilityResult, setAvailabilityResult] = useState({
    totalNights: 0,
    currencies: {
      id: 0,
      base_currency: "",
      payment_currency: "",
    },
    taxes: 0,
    paymentPolicies: {
      advance_payment_required: 0,
      deposit_amount: "",
    },
    roomList: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setAvailabilityResult({
      totalNights: 3,
      currencies: {
        id: 10,
        base_currency: "USD",
        payment_currency: "ARS",
      },
      taxes: 0.21,
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
    });
  }, []);

  const formattedCheckIn = formatToLocaleDate(reservation.checkIn);
  const formattedCheckOut = formatToLocaleDate(reservation.checkOut);
  const totalNights =
    (new Date(reservation.checkOut) - new Date(reservation.checkIn)) /
    (1000 * 3600 * 24);

  function handleClick() {
    if (index === 0) {
      setReservation(prev => ({
        ...prev,
        selectedRooms,
      }));

      setIndex(1);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert("Booking confirmed!");
      }, 2000);
    }
  }

  if (loading) return <Spinner />;

  const subtotal = availabilityResult?.roomList.reduce((acc, room) => {
    const selectedRoom = selectedRooms.find(
      selected => selected.id === room.id
    );
    return acc + (selectedRoom ? room.totalRate * selectedRoom.quantity : 0);
  }, 0);

  const taxes = subtotal * availabilityResult.taxes;
  const total = subtotal + taxes;
  return (
    <div className={styles.roomSelection}>
      {availabilityResult.roomList.length === 0 ? (
        <div className={styles.noRooms}>
          <h1>No rooms available</h1>
          <p>Please select different dates or check back later.</p>
        </div>
      ) : (
        <div className={styles.rightContainer}>
          {index === 0 ? (
            <RoomSelection
              availabilityResult={availabilityResult}
              setSelectedRooms={setSelectedRooms}
              selectedRooms={selectedRooms}
            />
          ) : (
            <GuestForm
              setIndex={setIndex}
              setReservation={setReservation}
              reservation={reservation}
            />
          )}
        </div>
      )}
      <div className={styles.leftContainer}>
        <div className={styles.summary}>
          <h1>Reservation summary</h1>
          <div className={styles.dates}>
            <p>{formattedCheckIn}</p>
            <span>&#x27A1;</span>
            <p>{formattedCheckOut}</p>
          </div>
          <span className={styles.totalNights}>{totalNights} nights</span>
        </div>
        <div className={styles.rooms}>
          <h2>Price Details</h2>
          <ul>
            {selectedRooms.map(room => {
              const roomDetails = availabilityResult.roomList.find(
                item => item.id === room.id
              );
              return (
                <li key={room.id}>
                  <p>
                    {room.quantity} x {roomDetails.description}
                  </p>
                  <span>
                    {availabilityResult.currencies.base_currency}{" "}
                    {roomDetails.totalRate * room.quantity}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.total}>
          <div>
            <h3>Subtotal</h3>
            <span>
              {availabilityResult.currencies.base_currency}{" "}
              {availabilityResult.roomList.reduce((acc, room) => {
                const selectedRoom = selectedRooms.find(
                  selected => selected.id === room.id
                );
                return (
                  acc +
                  (selectedRoom ? room.totalRate * selectedRoom.quantity : 0)
                );
              }, 0)}
            </span>
          </div>
          <div>
            <h3>Taxes</h3>
            <span>
              {availabilityResult.currencies.base_currency} {taxes.toFixed(2)}
            </span>
          </div>
          <div>
            <h3>Total</h3>
            <span>
              {availabilityResult.currencies.base_currency} {total}
            </span>
          </div>
          <div>
            <h3>Deposit</h3>
            <span>
              {availabilityResult.currencies.base_currency}{" "}
              {(
                total * availabilityResult.paymentPolicies.deposit_amount
              ).toFixed(2)}
            </span>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={handleClick}
            disabled={selectedRooms.length === 0}
          >
            {index === 0 ? "Continue" : "Book now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RoomSelection({
  availabilityResult,
  setSelectedRooms,
  selectedRooms,
}) {
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
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1709805619372-40de3f158e83?q=80&w=1495&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1623625434462-e5e42318ae49?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      id: 7,
      images: [
        "https://plus.unsplash.com/premium_photo-1679088034974-2c9c01d59992?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  const handleRoomSelection = e => {
    const { name, value } = e.target;
    const roomId = parseInt(name);
    const quantity = parseInt(value);
    if (quantity === 0) {
      setSelectedRooms(prevRooms =>
        prevRooms.filter(room => room.id !== roomId)
      );
      return;
    }
    const existingRoom = selectedRooms.find(room => room.id === roomId);
    if (existingRoom) {
      setSelectedRooms(prevRooms =>
        prevRooms.map(room =>
          room.id === roomId ? { ...room, quantity: quantity } : room
        )
      );
    } else {
      setSelectedRooms(prevRooms => [...prevRooms, { id: roomId, quantity }]);
    }
  };
  return (
    <>
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
                <Slider imageList={roomImage.images} />
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
                  {availabilityResult.currencies.base_currency} {room.totalRate}
                </p>
                <span>{availabilityResult.totalNights} nights</span>
                <select
                  id="roomSelection"
                  name={room.id}
                  onChange={handleRoomSelection}
                  value={
                    selectedRooms.find(selected => selected.id === room.id)
                      ? selectedRooms.find(selected => selected.id === room.id)
                          .quantity
                      : 0
                  }
                >
                  <option value={0}>0</option>
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
    </>
  );
}

Booking.PropTypes = {
  setReservation: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    specialRequest: PropTypes.string,
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    selectedRooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};
