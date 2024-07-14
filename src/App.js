import logo from "./logo.svg";
import "../src/styles/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sell from "./pages/Sell";
import AllProducts from "./pages/AllProducts";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import Nav from "./components/Nav";
import Notification from "./components/Notification";
import { NotificationContainer } from "react-notifications";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <Sell notification={Notification} />,
      errorElement: <NotFound />,
    },
    {
      path: "/allProduct",
      element: <AllProducts Notification={Notification} />,
    },
    { path: "/history", element: <History /> },
    // Add more routes as needed...
    // { path: "*", element: <NotFound /> },
    // This route will match when none of the above routes match, showing a 404 page.
  ]);
  return (
    <div className="App">
      <NotificationContainer />
      <Nav />
      <RouterProvider router={router} />
      {/* Add routes here */}
      {/* <Home />
    <About />
    <Contact /> */}
    </div>
  );
}
export default App;
