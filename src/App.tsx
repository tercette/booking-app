// src/App.tsx
import React, { useState } from 'react';
import { styled } from '@stitches/react';
import CreateBooking from './components/CreateBooking';
import BookingList from './components/BookingList';

interface Booking {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  '@media(min-width: 768px)': {
    padding: '32px',
  },
});

const App: React.FC = () => {
  const [editingBooking, setEditingBooking] = useState<Booking | undefined>(undefined);

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const cancelEdit = () => {
    setEditingBooking(undefined);
  };

  return (
    <Container>
      <h1>Booking Management</h1>
      <CreateBooking bookingToEdit={editingBooking} onCancelEdit={cancelEdit} />
      <BookingList onEdit={handleEdit} />
    </Container>
  );
};

export default App;
