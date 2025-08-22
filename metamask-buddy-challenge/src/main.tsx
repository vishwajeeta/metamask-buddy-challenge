// main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import RootLayout from "./RootLayout.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <RootLayout>
    
    <App />
  </RootLayout>
);
