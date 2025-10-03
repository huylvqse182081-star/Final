// ===== DASHBOARD LOGIC FOR EV SERVICE CENTER =====

class EVDashboard {
  constructor() {
    this.charts = {};
    this.realTimeInterval = null;
    this.currentPage = "dashboard";
    this.isLoading = false;

    this.init();
  }

  /**
   * Initialize dashboard
   */
  async init() {
    try {
      // Show loading screen
      this.showLoadingScreen();

      // Setup event listeners
      this.setupEventListeners();

      // Load initial data
      await this.loadDashboardData();

      // Initialize charts
      this.initializeCharts();

      // Setup real-time updates
      this.setupRealTimeUpdates();

      // Hide loading screen
      this.hideLoadingScreen();

      console.log("EV Dashboard initialized successfully");
    } catch (error) {
      console.error("Dashboard initialization failed:", error);
      if (typeof Utils !== "undefined" && Utils.showToast) {
        Utils.showToast("Không thể khởi tạo dashboard", "error");
      }
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Navigation
    this.setupNavigation();

    // Search functionality
    this.setupSearch();

    // Dropdown menus
    this.setupDropdowns();

    // Quick actions
    this.setupQuickActions();

    // Mobile menu toggle
    this.setupMobileMenu();

    // Window resize handler
    const resizeHandler = () => {
      this.handleResize();
    };

    window.addEventListener("resize", this.debounce(resizeHandler, 250));
  }

  /**
   * Setup navigation
   */
  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        this.navigateToPage(page);
      });
    });
  }

  /**
   * Setup search functionality
   */
  setupSearch() {
    const searchInput = document.getElementById("globalSearch");
    const searchSuggestions = document.getElementById("searchSuggestions");

    if (searchInput) {
      const searchHandler = (e) => {
        this.handleSearch(e.target.value);
      };

      searchInput.addEventListener("input", this.debounce(searchHandler, 300));

      searchInput.addEventListener("focus", () => {
        if (searchInput.value.length >= 2 && searchSuggestions) {
          searchSuggestions.style.display = "block";
        }
      });

      searchInput.addEventListener("blur", () => {
        setTimeout(() => {
          if (searchSuggestions) {
            searchSuggestions.style.display = "none";
          }
        }, 200);
      });
    }
  }

  /**
   * Setup dropdown menus
   */
  setupDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector("button");

      if (button) {
        button.addEventListener("click", (e) => {
          e.stopPropagation();
          this.toggleDropdown(dropdown);
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", () => {
      this.closeAllDropdowns();
    });
  }

  /**
   * Setup quick actions
   */
  setupQuickActions() {
    const quickActionBtns = document.querySelectorAll("[data-action]");

    quickActionBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const action = btn.getAttribute("data-action");
        this.handleQuickAction(action);
      });
    });
  }

  /**
   * Setup mobile menu
   */
  setupMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });

      // Close sidebar when clicking on main content
      const mainContent = document.getElementById("mainContent");
      if (mainContent) {
        mainContent.addEventListener("click", () => {
          sidebar.classList.remove("open");
        });
      }
    }
  }
}
