import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CreateBooking from "./CreateBooking";
import { RootState } from "../../store";

// Mock onCancelEdit
const mockOnCancelEdit = jest.fn();

// Cria um mock store
const mockStore = configureStore<RootState>([]);

describe("CreateBooking", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      bookings: [
        { id: "1", name: "John Doe", startDate: "2023-07-20", endDate: "2023-07-25" },
        { id: "2", name: "Jane Smith", startDate: "2023-08-01", endDate: "2023-08-05" },
      ],
    });
  });

  it("renders CreateBooking form correctly", () => {
    render(
      <Provider store={store}>
        <CreateBooking onCancelEdit={mockOnCancelEdit} />
      </Provider>
    );

    expect(screen.getByText("Create a Booking")).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date:")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date:")).toBeInTheDocument();
    expect(screen.getByText("Create Booking")).toBeInTheDocument();
  });

  it("renders Edit Booking form correctly when bookingToEdit is provided", () => {
    const bookingToEdit = { id: "1", name: "John Doe", startDate: "2023-07-20", endDate: "2023-07-25" };

    render(
      <Provider store={store}>
        <CreateBooking bookingToEdit={bookingToEdit} onCancelEdit={mockOnCancelEdit} />
      </Provider>
    );

    expect(screen.getByText("Edit Booking")).toBeInTheDocument();
    expect(screen.getByLabelText("Name:")).toHaveValue("John Doe");
    expect(screen.getByLabelText("Start Date:")).toHaveValue("2023-07-20");
    expect(screen.getByLabelText("End Date:")).toHaveValue("2023-07-25");
    expect(screen.getByText("Update Booking")).toBeInTheDocument();
    expect(screen.getByText("Cancel Edit")).toBeInTheDocument();
  });

  it("calls onCancelEdit when Cancel Edit button is clicked", () => {
    const bookingToEdit = { id: "1", name: "John Doe", startDate: "2023-07-20", endDate: "2023-07-25" };

    render(
      <Provider store={store}>
        <CreateBooking bookingToEdit={bookingToEdit} onCancelEdit={mockOnCancelEdit} />
      </Provider>
    );

    const cancelButton = screen.getByText("Cancel Edit");
    fireEvent.click(cancelButton);

    expect(mockOnCancelEdit).toHaveBeenCalled();
  });


  it("alerts when form is submitted with overlapping booking", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <Provider store={store}>
        <CreateBooking onCancelEdit={mockOnCancelEdit} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Jane Smith" } });
    fireEvent.change(screen.getByLabelText("Start Date:"), { target: { value: "2023-08-02" } });
    fireEvent.change(screen.getByLabelText("End Date:"), { target: { value: "2023-08-04" } });

    const submitButton = screen.getByText("Create Booking");
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("Overlapping booking detected!");
  });

  it("alerts when form is submitted with end date before start date", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <Provider store={store}>
        <CreateBooking onCancelEdit={mockOnCancelEdit} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Start Date:"), { target: { value: "2023-07-25" } });
    fireEvent.change(screen.getByLabelText("End Date:"), { target: { value: "2023-07-20" } });

    const submitButton = screen.getByText("Create Booking");
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("End date must be after start date!");
  });
});
