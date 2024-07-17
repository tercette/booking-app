import { styled } from "@stitches/react";

export const Card = styled("div", {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    marginBottom: "16px",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  });
  
  export const BookingItem = styled("li", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    marginBottom: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  });
  
  export const DeleteButton = styled("button", {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    backgroundColor: "#e74c3c",
    color: "#fff",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: "#c0392b",
    },
  });
  
  export const EditButton = styled("button", {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    backgroundColor: "#3498db",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#2980b9",
    },
  });