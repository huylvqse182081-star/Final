// ===== MAIN APPLICATION CONTROLLER =====

class EVServiceApp {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
    this.config = {
      apiBaseUrl: "/api",
      websocketUrl: "ws://localhost:8080",
      version: "1.0.0",
    };

    this.init();
  }

  /**
   * Initialize application
   */
  async init() {
    try {
      console.log("🚗 Initializing EV Service Center App...");

      // Hide loading screen
      this.hideLoadingScreen();

      // Check authentication
      await this.checkAuth();

      // Initialize global components
      this.initializeGlobalComponents();

      // Setup global event listeners
      this.setupGlobalEventListeners();

      // Initialize service worker for PWA
      this.initializeServiceWorker();

      // Initialize components
      this.initNavigation();
      this.initDropdowns();
      this.initSearch();

      // Load dashboard by default
      this.loadDashboard();

      // Mark as initialized
      this.isInitialized = true;

      console.log("✅ EV Service Center App initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize app:", error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Hide loading screen
   */
  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById("loading-screen");
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");
      }
    }, 1000);
  }

  /**
   * Check authentication
   */
  async checkAuth() {
    // TODO: Implement actual authentication check
    this.currentUser = {
      id: 1,
      name: "Nguyễn Văn A",
      role: "Quản lý",
      avatar: "/images/avatar-placeholder.jpg"
    };
  }

  /**
   * Initialize global components
   */
  initializeGlobalComponents() {
    // Initialize toast container if not exists
    if (!document.getElementById('toastContainer')) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }
  }

  /**
   * Setup global event listeners
   */
  setupGlobalEventListeners() {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
    });

    // Global unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  }

  /**
   * Initialize service worker
   */
  initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service worker registration failed:', err);
      });
    }
  }

  /**
   * Handle initialization error
   */
  handleInitializationError(error) {
    console.error('App initialization failed:', error);
    // Show error message to user
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #f8f9fa;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      ">
        <div style="text-align: center; padding: 2rem;">
          <h1 style="color: #e74c3c; margin-bottom: 1rem;">
            <i class="fas fa-exclamation-triangle"></i>
            Lỗi khởi tạo ứng dụng
          </h1>
          <p style="color: #666; margin-bottom: 1rem;">
            Đã xảy ra lỗi khi khởi tạo hệ thống. Vui lòng thử lại sau.
          </p>
          <button onclick="location.reload()" style="
            background: #00d084;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            cursor: pointer;
          ">
            Tải lại trang
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Initialize navigation
   */
  initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        this.loadPage(page);
        this.setActiveNav(link);
      });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }
  }

  /**
   * Initialize dropdowns
   */
  initDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      const btn = dropdown.querySelector(".btn-icon, .user-profile-btn");
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          dropdown.classList.toggle("active");
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", () => {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    });
  }

  /**
   * Initialize search
   */
  initSearch() {
    const searchInput = document.getElementById("globalSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        console.log("Searching:", e.target.value);
        // TODO: Implement search functionality
      });
    }
  }

  /**
   * Set active navigation
   */
  setActiveNav(activeLink) {
    // Remove active class from all nav items
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to current nav item
    activeLink.closest(".nav-item").classList.add("active");
  }

  /**
   * Load page
   */
  loadPage(page) {
    const mainContent = document.getElementById("mainContent");

    switch (page) {
      case "dashboard":
        this.loadDashboard();
        break;
      case "appointments":
        mainContent.innerHTML =
          "<h1>Quản lý Lịch hẹn</h1><p>Trang này đang được phát triển...</p>";
        break;
      case "customers":
        mainContent.innerHTML =
          "<h1>Quản lý Khách hàng</h1><p>Trang này đang được phát triển...</p>";
        break;
      case "vehicles":
        if (window.VehicleManager) {
          window.VehicleManager.loadVehiclesPage();
        } else {
          mainContent.innerHTML = "<h1>Quản lý Xe</h1><p>Đang tải...</p>";
        }
        break;
      default:
        mainContent.innerHTML = `<h1>${page}</h1><p>Trang này đang được phát triển...</p>`;
    }
  }

  /**
   * Load dashboard
   */
  loadDashboard() {
    const mainContent = document.getElementById("mainContent");
    
    const dashboardHTML = `
      <div class="page-header">
        <div class="page-title">
          <h1><i class="fas fa-tachometer-alt"></i> Bảng điều khiển</h1>
          <p>Tổng quan hoạt động trung tâm dịch vụ</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary">
            <i class="fas fa-plus"></i>
            Lịch hẹn mới
          </button>
        </div>
      </div>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-icon bg-primary">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="stat-content">
            <h3>24</h3>
            <p>Lịch hẹn hôm nay</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon bg-success">
            <i class="fas fa-users"></i>
          </div>
          <div class="stat-content">
            <h3>156</h3>
            <p>Khách hàng</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon bg-warning">
            <i class="fas fa-car"></i>
          </div>
          <div class="stat-content">
            <h3>89</h3>
            <p>Xe đang bảo dưỡng</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon bg-info">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="stat-content">
            <h3>₫125M</h3>
            <p>Doanh thu tháng</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-content">
        <div class="dashboard-section">
          <h2>Lịch hẹn gần đây</h2>
          <div class="appointments-list">
            <div class="appointment-item">
              <div class="appointment-time">09:00</div>
              <div class="appointment-info">
                <h4>Nguyễn Văn A</h4>
                <p>Bảo dưỡng định kỳ - Tesla Model 3</p>
              </div>
              <div class="appointment-status status-pending">Chờ xử lý</div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    mainContent.innerHTML = dashboardHTML;
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.EVServiceApp = new EVServiceApp();
});
