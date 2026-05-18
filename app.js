const express = require('express');
const sequelize = require('./config/db');
const db = require('./models');

// 1. Import routes yang sudah ada
const userRoutes = require('./routes/user.route');
// Tambahkan import product route sesuai gambar
const productRoutes = require('./routes/product.route');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('API aktif!'));

// --- Routing Integrasi ---

app.use('/api/users', userRoutes);
// 2. Tambahkan baris ini untuk product
app.use('/api/products', productRoutes);

// --------------------------

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