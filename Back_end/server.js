// Thêm dòng này lên ĐẦU TIÊN để đọc file .env
require('dotenv').config();

// === 1. IMPORT CÁC THƯ VIỆN CẦN THIẾT ===
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const { categories } = require('./data.js'); 

// === 2. KHỞI TẠO ỨNG DỤNG VÀ CÁC BIẾN CƠ BẢN ===
const app = express();
const port = process.env.PORT || 3000;

// === 3. KẾT NỐI DATABASE MONGODB ===
const dbConnectionString = process.env.DATABASE_URL;

mongoose.connect(dbConnectionString)
    .then(() => console.log('✅ Đã kết nối thành công tới MongoDB!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// === 4. ĐỊNH NGHĨA SCHEMA VÀ MODEL CHO SẢN PHẨM ===
const productSchema = new mongoose.Schema({ /* ... code không đổi ... */ });
const Product = mongoose.model('Product', productSchema);


// === 5. CẤU HÌNH MIDDLEWARE & UPLOAD ẢNH LÊN CLOUDINARY ===
app.use(cors());
app.use(express.json());

// Cấu hình Cloudinary bằng các biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình Multer để upload file lên Cloudinary thay vì lưu trên server
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'flower-shop', // Tên thư mục trên Cloudinary để lưu ảnh
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
  },
});

const upload = multer({ storage: storage });


// === 6. ĐỊNH NGHĨA CÁC API ENDPOINTS ===

// GET: Lấy tất cả sản phẩm
app.get('/api/products', async (req, res) => { /* ... code không đổi ... */ });

// GET: Lấy danh sách danh mục
app.get('/api/categories', (req, res) => { /* ... code không đổi ... */ });

// POST: Thêm sản phẩm mới (Lưu ảnh lên Cloudinary)
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category, originalPrice, description } = req.body;
        // THAY ĐỔI: Lấy đường dẫn ảnh trực tiếp từ Cloudinary trả về
        const imagePath = req.file ? req.file.path : ''; 

        const newProduct = new Product({
            id: 'product-' + Date.now(),
            name, price: Number(price),
            originalPrice: Number(originalPrice) || null,
            image: imagePath, // Đây là URL của Cloudinary
            category: Array.isArray(category) ? category : [category],
            description: description || ''
        });
        
        await newProduct.save();
        console.log('Đã lưu sản phẩm mới (ảnh trên Cloudinary):', newProduct);
        res.status(201).json(newProduct);

    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
        res.status(500).json({ message: 'Lỗi server khi thêm sản phẩm' });
    }
});

// DELETE: Xóa một sản phẩm
app.delete('/api/products/:id', async (req, res) => { /* ... code không đổi ... */ });


// === 7. KHỞI ĐỘNG SERVER ===
app.listen(port, () => {
  console.log(`🎉 Server của bạn đang chạy tại cổng ${port}`);
});