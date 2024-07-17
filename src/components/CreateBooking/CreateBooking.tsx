import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Booking, RootState, addBooking, updateBooking } from "../../store";
import { Card, Form, FormGroup, Label, Input, Button } from "./styles";

interface Props {
  bookingToEdit?: Booking;
  onCancelEdit: () => void;
}

const CreateBooking: React.FC<Props> = ({ bookingToEdit, onCancelEdit }) => {
  const [name, setName] = useState<string>(bookingToEdit?.name || "");
  const [startDate, setStartDate] = useState<string>(
    bookingToEdit?.startDate || ""
  );
  const [endDate, setEndDate] = useState<string>(bookingToEdit?.endDate || "");
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    if (bookingToEdit) {
      setName(bookingToEdit.name);
      setStartDate(bookingToEdit.startDate);
      setEndDate(bookingToEdit.endDate);
    }
  }, [bookingToEdit]);

  const isOverlapping = (newBooking: Booking) => {
    if (!Array.isArray(bookings)) {
      return false;
    }

    return bookings.some((booking) => {
      if (bookingToEdit && booking.id === bookingToEdit.id) {
        return false;
      }
      return (
        ((newBooking.startDate >= booking.startDate &&
          newBooking.startDate <= booking.endDate) ||
          (newBooking.endDate >= booking.startDate &&
            newBooking.endDate <= booking.endDate)) &&
        newBooking.name === booking.name
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
        setName("");
        setStartDate("");
        setEndDate("");
        onCancelEdit();
      } else {
        alert("Overlapping booking detected!");
      }
    } else {
      alert("End date must be after start date!");
    }
  };

  return (
    <Card>
      <h2>{bookingToEdit ? "Edit Booking" : "Create a Booking"}</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="nameInput">Name:</Label>
          <Input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="startDateInput">Start Date:</Label>
          <Input
            id="startDateInput"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="endDateInput">End Date:</Label>
          <Input
            id="endDateInput"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">
          {bookingToEdit ? "Update Booking" : "Create Booking"}
        </Button>
        {bookingToEdit && (
          <Button type="button" onClick={onCancelEdit}>
            Cancel Edit
          </Button>
        )}
      </Form>
    </Card>
  );
};

export default CreateBooking;
