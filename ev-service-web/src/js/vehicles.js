// ===== VEHICLE MANAGEMENT MODULE =====

class VehicleManager {
  constructor() {
    this.vehicles = [];
    this.vehicleBrands = [
      "Tesla",
      "VinFast",
      "BYD",
      "BMW",
      "Mercedes-Benz",
      "Audi",
      "Hyundai",
      "Kia",
      "Nissan",
      "Chevrolet",
      "Ford",
      "Volkswagen",
    ];
    this.vehicleModels = {
      Tesla: ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
      VinFast: ["VF8", "VF9", "VFe34", "VF5"],
      BYD: ["Tang", "Han", "Qin", "Song", "Atto 3"],
      BMW: ["iX", "i4", "iX3", "i3", "iX1"],
      "Mercedes-Benz": ["EQS", "EQE", "EQC", "EQA", "EQB"],
      Audi: ["e-tron", "e-tron GT", "Q4 e-tron", "Q8 e-tron"],
      Hyundai: ["IONIQ 5", "IONIQ 6", "Kona Electric", "NEXO"],
      Kia: ["EV6", "EV9", "Niro EV", "Soul EV"],
      Nissan: ["Leaf", "Ariya"],
      Chevrolet: ["Bolt EV", "Bolt EUV"],
      Ford: ["Mustang Mach-E", "F-150 Lightning"],
      Volkswagen: ["ID.4", "ID.3", "ID.6", "e-Golf"],
    };

    this.init();
  }

  /**
   * Initialize vehicle manager
   */
  init() {
    this.setupEventListeners();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Listen for vehicle registration requests
    document.addEventListener("click", (e) => {
      if (e.target.closest('[data-action="add-vehicle"]')) {
        e.preventDefault();
        this.openRegistrationModal();
      }

      if (e.target.closest('[data-action="edit-vehicle"]')) {
        e.preventDefault();
        const vehicleId = e.target
          .closest("[data-vehicle-id]")
          ?.getAttribute("data-vehicle-id");
        if (vehicleId) {
          this.editVehicle(vehicleId);
        }
      }

      if (e.target.closest('[data-action="delete-vehicle"]')) {
        e.preventDefault();
        const vehicleId = e.target
          .closest("[data-vehicle-id]")
          ?.getAttribute("data-vehicle-id");
        if (vehicleId) {
          this.deleteVehicle(vehicleId);
        }
      }
    });
  }

  /**
   * Open vehicle registration modal
   */
  openRegistrationModal(vehicleData = null) {
    const isEdit = !!vehicleData;
    const modalId = Utils.generateId();

    const brandOptions = this.vehicleBrands
      .map(
        (brand) =>
          `<option value="${brand}" ${vehicleData?.brand === brand ? "selected" : ""}>${brand}</option>`
      )
      .join("");

    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let year = currentYear; year >= 2010; year--) {
      yearOptions.push(
        `<option value="${year}" ${vehicleData?.year == year ? "selected" : ""}>${year}</option>`
      );
    }

    const modalHTML = `
        <div class="modal-backdrop">
          <div class="modal" id="${modalId}">
            <div class="modal-header">
              <h2>${isEdit ? "Edit Vehicle" : "Register Vehicle"}</h2>
              <button class="close-modal" data-action="close-modal">×</button>
            </div>
            <div class="modal-body">
              <form id="vehicle-form">
                <label for="brand">Brand:</label>
                <select id="brand" name="brand">${brandOptions}</select>
                <label for="model">Model:</label>
                <input type="text" id="model" name="model" value="${vehicleData?.model || ""}">
                <label for="year">Year:</label>
                <select id="year" name="year">${yearOptions.join("")}</select>
                <button type="submit">${isEdit ? "Update" : "Register"}</button>
              </form>
            </div>
          </div>
        </div>
            `;
      
          // Create and show modal
          document.body.insertAdjacentHTML('beforeend', modalHTML);
          
          // Setup modal event listeners
          this.setupModalEventListeners(modalId, vehicleData);
        }
      
        /**
         * Setup modal event listeners
         */
        setupModalEventListeners(modalId, vehicleData = null) {
          const modal = document.getElementById(modalId);
          
          // Close modal
          modal.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="close-modal"]') || e.target.classList.contains('modal-backdrop')) {
              this.closeModal(modalId);
            }
          });
          
          // Form submission
          const form = modal.querySelector('#vehicle-form');
          if (form) {
            form.addEventListener('submit', (e) => {
              e.preventDefault();
              this.handleVehicleSubmit(modalId, vehicleData);
            });
          }
        }
      
        /**
         * Handle vehicle form submission
         */
        handleVehicleSubmit(modalId, vehicleData = null) {
          const modal = document.getElementById(modalId);
          const form = modal.querySelector('#vehicle-form');
          
          const formData = {
            brand: form.brand.value,
            model: form.model.value,
            year: form.year.value
          };
          
          if (vehicleData) {
            // Update existing vehicle
            console.log('Updating vehicle:', formData);
            if (typeof Utils !== 'undefined' && Utils.showToast) {
              Utils.showToast('Cập nhật xe thành công!', 'success');
            }
          } else {
            // Add new vehicle
            console.log('Adding new vehicle:', formData);
            if (typeof Utils !== 'undefined' && Utils.showToast) {
              Utils.showToast('Đăng ký xe thành công!', 'success');
            }
          }
          
          this.closeModal(modalId);
        }
      
        /**
         * Close modal
         */
        closeModal(modalId) {
          const modal = document.getElementById(modalId);
          if (modal) {
            const backdrop = modal.closest('.modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            } else {
              modal.remove();
            }
          }
        }
      
        /**
         * Edit vehicle
         */
        editVehicle(vehicleId) {
          // Implementation for editing vehicle
          console.log('Edit vehicle:', vehicleId);
        }
      
        /**
         * Delete vehicle
         */
        deleteVehicle(vehicleId) {
          // Implementation for deleting vehicle
          console.log('Delete vehicle:', vehicleId);
        }
      }
      
      // Initialize vehicle manager when DOM is loaded
      document.addEventListener('DOMContentLoaded', () => {
        new VehicleManager();
      });
