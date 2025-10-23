import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handlers for better functionality
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Prevent default error handling
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent default error handling
  event.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);
