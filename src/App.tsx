
import React from 'react';
import { styled } from '@stitches/react';
import CreateBooking from './components/CreateBooking';
import BookingList from './components/BookingList';

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
  return (
    <Container>
      <h1>Booking Management</h1>
      <CreateBooking />
      <BookingList />
    </Container>
  );
};

export default App;
