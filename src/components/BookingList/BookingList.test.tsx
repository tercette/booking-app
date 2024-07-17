import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import { Provider } from "react-redux";
import store, { Booking } from "../../store";
import BookingList from "./BookingList";
import { deleteBooking } from "../../store";

describe("BookingList Component", () => {
  test("handles delete booking action", () => {
    const bookings = [
      {
        id: "1",
        name: "John Doe",
        startDate: "2024-07-20",
        endDate: "2024-07-25",
      },
      {
        id: "2",
        name: "Jane Smith",
        startDate: "2024-08-01",
        endDate: "2024-08-05",
      },
    ];

    render(
      <Provider store={store}>
        <BookingList onEdit={function (booking: Booking): void {
                throw new Error("Function not implemented.");
            } } />
      </Provider>
    );

    bookings.forEach((booking) => {
      const bookingItem = screen.getByText(
        `${booking.name} - ${booking.startDate} to ${booking.endDate}`
      );

      const deleteButton = within(bookingItem).getByText("Delete");

      fireEvent.click(deleteButton);

      expect(store.dispatch).toHaveBeenCalledWith(deleteBooking(booking.id));
    });
  });
});
