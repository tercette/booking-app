// src/components/CreateBooking.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, addBooking, updateBooking } from '../store';

interface Props {
  bookingToEdit?: { id: string; startDate: string; endDate: string };
  onCancelEdit: () => void;
}

const CreateBooking: React.FC<Props> = ({ bookingToEdit, onCancelEdit }) => {
  const [startDate, setStartDate] = useState<string>(bookingToEdit?.startDate || '');
  const [endDate, setEndDate] = useState<string>(bookingToEdit?.endDate || '');
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    if (bookingToEdit) {
      setStartDate(bookingToEdit.startDate);
      setEndDate(bookingToEdit.endDate);
    }
  }, [bookingToEdit]);

  const isOverlapping = (newBooking: { startDate: string; endDate: string }) => {
    return bookings.some(booking => {
      if (bookingToEdit && booking.id === bookingToEdit.id) {
        return false; // Ignore current booking being edited
      }
      return (
        (newBooking.startDate >= booking.startDate && newBooking.startDate <= booking.endDate) ||
        (newBooking.endDate >= booking.startDate && newBooking.endDate <= booking.endDate)
      );
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate && startDate <= endDate) {
      if (!isOverlapping({ startDate, endDate })) {
        if (bookingToEdit) {
          dispatch(updateBooking({ ...bookingToEdit, startDate, endDate }));
        } else {
          dispatch(addBooking({ id: Date.now().toString(), startDate, endDate }));
        }
        setStartDate('');
        setEndDate('');
        onCancelEdit();
      } else {
        alert('Overlapping booking detected!');
      }
    } else {
      alert('End date must be after start date!');
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
      <button type="submit">{bookingToEdit ? 'Update Booking' : 'Create Booking'}</button>
      {bookingToEdit && <button type="button" onClick={onCancelEdit}>Cancel Edit</button>}
    </form>
  );
};

export default CreateBooking;
