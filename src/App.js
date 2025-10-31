// src/App.js

import React from 'react';
// Hapus atau komentari QuoteCard
// import QuoteCard from './QuoteCard'; 
import PetCard from './PetCard'; // <-- GANTI DENGAN INI
import './App.css'; 

function App() {
  return (
    <div className="App-container">
      {/* <QuoteCard /> */}
      <PetCard /> {/* <-- GANTI DENGAN INI */}
    </div>
  );
}

export default App;