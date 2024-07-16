import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, deleteBooking } from '../store';

const BookingList: React.FC = () => {
  const bookings = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Existing Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.startDate} to {booking.endDate}
            <button onClick={() => dispatch(deleteBooking(booking.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;