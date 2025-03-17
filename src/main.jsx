import React from "react";
import { createRoot } from "react-dom/client";
import Search from "./views/Search.jsx";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MyPhotos from "./views/MyPhotos.jsx";
import Header from "./components/header.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <BrowserRouter>
      <nav>
        <div className="navButtons">
          <Link to="/">Search</Link>
          <Link to="/myphotos">My Photos</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/myphotos" element={<MyPhotos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
