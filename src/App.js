import logo from "./logo.svg";
import "../src/styles/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sell from "./pages/Sell";
import AllProducts from "./pages/AllProducts";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import Nav from "./components/Nav";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <Sell />,
      errorElement: <NotFound />,
    },
    { path: "/allProduct", element: <AllProducts /> },
    { path: "/history", element: <History /> },
    // Add more routes as needed...
    // { path: "*", element: <NotFound /> },
    // This route will match when none of the above routes match, showing a 404 page.
  ]);
  return (
    <div className="App">
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
