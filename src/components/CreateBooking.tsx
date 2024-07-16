import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Booking, RootState, addBooking, updateBooking } from '../store';

interface Props {
  bookingToEdit?: Booking;
  onCancelEdit: () => void;
}

const CreateBooking: React.FC<Props> = ({ bookingToEdit, onCancelEdit }) => {
  const [name, setName] = useState<string>(bookingToEdit?.name || '');
  const [startDate, setStartDate] = useState<string>(bookingToEdit?.startDate || '');
  const [endDate, setEndDate] = useState<string>(bookingToEdit?.endDate || '');
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    if (bookingToEdit) {
      setName(bookingToEdit.name);
      setStartDate(bookingToEdit.startDate);
      setEndDate(bookingToEdit.endDate);
    }
  }, [bookingToEdit]);

  const isOverlapping = (newBooking: { startDate: string; endDate: string }) => {
    if (!Array.isArray(bookings)) {
      return false;
    }

    return bookings.some(booking => {
      if (bookingToEdit && booking.id === bookingToEdit.id) {
        return false;
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
      const bookingData: Booking = {
        id: bookingToEdit?.id || Date.now().toString(),
        name,
        startDate,
        endDate,
      };

      if (!isOverlapping(bookingData)) {
        if (bookingToEdit) {
          dispatch(updateBooking(bookingData));
        } else {
          dispatch(addBooking(bookingData));
        }
        setName('');
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
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
