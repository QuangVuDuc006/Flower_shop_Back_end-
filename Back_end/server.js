require('dotenv').config(); // Dòng này phải ở trên cùng

// === 1. IMPORT CÁC THƯ VIỆN CẦN THIẾT ===
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const { categories } = require('./data.js'); 

// === 2. KHỞI TẠO ỨNG DỤNG VÀ CÁC BIẾN CƠ BẢN ===
const app = express();
// TỐI ƯU: Sử dụng cổng của môi trường deploy hoặc 3000 nếu chạy ở local
const port = process.env.PORT || 3000;

// === 3. KẾT NỐI DATABASE MONGODB ===
// TỐI ƯU: Đọc chuỗi kết nối từ biến môi trường để bảo mật
const dbConnectionString = process.env.DATABASE_URL;

mongoose.connect(dbConnectionString)
    .then(() => console.log('✅ Đã kết nối thành công tới MongoDB!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// === 4. ĐỊNH NGHĨA SCHEMA VÀ MODEL CHO SẢN PHẨM ===
const productSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    name: String,
    price: Number,
    originalPrice: Number,
    image: String,
    category: [String],
    description: String
});
const Product = mongoose.model('Product', productSchema);


// === 5. CẤU HÌNH MIDDLEWARE ===
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });


// === 6. ĐỊNH NGHĨA CÁC API ENDPOINTS ===

// GET: Lấy tất cả sản phẩm
app.get('/api/products', async (req, res) => {
    try {
        const productsFromDb = await Product.find();
        res.json(productsFromDb);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi lấy sản phẩm' });
    }
});

// GET: Lấy danh sách danh mục
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

// POST: Thêm một sản phẩm mới
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, price, category, originalPrice, description } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
        const newProduct = new Product({
            id: 'product-' + Date.now(),
            name, price: Number(price),
            originalPrice: Number(originalPrice) || null, image: imagePath,
            category: Array.isArray(category) ? category : [category],
            description: description || ''
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi thêm sản phẩm' });
    }
});

// DELETE: Xóa một sản phẩm
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findOneAndDelete({ id: id });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm để xóa' });
        }
        res.status(200).json({ message: 'Sản phẩm đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
    }
});


// === 7. KHỞI ĐỘNG SERVER ===
app.listen(port, () => {
  console.log(`🎉 Server của bạn đang chạy tại cổng ${port}`);
});