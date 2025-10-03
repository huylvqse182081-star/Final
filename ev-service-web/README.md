# 🚗 EV Service Center Management System - Web Interface

Hệ thống quản lý trung tâm bảo dưỡng xe điện hiện đại với giao diện web responsive.

## ✨ Tính năng chính

### 🎯 Dashboard Tổng quan

- Thống kê realtime về trạng thái dịch vụ
- Biểu đồ phân tích dữ liệu
- Thông báo và cảnh báo thông minh

### 📅 Quản lý Lịch hẹn

- Đặt lịch online
- Theo dõi tiến độ realtime
- Quản lý hàng đợi thông minh

### 👥 Quản lý Khách hàng & Xe

- Hồ sơ khách hàng chi tiết
- Lịch sử bảo dưỡng xe EV
- Nhắc nhở bảo dưỡng định kỳ

### 🔧 Quản lý Kỹ thuật viên

- Phân công tự động
- Theo dõi hiệu suất
- Quản lý chuyên môn EV

### 💰 Thanh toán & Báo cáo

- Thanh toán online đa dạng
- Báo cáo tài chính chi tiết
- Phân tích xu hướng

## 🛠 Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite
- **Charts**: Chart.js
- **HTTP Client**: Axios
- **Real-time**: Socket.IO
- **UI Framework**: Custom CSS với Material Design 3

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống

- Node.js 16+
- npm hoặc yarn
- Browser hiện đại (Chrome, Firefox, Safari, Edge)

### Cài đặt

```bash
# Clone repository
git clone https://github.com/huylvqse182081-star/EV-Service-Center-Maintenance-Management.git

# Di chuyển vào thư mục dự án
cd EV-Service-Center-Maintenance-Management

# Cài đặt dependencies
npm install
```

### Chạy Development Server

```bash
# Chạy server phát triển
npm run dev

# Hoặc với yarn
yarn dev
```

Mở trình duyệt và truy cập: `http://localhost:3000`

### Build Production

```bash
# Build cho production
npm run build

# Preview build
npm run preview
```

## 📁 Cấu trúc Dự án

```
ev-service-center-web/
├── src/
│   ├── index.html              # Entry point
│   ├── css/
│   │   ├── variables.css       # CSS Variables & Theme
│   │   ├── main.css           # Main styles
│   │   ├── components.css     # Component styles
│   │   ├── modals.css         # Modal styles
│   │   └── responsive.css     # Responsive design
│   ├── js/
│   │   ├── app.js             # Main application
│   │   ├── dashboard.js       # Dashboard logic
│   │   └── utils.js           # Utility functions
│   └── assets/
│       ├── images/            # Images
│       └── icons/             # Icons
├── public/                    # Static files
├── dist/                      # Build output
├── package.json               # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # Documentation
```

## 🎨 Design System

### Colors

- **Primary**: `#00D084` (Electric Green)
- **Secondary**: `#1A1A2E` (Deep Navy)
- **Accent**: `#E94560` (Electric Red)
- **Success**: `#27AE60`
- **Warning**: `#F39C12`
- **Error**: `#E74C3C`

### Typography

- **Font Family**: Inter
- **Sizes**: 12px - 36px scale
- **Weights**: 300, 400, 500, 600, 700

### Components

- Cards với border-radius 16px
- Buttons với hover effects
- Form inputs với focus states
- Toast notifications
- Modal dialogs

## 📱 Responsive Design

- **Mobile First**: Tối ưu cho mobile trước
- **Breakpoints**:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- **Touch Friendly**: Minimum 44px touch targets
- **Accessibility**: WCAG 2.1 compliance

## ⚡ Performance

- **Lazy Loading**: Components và images
- **Code Splitting**: Dynamic imports
- **Caching**: Service Worker cho PWA
- **Optimization**: Minified CSS/JS
- **CDN Ready**: Static assets optimization

## 🔐 Security Features

- **Authentication**: JWT tokens
- **Authorization**: Role-based permissions
- **Data Validation**: Client & server validation
- **HTTPS**: SSL/TLS encryption
- **CSRF Protection**: Cross-site request forgery protection

## 📊 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**huylvqse182081-star**

- GitHub: [@huylvqse182081-star](https://github.com/huylvqse182081-star)

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Beautiful charts
- [Vite](https://vitejs.dev/) - Fast build tool
- [Material Design](https://material.io/) - Design guidelines
- [FontAwesome](https://fontawesome.com/) - Icons

---

⚡ **Powered by Electric Vehicle Technology** ⚡
