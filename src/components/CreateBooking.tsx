import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addBooking } from '../store';

const CreateBooking: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings);

  const isOverlapping = (newBooking: { startDate: string; endDate: string }) => {
    return bookings.some(
      booking =>
        (newBooking.startDate >= booking.startDate && newBooking.startDate <= booking.endDate) ||
        (newBooking.endDate >= booking.startDate && newBooking.endDate <= booking.endDate)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOverlapping({ startDate, endDate })) {
      dispatch(addBooking({ id: Date.now().toString(), startDate, endDate }));
      setStartDate('');
      setEndDate('');
    } else {
      alert('Overlapping booking detected!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default CreateBooking;