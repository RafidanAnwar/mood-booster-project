// src/PetCard.js (Versi BARU dengan Tombol Share)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PetCard() {
  // === STATE MANAGEMENT ===
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);

  // --- BARU: State untuk tombol copy ---
  const [copyText, setCopyText] = useState('Copy Pesan 📋');

  // === FUNGSI-FUNGSI ===

  // 1. Fungsi untuk mengambil SEMUA pesan dari file JSON
  const fetchMessages = async () => {
    try {
      const response = await fetch('/messages.json'); // Ambil dari folder 'public'
      const data = await response.json();
      setAllMessages(data.messages);
      
      const randomMessage = data.messages[Math.floor(Math.random() * data.messages.length)];
      setMessage(randomMessage);

    } catch (error) {
      console.error("Gagal memuat messages.json:", error);
    }
  };

  // 2. Fungsi untuk mengambil gambar kucing
  const fetchPetImage = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      setImageUrl(response.data[0].url);
    } catch (error) {
      console.error("Gagal mengambil gambar kucing:", error);
      setImageUrl(null); // Set ke null jika error
    }
  };

  // 3. Fungsi untuk mengambil SATU pesan acak dari state
  const getNewMessage = () => {
    // Pastikan allMessages sudah terisi sebelum diakses
    if (allMessages.length > 0) {
      const randomMessage = allMessages[Math.floor(Math.random() * allMessages.length)];
      setMessage(randomMessage);
    }
  };

  // 4. Fungsi yang dipanggil saat tombol "Lagi!" diklik
  const fetchNewContent = () => {
    setLoading(true);
    fetchPetImage();
    getNewMessage();
    setAnimationKey(prevKey => prevKey + 1);
  };

  // 5. Fungsi untuk menangani gambar selesai dimuat
  const handleImageLoad = () => {
    setLoading(false);
  };

  // === useEffect HOOK ===
  useEffect(() => {
    setLoading(true);
    fetchMessages();
    fetchPetImage();
  }, []); // [] = jalankan sekali

  // --- BARU: Logika untuk Share & Copy ---
  // Diletakkan sebelum 'return'

  // 1. Buat teks lengkap untuk di-share ke WhatsApp
  const shareText = `${message} \n\nLihat gambar ini: ${imageUrl}`;
  
  // 2. Buat link WhatsApp yang aman
  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  // 3. Fungsi untuk menyalin pesan ke clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(message)
      .then(() => {
        setCopyText('Tersalin! 👍');
        setTimeout(() => {
          setCopyText('Copy Pesan 📋');
        }, 2000); // 2 detik
      })
      .catch(err => {
        console.error('Gagal menyalin pesan: ', err);
      });
  };

  // === RENDER JSX (TAMPILAN) ===
  return (
    // Anda menggunakan 'glass-card' dari Pilihan B, 
    // tapi kode header & footer Anda dari Pilihan A.
    // Saya akan gabungkan agar konsisten dengan Pilihan A (tanpa card-header/footer)
    
    <div className="card shadow-lg border-0 rounded-4" style={{ width: '25rem' }}>
      
      <div className="fs-5 fw-bold text-center pt-4">
        kalau hoki nemu kucing ireng
      </div>

      <div className="card-body" style={{ minHeight: '350px' }}>
        
        {/* Tampilan Spinner */}
        {loading && (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div 
          key={animationKey} 
          className={loading ? '' : 'fade-in'} 
          style={{ display: loading ? 'none' : 'block' }}
        >
          {/* 1. Tampilan Gambar */}
          {imageUrl && (
            <img 
              src={imageUrl} 
              className="card-img-top img-fluid rounded"
              alt="A cute cat"
              onLoad={handleImageLoad}
            />
          )}

          {/* 2. Tampilan Pesan Personal */}
          <p className="card-text text-center mt-3 fs-5">
            "{message}"
          </p>
        </div>
      
      </div>

      {/* --- BAGIAN FOOTER TELAH DIPERBARUI TOTAL --- */}
      <div className="text-center d-grid gap-2 p-3">
        
        {/* Tombol Utama */}
        <button 
          className="btn btn-primary btn-lg" // Dibuat lebih besar
          onClick={fetchNewContent}
          disabled={loading}
        >
          {loading ? 'Mencari...' : 'Ayo Coba cari 🙈'}
        </button>

        {/* Kontainer untuk tombol share, HANYA MUNCUL jika tidak loading */}
        {!loading && imageUrl && (
          <>

            {/* Tombol Buka Gambar (dari kode Anda sebelumnya) */}
            <a 
              href={imageUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-secondary btn-sm mt-1"
            >
              Buka/Simpan Gambar
            </a>
          </>
        )}
      </div>
      {/* --- AKHIR DARI FOOTER BARU --- */}
      
    </div>
  );
}

export default PetCard;