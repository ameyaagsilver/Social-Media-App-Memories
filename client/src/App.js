import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Components/Home/Home";
import { Auth } from "./Components/Auth/Auth";
import { PostDetails } from "./Components/PostDetails/PostDetails";

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  // const location = useLocation();

  return (
    <BrowserRouter >
      <Container maxWidth='lg'>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
          <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
