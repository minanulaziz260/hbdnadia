import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, Heart, RotateCcw, ArrowRight } from 'lucide-react';
import './App.css';

// Data 4 Foto Nadia untuk Scene 03
// Jika kamu punya 4 file berbeda, arahkan ke nadia1.jpg s/d nadia4.jpg
const NADIA_PHOTOS = [
  {
    id: 1,
    src: '/images/nadia1.jpg',
    caption: 'Cieee yang ulang tahun! 🥳',
    rotate: -3,
  },
  {
    id: 2,
    src: '/images/nadia2.jpg',
    caption: 'Tetap cantik, jangan galak-galak! 😜✌️',
    rotate: 3,
  },
  {
    id: 3,
    src: '/images/nadia1.jpg', // Ganti ke '/images/nadia3.jpg' jika ada file ke-3
    caption: 'Senyumnya jangan pelit dong! 😊✨',
    rotate: -2.5,
  },
  {
    id: 4,
    src: '/images/nadia2.jpg', // Ganti ke '/images/nadia4.jpg' jika ada file ke-4
    caption: 'Nah, ini dia birthday girl-nya! 👑💗',
    rotate: 2.5,
  },
];

// Komponen Partikel Mengambang (Balon, Bintang, Hati)
const FloatingBackground = () => {
  const items = ['🎈', '✨', '💗', '⭐', '🌸', '🎈', '💖', '✨'];
  return (
    <div className="particles-container">
      {items.map((emoji, idx) => (
        <motion.div
          key={idx}
          className="floating-item"
          style={{
            left: `${(idx * 13) + 6}%`,
            fontSize: idx % 2 === 0 ? '1.6rem' : '1.2rem',
          }}
          initial={{ y: '105dvh', opacity: 0 }}
          animate={{
            y: '-15dvh',
            opacity: [0, 0.75, 0.75, 0],
            x: [0, idx % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{
            duration: 9 + (idx % 4) * 2,
            repeat: Infinity,
            delay: idx * 1.1,
            ease: 'linear',
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// SCENE 01 — OPENING
// ==========================================
const Scene01Opening = ({ onStart }) => {
  return (
    <motion.div
      className="scene-container"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: '4rem', marginBottom: '12px' }}
      >
        🎁
      </motion.div>

      <motion.h1
        className="title-playful"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        HEY, NADIA! 👀
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
      >
        Someone special has a birthday today!
      </motion.p>

      <motion.button
        className="btn-primary"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.94 }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        onClick={onStart}
      >
        KLIK KALAU KAMU NADIA 💗
      </motion.button>
    </motion.div>
  );
};

// ==========================================
// SCENE 02 — SURPRISE REVEAL & TIUP LILIN
// ==========================================
const Scene02Cake = ({ onNext }) => {
  const [candleLit, setCandleLit] = useState(true);

  const handleBlowCandle = () => {
    if (!candleLit) return;
    setCandleLit(false);

    // Efek Confetti saat lilin ditiup
    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#ff5c93', '#ffd6e8', '#8ad6ff', '#ffe066', '#c8a8ff'],
    });

    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <motion.div
      className="scene-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="title-playful"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 14 }}
      >
        HAPPY BIRTHDAY, NADIA! 🎂
      </motion.h1>

      <p className="subtitle">
        {candleLit
          ? 'Make a wish dulu, terus tiup lilinnya ya!'
          : 'Yeeay! Semoga doamu terkabul! 🎉'}
      </p>

      {/* Kue Ulang Tahun muncul dari bawah */}
      <motion.div
        className="cake-wrapper"
        initial={{ y: 180, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 15, delay: 0.15 }}
      >
        <div className="candle">
          <AnimatePresence>
            {candleLit ? (
              <motion.div
                key="flame"
                className="flame"
                animate={{
                  scale: [1, 1.12, 0.95, 1.08, 1],
                  rotate: [-2, 3, -3, 2, 0],
                }}
                exit={{ opacity: 0, scale: 0, y: -20 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ) : (
              <motion.div
                key="smoke"
                className="smoke"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -35 }}
                transition={{ duration: 1.2 }}
              >
                💨
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="cake-top" />
        <div className="cake-bottom" />
      </motion.div>

      {candleLit && (
        <motion.button
          className="btn-primary"
          whileTap={{ scale: 0.92 }}
          onClick={handleBlowCandle}
        >
          TIUP LILIN! 🌬️✨
        </motion.button>
      )}
    </motion.div>
  );
};

// ==========================================
// SCENE 03 — FUNNY PHOTO POP-UP (BERGANTIAN)
// ==========================================
const Scene03Photos = ({ onFinishPhotos }) => {
  const [index, setIndex] = useState(0);
  const currentPhoto = NADIA_PHOTOS[index];

  const handleNextPhoto = () => {
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.75 },
    });

    if (index < NADIA_PHOTOS.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      onFinishPhotos();
    }
  };

  return (
    <motion.div
      className="scene-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <div style={{ marginBottom: '12px', fontWeight: 600, color: '#ff5c93' }}>
        KEJUTAN FOTO ({index + 1} / {NADIA_PHOTOS.length}) 📸
      </div>

      {/* Animasi Foto Muncul Bergantian dari Bawah Layar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhoto.id}
          className="polaroid-card"
          initial={{ y: 380, opacity: 0, scale: 0.65, rotate: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: currentPhoto.rotate,
          }}
          exit={{ y: -220, opacity: 0, scale: 0.85, rotate: -currentPhoto.rotate }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
        >
          {/* Efek Floating Halus Setelah Muncul */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="photo-frame">
              <img
                src={currentPhoto.src}
                alt={`Nadia ${currentPhoto.id}`}
                className="nadia-photo"
              />
            </div>
            <p className="polaroid-caption">{currentPhoto.caption}</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        className="btn-primary"
        whileTap={{ scale: 0.93 }}
        onClick={handleNextPhoto}
      >
        {index < NADIA_PHOTOS.length - 1 ? (
          <>
            KEJUTAN BERIKUTNYA <ArrowRight size={18} />
          </>
        ) : (
          <>
            BACA UCAPAN SPESIAL <Heart size={18} />
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

// ==========================================
// SCENE 04 — BIRTHDAY WISHES
// ==========================================
const Scene04Wishes = ({ onNext }) => {
  const paragraphs = [
    'Happy Birthday, Nadia! 💗',
    'Semoga di umur yang baru ini, semua hal baik selalu datang menghampirimu.',
    'Semoga panjang umur, sehat selalu, makin bahagia, makin sukses, dan semua impian yang sedang kamu perjuangkan bisa tercapai.',
    'Jangan lupa bahagia, tetap jadi Nadia yang penuh senyum dan selalu punya cerita.',
    'Have the happiest birthday!',
  ];

  return (
    <motion.div
      className="scene-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="wishes-card">
        {paragraphs.map((text, idx) => (
          <motion.p
            key={idx}
            className={
              idx === 0
                ? 'title-playful'
                : idx === paragraphs.length - 1
                ? 'handwritten'
                : 'wishes-paragraph'
            }
            style={idx === 0 ? { fontSize: '1.65rem', marginBottom: '14px' } : {}}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.65, duration: 0.5 }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      <motion.button
        className="btn-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3 }}
        whileTap={{ scale: 0.94 }}
        onClick={onNext}
      >
        LIHAT KEJUTAN TERAKHIR ✨
      </motion.button>
    </motion.div>
  );
};

// ==========================================
// SCENE 05 — FINAL SURPRISE
// ==========================================
const Scene05Final = ({ onReplay }) => {
  React.useEffect(() => {
    confetti({
      particleCount: 130,
      spread: 95,
      origin: { y: 0.5 },
    });
  }, []);

  return (
    <motion.div
      className="scene-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="centerpiece-frame"
        animate={{ y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="centerpiece-inner">
          <img
            src="/images/nadia2.jpg"
            alt="Birthday Girl Nadia"
            className="nadia-photo"
          />
        </div>
      </motion.div>

      <h1 className="title-playful" style={{ fontSize: '1.85rem' }}>
        ONCE AGAIN, HAPPY BIRTHDAY NADIA! 🎉
      </h1>

      <p className="handwritten" style={{ marginBottom: '22px' }}>
        Stay cute, cheerful & amazing as always! 💗
      </p>

      <motion.button
        className="btn-primary"
        whileTap={{ scale: 0.94 }}
        onClick={onReplay}
      >
        <RotateCcw size={18} /> ULANGI KEJUTANNYA ❤️
      </motion.button>
    </motion.div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [scene, setScene] = useState(1);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  const handleStart = () => {
    // Nyalakan musik saat interaksi pertama pengguna (sesuai aturan browser mobile)
    if (audioRef.current && !musicPlaying) {
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
    confetti({
      particleCount: 60,
      spread: 65,
      origin: { y: 0.7 },
    });
    setScene(2);
  };

  return (
    <div className={`app-wrapper bg-scene-${scene}`}>
      {/* Elemen Audio Backsound */}
      <audio ref={audioRef} src="/music/birthday.mp3" loop preload="auto" />

      {/* Header Tetap dengan Nama Utama & Kontrol Musik ON/OFF */}
      <div className="top-bar">
        <div className="top-badge">HAPPY BIRTHDAY, NADIA! 🎂💗</div>
        <button
          className="music-btn"
          onClick={toggleMusic}
          aria-label="Toggle Music"
          title={musicPlaying ? 'Matikan Musik' : 'Putar Musik'}
        >
          {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* Partikel Balon, Hati, dan Bintang */}
      <FloatingBackground />

      {/* Transisi Antar-Scene menggunakan AnimatePresence */}
      <AnimatePresence mode="wait">
        {scene === 1 && <Scene01Opening key="scene1" onStart={handleStart} />}
        {scene === 2 && <Scene02Cake key="scene2" onNext={() => setScene(3)} />}
        {scene === 3 && (
          <Scene03Photos key="scene3" onFinishPhotos={() => setScene(4)} />
        )}
        {scene === 4 && <Scene04Wishes key="scene4" onNext={() => setScene(5)} />}
        {scene === 5 && <Scene05Final key="scene5" onReplay={() => setScene(1)} />}
      </AnimatePresence>
    </div>
  );
}
