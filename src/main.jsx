import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ShippingForm from "./ShippingForm.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ShippingForm />
    </StrictMode>
);
