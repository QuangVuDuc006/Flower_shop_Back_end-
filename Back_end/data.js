const products = [
    {
        id: 'bo-hoa-hong-do',
        name: 'Bó Hoa Hồng Đỏ Lãng Mạn',
        price: 750000,
        originalPrice: 820000, // <-- THÊM MỚI: Giá gốc
        image: '/uploads/1721568288182.jpg',
        category: ['hoa-tuoi', 'hoa-hong', 'hoa-su-kien', 'hoa-tinh-yeu', 'thiet-ke-bo-hoa'],
        description: 'Hoa hồng đỏ luôn là biểu tượng của một tình yêu nồng cháy và mãnh liệt. Bó hoa được kết hợp từ những bông hồng Ecuador nhập khẩu, mang vẻ đẹp sang trọng và quyến rũ.' // <-- THÊM MỚI: Mô tả
    },
    {
        id: 'bo-hoa-tulip-trang',
        name: 'Bó Hoa Tulip Trắng Tinh Khôi',
        price: 900000,
        originalPrice: 950000, // <-- THÊM MỚI
        image: '/uploads/1721568322695.jpg',
        category: ['hoa-tuoi', 'hoa-tulip', 'chu-de-sang-trong', 'thiet-ke-bo-hoa'],
        description: 'Tulip trắng tượng trưng cho sự thuần khiết, bình yên và một tình yêu trong sáng. Đây là món quà tinh tế dành cho những người bạn trân trọng.' // <-- THÊM MỚI
    },
    // ... Cập nhật tương tự cho các sản phẩm khác nếu có
];

const categories = [
    { id: 'hoa-tuoi', name: 'Hoa Tươi' },
    { id: 'hoa-su-kien', name: 'Hoa Sự Kiện' },
    { id: 'qua-tang', name: 'Quà Tặng' },
    { id: 'hoa-hong', name: 'Hoa Hồng' },
    { id: 'hoa-tulip', name: 'Hoa Tulip' },
    { id: 'hoa-huong-duong', name: 'Hoa Hướng Dương' },
    { id: 'hoa-sinh-nhat', name: 'Hoa Sinh Nhật' },
    { id: 'hoa-khai-truong', name: 'Hoa Khai Trương' },
    { id: 'hoa-tinh-yeu', name: 'Hoa Tình Yêu' },
    { id: 'chu-de-sang-trong', name: 'Phong cách Sang trọng' },
    { id: 'thiet-ke-bo-hoa', name: 'Thiết kế Bó hoa' },
    { id: 'thiet-ke-lang-hoa', name: 'Thiết kế Lẵng hoa' },
    { id: 'socola', name: 'Sô-cô-la' },
];

module.exports = { products, categories };