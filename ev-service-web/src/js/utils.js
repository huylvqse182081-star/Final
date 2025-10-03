// ===== UTILITY FUNCTIONS FOR EV SERVICE CENTER =====

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Format number with Vietnamese locale
 * @param {number} num - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
function formatNumber(num, decimals = 0) {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format currency in Vietnamese Dong
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Format date with Vietnamese locale
 * @param {Date|string} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date
 */
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  };

  const formatOptions = { ...defaultOptions, ...options };

  return new Intl.DateTimeFormat("vi-VN", formatOptions).format(new Date(date));
}

/**
 * Format time with Vietnamese locale
 * @param {Date|string} date - Date to format time from
 * @param {boolean} includeSeconds - Include seconds in format
 * @returns {string} Formatted time
 */
function formatTime(date, includeSeconds = false) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  };

  if (includeSeconds) {
    options.second = "2-digit";
  }

  return new Intl.DateTimeFormat("vi-VN", options).format(new Date(date));
}

/**
 * Get relative time (e.g., "2 giờ trước")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
function getRelativeTime(date) {
  const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" });
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = (targetDate - now) / 1000;

  const units = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const { unit, seconds } of units) {
    const interval = Math.floor(Math.abs(diffInSeconds) / seconds);
    if (interval >= 1) {
      return rtf.format(diffInSeconds < 0 ? -interval : interval, unit);
    }
  }

  return "vừa xong";
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Vietnamese phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone number
 */
function isValidPhoneNumber(phone) {
  const phoneRegex =
    /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

/**
 * Validate Vietnamese license plate
 * @param {string} licensePlate - License plate to validate
 * @returns {boolean} Is valid license plate
 */
function isValidLicensePlate(licensePlate) {
  const plateRegex = /^[0-9]{2}[A-Z]-[0-9]{3}\.[0-9]{2}$/;
  return plateRegex.test(licensePlate);
}

/**
 * Get status color based on status type
 * @param {string} status - Status type
 * @returns {string} CSS color class
 */
function getStatusColor(status) {
  const statusColors = {
    pending: "status-pending",
    waiting: "status-pending",
    "in-progress": "status-progress",
    processing: "status-progress",
    completed: "status-completed",
    finished: "status-completed",
    cancelled: "status-cancelled",
    rejected: "status-cancelled",
    available: "status-available",
    busy: "status-busy",
    offline: "status-offline",
  };

  return statusColors[status.toLowerCase()] || "status-pending";
}

/**
 * Get Vietnamese status text
 * @param {string} status - Status type
 * @returns {string} Vietnamese status text
 */
function getStatusText(status) {
  const statusTexts = {
    pending: "Chờ xử lý",
    waiting: "Đang chờ",
    "in-progress": "Đang thực hiện",
    processing: "Đang xử lý",
    completed: "Hoàn thành",
    finished: "Đã xong",
    cancelled: "Đã hủy",
    rejected: "Từ chối",
    available: "Sẵn sàng",
    busy: "Bận",
    offline: "Ngoại tuyến",
  };

  return statusTexts[status.toLowerCase()] || status;
}

/**
 * Show loading state
 * @param {HTMLElement} element - Element to show loading
 * @param {string} message - Loading message
 */
function showLoading(element, message = "Đang tải...") {
  if (!element) return;

  const loadingHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p class="loading-message">${message}</p>
        </div>
    `;

  element.innerHTML = loadingHTML;
  element.classList.add("loading");
}

/**
 * Hide loading state
 * @param {HTMLElement} element - Element to hide loading
 */
function hideLoading(element) {
  if (!element) return;

  element.classList.remove("loading");
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, warning, error, info)
 * @param {number} duration - Display duration in milliseconds
 */
function showToast(message, type = "info", duration = 5000) {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const toastId = generateId();
  const iconMap = {
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-triangle",
    error: "fas fa-times-circle",
    info: "fas fa-info-circle",
  };

  const toastHTML = `
        <div class="toast toast-${type}" id="toast-${toastId}">
            <div class="toast-icon">
                <i class="${iconMap[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="closeToast('${toastId}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  toastContainer.insertAdjacentHTML("beforeend", toastHTML);

  const toast = document.getElementById(`toast-${toastId}`);

  // Show toast with animation
  setTimeout(() => toast.classList.add("show"), 100);

  // Auto hide toast
  setTimeout(() => {
    closeToast(toastId);
  }, duration);
}

/**
 * Close toast notification
 * @param {string} toastId - Toast ID to close
 */
function closeToast(toastId) {
  const toast = document.getElementById(`toast-${toastId}`);
  if (toast) {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }
}

/**
 * Show confirmation dialog
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message
 * @param {Function} onConfirm - Callback on confirm
 * @param {Function} onCancel - Callback on cancel
 */
function showConfirmDialog(title, message, onConfirm, onCancel) {
  const modalId = generateId();
  const modalHTML = `
        <div class="modal-backdrop" id="modal-${modalId}">
            <div class="modal-dialog">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal('${modalId}')">
                        Hủy
                    </button>
                    <button class="btn btn-primary" onclick="confirmAction('${modalId}')">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Store callbacks
  window[`confirm_${modalId}`] = onConfirm;
  window[`cancel_${modalId}`] = onCancel;

  // Show modal
  setTimeout(() => {
    document.getElementById(`modal-${modalId}`).classList.add("show");
  }, 100);
}

/**
 * Open modal
 * @param {string} modalId - Modal ID to open
 */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
  }
}

/**
 * Close modal
 * @param {string} modalId - Modal ID to close
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

/**
 * Confirm action for dialogs
 * @param {string} modalId - Modal ID
 */
function confirmAction(modalId) {
  const confirmCallback = window[`confirm_${modalId}`];
  if (confirmCallback) {
    confirmCallback();
  }
  closeModal(modalId);
}

// Utility class wrapper
class Utils {
  static generateId = generateId;
  static formatDate = formatDate;
  static formatTime = formatTime;
  static formatCurrency = formatCurrency;
  static getRelativeTime = getRelativeTime;
  static showToast = showToast;
  static showConfirmDialog = showConfirmDialog;
  static isValidEmail = isValidEmail;
  static isValidPhoneNumber = isValidPhoneNumber;
  static isValidLicensePlate = isValidLicensePlate;
  static getStatusColor = getStatusColor;
  static getStatusText = getStatusText;
}

// Make functions globally available
window.Utils = Utils;
window.generateId = generateId;
window.showToast = showToast;
window.showConfirmDialog = showConfirmDialog;
window.isValidLicensePlate = isValidLicensePlate;
window.openModal = openModal;
window.closeModal = closeModal;
window.confirmAction = confirmAction;
