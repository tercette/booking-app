import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import  store  from '../../store';
import CreateBooking from './CreateBooking';

describe('CreateBooking Component', () => {
  test('renders create booking form', () => {
    render(
      <Provider store={store}>
        <CreateBooking onCancelEdit={() => {}} />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText('Enter your name');
    const startDateInput = screen.getByLabelText(/Start Date:/i);
    const endDateInput = screen.getByLabelText(/End Date:/i);
    const createButton = screen.getByText('Create Booking');

    expect(nameInput).toBeInTheDocument();
    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  test('submits form with valid data', () => {
    const mockOnCancelEdit = jest.fn();

    render(
      <Provider store={store}>
        <CreateBooking onCancelEdit={mockOnCancelEdit} />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText('Enter your name');
    const startDateInput = screen.getByLabelText(/Start Date:/i);
    const endDateInput = screen.getByLabelText(/End Date:/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(startDateInput, { target: { value: '2024-07-20' } });
    fireEvent.change(endDateInput, { target: { value: '2024-07-25' } });

    const createButton = screen.getByText('Create Booking');
    fireEvent.click(createButton);

    expect(mockOnCancelEdit).toHaveBeenCalled();
  });
});
