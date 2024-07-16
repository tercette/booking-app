import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, deleteBooking, Booking } from '../store';

interface Props {
  onEdit: (booking: Booking) => void;
}

const BookingList: React.FC<Props> = ({ onEdit }) => {
  const bookings = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteBooking(id));
  };

  
  if (!Array.isArray(bookings)) {
    return <div>No bookings available</div>;
  }

  return (
    <div>
      <h2>Existing Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.startDate} to {booking.endDate}
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
            <button onClick={() => onEdit(booking)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
