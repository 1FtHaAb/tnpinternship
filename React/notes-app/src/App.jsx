import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home"
import Note from "./pages/Notes"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/notes" element={<Note/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App