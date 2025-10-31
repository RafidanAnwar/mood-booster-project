// src/App.js (Diperbarui dengan gelembung dari API)

import React, { useState, useEffect } from 'react'; // <-- Impor useState & useEffect
import axios from 'axios'; // <-- Impor axios
import PetCard from './PetCard'; 
import './App.css'; 

function App() {
  // --- BARU: State untuk menyimpan URL gambar gelembung ---
  const [bubbleImages, setBubbleImages] = useState([]);

  // --- BARU: useEffect untuk mengambil data API saat komponen dimuat ---
  useEffect(() => {
    
    // Fungsi async untuk mengambil gambar
    const fetchBubbleImages = async () => {
      try {
        // Panggil API kucing, minta 10 gambar sekaligus
        const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
        
        // API mengembalikan array objek, kita hanya butuh 'url'-nya
        const urls = response.data.map(image => image.url);
        
        // Simpan array URL ke dalam state
        setBubbleImages(urls);

      } catch (error) {
        console.error("Gagal mengambil gambar gelembung kucing:", error);
      }
    };

    // Panggil fungsi tersebut saat komponen dimuat
    fetchBubbleImages();

  }, []); // [] = "Jalankan ini satu kali saja setelah render pertama"

  return (
    <div className="App-container">
      
      {/* Daftar gelembung kucing untuk animasi background */}
      <ul className="bg-bubbles">
        
        {/* --- BARU: Loop dinamis berdasarkan state bubbleImages --- */}
        {/* Kita .map() array bubbleImages untuk membuat <li> */}
        {bubbleImages.map((imageUrl, index) => (
          <li key={index}>
            <img src={imageUrl} alt={`Cat bubble ${index + 1}`} />
          </li>
        ))}

      </ul>
      
      {/* Komponen kartu Anda (tidak perlu diubah) */}
      <PetCard />
    </div>
  );
}

export default App;