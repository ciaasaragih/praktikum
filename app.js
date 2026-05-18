const express = require('express');
const sequelize = require('./config/db');
const db = require('./models');

// 1. Tambahkan import route di sini
const userRoutes = require('./routes/user.route');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('API aktif!'));

// --- Tambahkan routing kamu dibawah sini ---

// 2. Hubungkan rute user ke aplikasi
app.use('/api/users', userRoutes);

// -------------------------------------------

// Koneksi ke database
sequelize.authenticate()
  .then(() => {
    console.log('✅ Terkoneksi ke MySQL');
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('✅ Sinkronisasi selesai');
  })
  .catch((err) => {
    console.error('❌ Gagal konek:', err);
  });

// Jalankan server
app.listen(3000, () => {
  console.log('🚀 Server jalan di http://localhost:3000');
});