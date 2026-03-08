// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./app"; // <- match the actual filename and omit .tsx
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);