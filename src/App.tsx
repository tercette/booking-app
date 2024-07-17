import React, { useState } from "react";
import { styled } from "@stitches/react";
import CreateBooking from "./components/CreateBooking/CreateBooking";
import BookingList from "./components/BookingList/BookingList";

interface Booking {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "16px",
  gap: 10,
  "@media(min-width: 768px)": {
    padding: "32px",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
});

const App: React.FC = () => {
  const [editingBooking, setEditingBooking] = useState<Booking | undefined>(
    undefined
  );

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const cancelEdit = () => {
    setEditingBooking(undefined);
  };

  return (
    <Container>
      <CreateBooking bookingToEdit={editingBooking} onCancelEdit={cancelEdit} />
      <BookingList onEdit={handleEdit} />
    </Container>
  );
};

export default App;
