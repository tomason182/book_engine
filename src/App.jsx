import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker.jsx";
import Booking from "./components/Booking/Booking.jsx";
import PropertyInfo from "./components/PropertyInfo/PropertyInfo.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    street: "",
    postalCode: "",
    countryCode: "",
    selectedRooms: [],
    checkIn: "",
    checkOut: "",
    specialRequest: "",
  });

  const propertyInfo = {
    id: 10,
    property_name: "La Casa de Tomas",
    address: {
      street: "Las Flores 4220",
      city: "El bolsón",
      postal_code: 7250,
      alpha_2_code: "ar",
    },
    contact_info: {
      phone_number: "2281518168",
      country_code: "+549",
      email: "lacasadelviajerotomas@mail.com.ar",
    },
    currencies: {
      base_currency: "USD",
      payment_currency: "ARS",
    },
    created_at: "2025-01-25T17:34:31.000Z",
    updated_at: "2025-03-11T13:30:23.000Z",
  };

  const policies = {
    reservationPolicies: {
      min_length_stay: 2,
      max_length_stay: 0,
      min_advance_booking: 1,
      check_in_from: "11:00",
      check_in_to: "14:00",
      check_out_until: "21:00",
      payment_methods_accepted: [
        "debit_credit",
        "cash",
        "bank_transfer",
        "bitcoin",
      ],
    },
    advancePaymentPolicies: {
      advance_payment_required: true,
      deposit_amount: "0.35",
    },
    cancellationPolicies: [
      {
        id: 22,
        amount_refund: 0.5,
        days_before_arrival: 15,
      },
      {
        id: 23,
        amount_refund: 1,
        days_before_arrival: 30,
      },
    ],
    childrenPolicies: {
      allow_children: 1,
      children_min_age: 1,
      minors_room_types: "only_private",
      free_stay_age: 0,
    },
    otherPolicies: {
      quiet_hours_from: "13:30",
      quiet_hours_to: "09:06",
      smoking_areas: false,
      external_guest_allowed: true,
      pets_allowed: true,
    },
  };

  const contentToDisplay = [
    <DateRangePicker
      setIndex={setIndex}
      key="dateRangePicker"
      setReservation={setReservation}
      minAdvanceBooking={policies.reservationPolicies.min_advance_booking}
      minLengthStay={policies.reservationPolicies.min_length_stay}
      maxLengthStay={policies.reservationPolicies.max_length_stay}
    />,
    <Booking
      propertyInfo={propertyInfo}
      policies={policies}
      key="roomSelection"
    />,
  ];

  return (
    <>
      <Header name={propertyInfo.property_name} />
      <main className="mainContent">
        {contentToDisplay[index]}

        <PropertyInfo propertyInfo={propertyInfo} policies={policies} />
      </main>
      <Footer />
    </>
  );
}

export default App;
