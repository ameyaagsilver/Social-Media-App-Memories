import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./Components/Navbar/Navbar";
import { Home } from "./Components/Home/Home";
import { Auth } from "./Components/Auth/Auth";


function App() {
  return (
    <BrowserRouter >
      <Container maxWidth='lg'>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
