import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import BookingList from "./BookingList";
import { RootState } from "../../store";

// Mock o onEdit prop
const mockOnEdit = jest.fn();

// Cria um mock store
const mockStore = configureStore<RootState>([]);

describe("BookingList", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      bookings: [
        { id: "1", name: "John Doe", startDate: "2023-07-20", endDate: "2023-07-25" },
        { id: "2", name: "Jane Smith", startDate: "2023-08-01", endDate: "2023-08-05" },
      ],
    });
  });

  it("renders bookings correctly", () => {
    render(
      <Provider store={store}>
        <BookingList onEdit={mockOnEdit} />
      </Provider>
    );

    expect(screen.getByText("Existing Bookings")).toBeInTheDocument();
    expect(screen.getByText("John Doe - 2023-07-20 to 2023-07-25")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith - 2023-08-01 to 2023-08-05")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <Provider store={store}>
        <BookingList onEdit={mockOnEdit} />
      </Provider>
    );

    const editButtons = screen.getAllByText("Edit");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith({ id: "1", name: "John Doe", startDate: "2023-07-20", endDate: "2023-07-25" });
  });

  it("dispatches deleteBooking action when delete button is clicked", () => {
    render(
      <Provider store={store}>
        <BookingList onEdit={mockOnEdit} />
      </Provider>
    );

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: "bookings/deleteBooking", payload: "1" }]);
  });

  it("shows 'No bookings available' when no bookings", () => {
    store = mockStore({
      bookings: [],
    });

    render(
      <Provider store={store}>
        <BookingList onEdit={mockOnEdit} />
      </Provider>
    );

    expect(screen.getByText("No bookings available")).toBeInTheDocument();
  });
});
