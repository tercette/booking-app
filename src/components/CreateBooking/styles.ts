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
    paddingRight: "16px",
  });
  
export  const Form = styled("form", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  });
  
export  const FormGroup = styled("div", {
    marginBottom: "16px",
    width: "90%",
  });
  
export  const Label = styled("label", {
    marginBottom: "8px",
    fontWeight: "bold",
    display: "block",
  });
  
export  const Input = styled("input", {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    transition: "border-color 0.3s ease",
    "&:focus": {
      borderColor: "#3498db",
      outline: "none",
    },
    width: "100%",
  });
  
export  const Button = styled("button", {
    padding: "12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    backgroundColor: "#3498db",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#2980b9",
    },
    marginTop: "8px",
    width: "100%",
  });