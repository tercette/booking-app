import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, deleteBooking, Booking } from "../../store";
import { Card, BookingItem, DeleteButton, EditButton } from "./styles";

interface Props {
  onEdit: (booking: Booking) => void;
}



const BookingList: React.FC<Props> = ({ onEdit }) => {
  const bookings = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteBooking(id));
  };

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return (
      <Card>
        <p>No bookings available</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 style={{marginBottom:0}}>Existing Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <BookingItem key={booking.id}>
            <span>
              {booking.name} - {booking.startDate} to {booking.endDate}
            </span>
            <div>
              <DeleteButton onClick={() => handleDelete(booking.id)}>
                Delete
              </DeleteButton>
              <EditButton onClick={() => onEdit(booking)}>Edit</EditButton>
            </div>
          </BookingItem>
        ))}
      </ul>
    </Card>
  );
};

export default BookingList;
