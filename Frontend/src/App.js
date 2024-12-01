import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/DashBoard";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ActivateAccount from "./pages/ActivateAccount";

const Layout = ({ withFooter = true, token, setToken }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar token={token} setToken={setToken} />
    <div className="flex-1">
      <Outlet />
    </div>
    {withFooter && <Footer />}
  </div>
);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token")); // Initialize from localStorage

  // Sync the token from localStorage whenever it changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken); // Update state when localStorage changes
    };

    // Listen for changes to localStorage
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout token={token} setToken={setToken} />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
      ],
    },
    {
      path: "/dashboard/:id",
      element: token ? <Dashboard /> : <Login setToken={setToken} />, // Restrict access if not logged in
    },
    {
      path: "/auth",
      element: <Layout withFooter={false} token={token} setToken={setToken} />,
      children: [
        { path: "login", element: <Login setToken={setToken} /> },
        { path: "activate/:token", element: <ActivateAccount setToken={setToken} /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
