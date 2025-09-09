import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        containerClassName="!fixed !inset-0 flex items-center justify-center pointer-events-none"
        toastOptions={{
          duration: 3000,
          className: "pointer-events-auto bg-teal-500 text-white rounded-lg shadow-lg",
          style: {
            padding: "1rem 1.5rem",
            fontWeight: "bold",
            animation: "slideIn 0.5s ease",
          },
        }}
      />

      <Outlet />
    </>
  );
}

export default App;
