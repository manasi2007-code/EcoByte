/**
 * ==============================================================================
 * EcoByte: Smart E-Waste Awareness, Collection & Tracking Portal
 * Main JavaScript Engine (Vanilla JS - Academic Edition)
 * ==============================================================================
 * 
 * TABLE OF CONTENTS:
 * 1. Global State & Pre-Seeded Demonstration Data
 * 2. User Authentication Manager (Sign In / Sign Up)
 * 3. Theme Manager (Dark / Light Mode with Sun/Moon Emoji Toggle)
 * 4. Navigation & Tab Switching Controller (With Protected Routes)
 * 5. User Dashboard Controller & Personal Audit History
 * 6. Homepage & Dynamic Device Impact Estimator
 * 7. Collection Request Form Controller & Live Calculator
 * 8. Live Request Tracking System & Audit Trail Engine
 * 9. E-Waste Awareness & Learning Centre
 * 10. Admin Operations Console & Management Table
 * 11. Modals & Printable Certificate Generators
 * 12. Toast Notifications & Utility Helpers
 * ==============================================================================
 */

// ==============================================================================
// 1. GLOBAL STATE & PRE-SEEDED DEMONSTRATION DATA
// ==============================================================================

const STORAGE_KEY_REQUESTS = 'ecobyte_requests_v1';
const STORAGE_KEY_THEME = 'ecobyte_theme_v1';
const STORAGE_KEY_USER = 'ecobyte_user_session_v1';
const STORAGE_KEY_USERS = 'ecobyte_users_v1';

/**
 * Default sample requests covering all 5 stages of the recycling pipeline.
 */
const DEFAULT_REQUESTS = [
  {
    id: "EW-2026-1042",
    userName: "Rahul Sharma",
    userPhone: "+91 98765 43210",
    userEmail: "rahul.sharma@example.com",
    userAddress: "402, Green Meadows, Indiranagar",
    userCity: "Bangalore",
    userPincode: "560038",
    category: "Mobile Phones & Tablets",
    itemName: "Samsung Galaxy S20 & iPad Mini",
    condition: "Partially Functional / Broken Screen",
    quantity: 2,
    weight: 0.65,
    age: 3,
    pickupDate: "2026-10-18",
    pickupTimeSlot: "Morning (09:00 AM - 12:00 PM)",
    status: "In Transit",
    driverName: "Karthik Verma (Van KA-01-EA-4412)",
    hubName: "EcoByte South Urban Recovery Center",
    co2Saved: 3.2,
    toxicDiverted: 120,
    materials: {
      copper: 35,
      plastics: 30,
      preciousMetals: 15,
      aluminum: 12,
      hazardousNeutralized: 8
    },
    history: [
      { step: "Submitted", time: "Oct 15, 2026 - 10:30 AM", note: "Booking registered online" },
      { step: "Logistics Assigned", time: "Oct 16, 2026 - 02:15 PM", note: "Agent Karthik Verma dispatched" },
      { step: "In Transit", time: "Oct 17, 2026 - 09:40 AM", note: "Collected from doorstep; en route to facility" }
    ]
  },
  {
    id: "EW-2026-3391",
    userName: "Priya Nair",
    userPhone: "+91 98220 11223",
    userEmail: "priya.nair@example.com",
    userAddress: "12/B, Sea View Towers, Bandra West",
    userCity: "Mumbai",
    userPincode: "400050",
    category: "Computers & Laptops",
    itemName: "Apple MacBook Pro 13-inch (Late 2018)",
    condition: "Dead / Scrap / Not Working",
    quantity: 1,
    weight: 2.1,
    age: 6,
    pickupDate: "2026-10-12",
    pickupTimeSlot: "Afternoon (12:00 PM - 04:00 PM)",
    status: "Recycled & Certified",
    driverName: "Sanjay Mane (Van MH-02-CX-7789)",
    hubName: "Maharashtra State Certified R2 Recycling Hub",
    co2Saved: 8.4,
    toxicDiverted: 480,
    materials: {
      copper: 28,
      plastics: 22,
      preciousMetals: 20,
      aluminum: 24,
      hazardousNeutralized: 6
    },
    history: [
      { step: "Submitted", time: "Oct 10, 2026 - 11:00 AM", note: "Disposal manifest created" },
      { step: "Logistics Assigned", time: "Oct 11, 2026 - 09:30 AM", note: "Driver Sanjay Mane assigned" },
      { step: "In Transit", time: "Oct 12, 2026 - 01:20 PM", note: "Verified barcode scan at doorstep" },
      { step: "At Recycling Facility", time: "Oct 13, 2026 - 10:00 AM", note: "Arrived at R2 recovery plant" },
      { step: "Recycled & Certified", time: "Oct 14, 2026 - 04:45 PM", note: "Urban mining extraction & certificate issued" }
    ]
  },
  {
    id: "EW-2026-5812",
    userName: "Amit Patel",
    userPhone: "+91 97112 34567",
    userEmail: "amit.patel@example.com",
    userAddress: "78, Anand Nagar, Satellite Road",
    userCity: "Ahmedabad",
    userPincode: "380015",
    category: "Consumer Electronics",
    itemName: "Sony 32-inch LED TV & Amplifier",
    condition: "Partially Functional / Broken Screen",
    quantity: 2,
    weight: 9.5,
    age: 7,
    pickupDate: "2026-10-19",
    pickupTimeSlot: "Evening (04:00 PM - 07:00 PM)",
    status: "Submitted",
    driverName: "Pending Logistics Route Allocation",
    hubName: "Gujarat EcoByte Central Station",
    co2Saved: 16.2,
    toxicDiverted: 1150,
    materials: {
      copper: 25,
      plastics: 35,
      preciousMetals: 10,
      aluminum: 18,
      hazardousNeutralized: 12
    },
    history: [
      { step: "Submitted", time: "Oct 17, 2026 - 10:05 AM", note: "New pickup request registered" }
    ]
  },
  {
    id: "EW-2026-9024",
    userName: "Sneha Mukherjee",
    userPhone: "+91 94330 99881",
    userEmail: "sneha.m@example.com",
    userAddress: "55, Park Circus Avenue",
    userCity: "Kolkata",
    userPincode: "700017",
    category: "Home Appliances",
    itemName: "Panasonic Microwave Oven & Blender",
    condition: "Dead / Scrap / Not Working",
    quantity: 2,
    weight: 12.0,
    age: 5,
    pickupDate: "2026-10-14",
    pickupTimeSlot: "Morning (09:00 AM - 12:00 PM)",
    status: "At Recycling Facility",
    driverName: "Debashis Sen (Van WB-01-EE-3341)",
    hubName: "Eastern Bengal Green Recovery Plant",
    co2Saved: 22.5,
    toxicDiverted: 1400,
    materials: {
      copper: 30,
      plastics: 28,
      preciousMetals: 5,
      aluminum: 25,
      hazardousNeutralized: 12
    },
    history: [
      { step: "Submitted", time: "Oct 13, 2026 - 03:15 PM", note: "Booking logged" },
      { step: "Logistics Assigned", time: "Oct 14, 2026 - 08:30 AM", note: "Driver Debashis Sen en route" },
      { step: "In Transit", time: "Oct 14, 2026 - 11:45 AM", note: "Items collected securely" },
      { step: "At Recycling Facility", time: "Oct 16, 2026 - 02:00 PM", note: "Dismantling & PCB sorting in progress" }
    ]
  }
];

const TOXIC_MATERIALS = [
  {
    symbol: "Pb",
    name: "Lead",
    hazard: "Severe Neurotoxin",
    foundIn: "Solder on circuit boards, older CRT monitors, lead-acid batteries.",
    healthImpact: "Causes severe damage to central & peripheral nervous system, kidneys, and blood system; especially dangerous for brain development in children.",
    ecoImpact: "Leaches into groundwater and bioaccumulates in terrestrial and aquatic food chains."
  },
  {
    symbol: "Hg",
    name: "Mercury",
    hazard: "Critical Bioaccumulative",
    foundIn: "CCFL backlights in flat screens, tilt sensors, switches, medical monitors.",
    healthImpact: "Inhalation of mercury vapors damages neurological pathways, sensory impairment, and memory loss.",
    ecoImpact: "Transforms into highly toxic methylmercury in rivers, poisoning fish and marine life."
  },
  {
    symbol: "Cd",
    name: "Cadmium",
    hazard: "Carcinogenic",
    foundIn: "Ni-Cd rechargeable batteries, surface-mount chip resistors, infrared detectors.",
    healthImpact: "Classified as human carcinogen. Accumulates in kidneys causing irreversible renal failure and bone softening.",
    ecoImpact: "Extremely toxic to soil microorganisms and plant roots, poisoning agriculture."
  },
  {
    symbol: "BFR",
    name: "Brominated Flame Retardants",
    hazard: "Endocrine Disruptor",
    foundIn: "Plastic electronic casings, cables, circuit board epoxy resins.",
    healthImpact: "Disrupts thyroid hormone functions; when burned informally, emits lethal dioxins and furans.",
    ecoImpact: "Persistent organic pollutants (POPs) that travel vast distances without decomposing."
  },
  {
    symbol: "Li",
    name: "Lithium & Cobalt",
    hazard: "Thermal Runaway & Heavy Metal",
    foundIn: "Rechargeable Lithium-ion batteries in smartphones, laptops, and electric vehicles.",
    healthImpact: "Cobalt dust causes chronic respiratory illnesses (hard metal lung disease) and skin allergies.",
    ecoImpact: "Punctured cells trigger intense chemical fires that release hydrogen fluoride gas."
  },
  {
    symbol: "As",
    name: "Arsenic",
    hazard: "High Toxicity",
    foundIn: "Older cathode ray tubes (CRT), semiconductor dopants, and gallium arsenide LEDs.",
    healthImpact: "Chronic exposure causes skin lesions, peripheral neuropathy, and vascular disease.",
    ecoImpact: "Permanent groundwater contaminant, making drinking well water toxic."
  }
];

const DEVICE_CALC_DATA = {
  smartphone: {
    name: "Smartphone",
    weightKg: 0.2,
    goldMg: 35,
    co2Kg: 2.5,
    toxicG: 45
  },
  laptop: {
    name: "Laptop",
    weightKg: 2.2,
    goldMg: 220,
    co2Kg: 8.5,
    toxicG: 280
  },
  battery: {
    name: "Li-ion Battery",
    weightKg: 0.4,
    goldMg: 0,
    co2Kg: 1.8,
    toxicG: 190
  },
  crt: {
    name: "CRT / Monitor",
    weightKg: 12.0,
    goldMg: 50,
    co2Kg: 18.0,
    toxicG: 1800
  },
  cables: {
    name: "Wires & Cables (1kg)",
    weightKg: 1.0,
    goldMg: 5,
    co2Kg: 3.2,
    toxicG: 60
  }
};

// ==============================================================================
// 2. USER AUTHENTICATION MANAGER (SIGN IN / SIGN UP)
// ==============================================================================

class AuthManager {
  static currentUser = null;

  // Built-in facility administrator account (not shown anywhere in the UI).
  // Change or delete these credentials as needed.
  static ADMIN_ACCOUNT = {
    name: "Manasi Wagh",
    email: "manasiwagh10@gmail.com",
    phone: "",
    role: "Admin",
    memberId: "EB-ADMIN",
    password: "EcoByte"
  };

  // ---- Registered users "table" (localStorage) ----
  static getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_USERS);
      const users = raw ? JSON.parse(raw) : [];
      return Array.isArray(users) ? users : [];
    } catch (e) {
      return [];
    }
  }

  static saveUsers(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }

  static findUserByEmail(email) {
    const key = String(email).trim().toLowerCase();
    if (key === this.ADMIN_ACCOUNT.email) return this.ADMIN_ACCOUNT;
    return this.getUsers().find(u => u.email.toLowerCase() === key) || null;
  }

  static async hashPassword(password) {
    if (window.crypto && window.crypto.subtle) {
      const bytes = new TextEncoder().encode(password);
      const digest = await window.crypto.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    return btoa(unescape(encodeURIComponent(password)));
  }

  static toSession(user) {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      memberId: user.memberId
    };
  }

  static init() {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        const session = JSON.parse(saved);
        // Only restore the session if the account still exists
        this.currentUser = (session && this.findUserByEmail(session.email)) ? session : null;
      } catch (e) {
        this.currentUser = null;
      }
      if (!this.currentUser) localStorage.removeItem(STORAGE_KEY_USER);
    }
    this.updateUI();
  }

  static startSession(user, message) {
    this.currentUser = this.toSession(user);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(this.currentUser));
    this.updateUI();
    showToast(message);
    setTimeout(() => {
      switchTab(this.currentUser.role === 'Admin' ? 'admin-portal' : 'user-dashboard');
    }, 400);
  }

  static async login(email, password, role = 'Citizen') {
    const user = this.findUserByEmail(email);
    if (!user) {
      showToast("No account found with this email. Please sign up first.", true);
      return null;
    }

    const hash = await this.hashPassword(password);
    const valid = user === this.ADMIN_ACCOUNT ? (password === user.password) : (user.passwordHash === hash);
    if (!valid) {
      showToast("Incorrect password. Please try again.", true);
      return null;
    }

    if (user.role !== role) {
      showToast(`This account is not registered as ${role === 'Admin' ? 'a Facility Administrator' : 'a Citizen'}. Choose the correct Account Type.`, true);
      return null;
    }

    this.startSession(user, `Signed in successfully as ${user.name}.`);
    return user;
  }

  static async signup(name, email, phone, password) {
    name = name.trim();
    email = email.trim().toLowerCase();
    phone = phone.trim();

    if (password.length < 6) {
      showToast("Password must be at least 6 characters long.", true);
      return null;
    }
    if (this.findUserByEmail(email)) {
      showToast("An account with this email already exists. Please sign in instead.", true);
      return null;
    }

    const user = {
      name,
      email,
      phone,
      role: "Citizen",
      memberId: `EB-${Math.floor(1000 + Math.random() * 9000)}`,
      passwordHash: await this.hashPassword(password),
      createdAt: new Date().toISOString()
    };

    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);

    this.startSession(user, `Welcome to EcoByte, ${user.name}! Your account has been created.`);
    return user;
  }

  static logout() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEY_USER);
    this.updateUI();
    showToast("Signed out of your account.");
    switchTab('home-page');
  }

  static updateUI() {
    const loggedOutCard = document.getElementById('homeAuthLoggedOut');
    const loggedInCard = document.getElementById('homeAuthLoggedIn');
    const navAuth = document.getElementById('navAuthContainer');
    const roleStatusText = document.getElementById('roleStatusText');

    if (this.currentUser) {
      if (loggedOutCard) loggedOutCard.classList.add('hidden');
      if (loggedInCard) loggedInCard.classList.remove('hidden');

      const nameEl = document.getElementById('loggedInUserName');
      const roleBadge = document.getElementById('loggedInRoleBadge');
      const memberEl = document.getElementById('loggedInMemberId');

      if (nameEl) nameEl.textContent = `Welcome, ${this.currentUser.name}`;
      if (roleBadge) roleBadge.textContent = this.currentUser.role;
      if (memberEl) memberEl.textContent = this.currentUser.memberId;

      if (navAuth) {
        navAuth.innerHTML = `
          <div class="nav-user-pill">
            <span>${this.currentUser.name}</span>
            <span class="user-role-badge">${this.currentUser.role}</span>
            <button class="btn-signout-link" onclick="handleLogout()">Logout</button>
          </div>
        `;
      }

      if (roleStatusText) {
        roleStatusText.textContent = `${this.currentUser.role} Session`;
      }

      // Prefill fields
      const formName = document.getElementById('userName');
      const formEmail = document.getElementById('userEmail');
      const formPhone = document.getElementById('userPhone');
      if (formName) formName.value = this.currentUser.name;
      if (formEmail) formEmail.value = this.currentUser.email;
      if (formPhone && this.currentUser.phone) formPhone.value = this.currentUser.phone;


    } else {
      if (loggedOutCard) loggedOutCard.classList.remove('hidden');
      if (loggedInCard) loggedInCard.classList.add('hidden');

      if (navAuth) {
        navAuth.innerHTML = `
          <button class="btn btn-secondary btn-sm" onclick="scrollToHomeAuth()">Sign In / Register</button>
        `;
      }

      if (roleStatusText) {
        roleStatusText.textContent = "Public Visitor";
      }
    }
  }
}

function switchHomeAuthTab(tab) {
  const loginPane = document.getElementById('homeLoginPane');
  const signupPane = document.getElementById('homeSignupPane');
  const btnLogin = document.getElementById('tabBtnLogin');
  const btnSignup = document.getElementById('tabBtnSignup');

  if (tab === 'login') {
    loginPane.classList.remove('hidden');
    signupPane.classList.add('hidden');
    btnLogin.classList.add('active');
    btnSignup.classList.remove('active');
  } else {
    loginPane.classList.add('hidden');
    signupPane.classList.remove('hidden');
    btnLogin.classList.remove('active');
    btnSignup.classList.add('active');
  }
}

async function handleHomeLogin(e) {
  e.preventDefault();
  const email = document.getElementById('homeLoginEmail').value;
  const pass = document.getElementById('homeLoginPassword').value;
  const role = document.getElementById('homeLoginRole').value;
  const user = await AuthManager.login(email, pass, role);
  if (user) e.target.reset();
}

async function handleHomeSignup(e) {
  e.preventDefault();
  const name = document.getElementById('homeSignupName').value;
  const email = document.getElementById('homeSignupEmail').value;
  const phone = document.getElementById('homeSignupPhone').value;
  const pass = document.getElementById('homeSignupPassword').value;
  const user = await AuthManager.signup(name, email, phone, pass);
  if (user) e.target.reset();
}

function handleLogout() {
  AuthManager.logout();
}

function scrollToAdminLogin() {
  scrollToHomeAuth();
  const roleSelect = document.getElementById('homeLoginRole');
  if (roleSelect) roleSelect.value = 'Admin';
}

function scrollToHomeAuth() {
  switchTab('home-page');
  const card = document.getElementById('homeAuthLoggedOut');
  if (card) {
    card.scrollIntoView({ behavior: 'smooth' });
  }
}

// ==============================================================================
// 3. THEME MANAGER (SUN / MOON EMOJI TOGGLE)
// ==============================================================================

class ThemeManager {
  static init() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    this.applyTheme(initialTheme);

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        showToast(`Theme switched to ${newTheme.toUpperCase()} mode.`);
      });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY_THEME)) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  static applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
    
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.content = theme === 'dark' ? 'dark' : 'light';
    }
  }
}

// ==============================================================================
// 4. NAVIGATION & TAB ROUTER (WITH AUTH GATE)
// ==============================================================================

function switchTab(tabId) {
  // Update nav buttons
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update tab panes
  const panes = document.querySelectorAll('.tab-pane');
  panes.forEach(pane => {
    if (pane.id === tabId) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Route protection & state updates:
  if (tabId === 'collection-form') {
    // "to put a request first you have to login or signup"
    const formGate = document.getElementById('formAuthGate');
    const formContent = document.getElementById('formContentArea');
    if (!AuthManager.currentUser) {
      if (formGate) formGate.classList.remove('hidden');
      if (formContent) formContent.classList.add('hidden');
    } else {
      if (formGate) formGate.classList.add('hidden');
      if (formContent) formContent.classList.remove('hidden');
    }
  } else if (tabId === 'user-dashboard') {
    // Dashboard requires authentication or shows sign in prompt
    const dashGate = document.getElementById('dashboardAuthGate');
    const dashContent = document.getElementById('dashboardAuthContent');
    if (!AuthManager.currentUser) {
      if (dashGate) dashGate.classList.remove('hidden');
      if (dashContent) dashContent.classList.add('hidden');
    } else {
      if (dashGate) dashGate.classList.add('hidden');
      if (dashContent) dashContent.classList.remove('hidden');
      DashboardManager.renderUserDashboard();
    }
  } else if (tabId === 'admin-portal') {
    // Admin console is only available to a signed-in administrator
    const adminGate = document.getElementById('adminAuthGate');
    const adminContent = document.getElementById('adminAuthContent');
    const isAdmin = AuthManager.currentUser && AuthManager.currentUser.role === 'Admin';
    if (!isAdmin) {
      if (adminGate) adminGate.classList.remove('hidden');
      if (adminContent) adminContent.classList.add('hidden');
    } else {
      if (adminGate) adminGate.classList.add('hidden');
      if (adminContent) adminContent.classList.remove('hidden');
      AdminManager.render();
    }
  } else if (tabId === 'request-tracker') {
    const trackerInput = document.getElementById('trackerInput');
    if (!trackerInput.value) {
      setAndTrackId('EW-2026-1042');
    }
  }
}

function triggerSchedulePickup(category = null) {
  if (!AuthManager.currentUser) {
    showToast("Please sign in or register on the Home page to put a collection request.", true);
    switchTab('collection-form');
  } else {
    switchTab('collection-form');
    if (category) {
      const select = document.getElementById('deviceCategory');
      if (select) {
        select.value = category;
        FormManager.onFormChange();
      }
    }
  }
}

// ==============================================================================
// 5. STORAGE & REPOSITORY CONTROLLER
// ==============================================================================

class StorageManager {
  static getAllRequests() {
    const raw = localStorage.getItem(STORAGE_KEY_REQUESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(DEFAULT_REQUESTS));
      return DEFAULT_REQUESTS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(DEFAULT_REQUESTS));
      return DEFAULT_REQUESTS;
    }
  }

  static saveAllRequests(requests) {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
  }

  static addRequest(newReq) {
    const list = this.getAllRequests();
    list.unshift(newReq);
    this.saveAllRequests(list);
    return newReq;
  }

  static getRequestById(id) {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    const list = this.getAllRequests();
    return list.find(r => r.id.toUpperCase() === cleanId) || null;
  }

  static updateRequestStatus(id, newStatus) {
    const list = this.getAllRequests();
    const item = list.find(r => r.id.toUpperCase() === id.toUpperCase());
    if (item) {
      item.status = newStatus;
      const now = new Date();
      const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
                      ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      item.history = item.history || [];
      item.history.push({
        step: newStatus,
        time: timeStr,
        note: `Status updated by Operations Admin to "${newStatus}"`
      });
      this.saveAllRequests(list);
      return true;
    }
    return false;
  }

  static deleteRequest(id) {
    let list = this.getAllRequests();
    list = list.filter(r => r.id.toUpperCase() !== id.toUpperCase());
    this.saveAllRequests(list);
  }

  static resetToDefault() {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(DEFAULT_REQUESTS));
  }
}

// ==============================================================================
// 6. DASHBOARD MANAGER (USER VIEW & HOMEPAGE ESTIMATOR)
// ==============================================================================

class DashboardManager {
  static init() {
    this.initMiniCalculator();
    this.initActivityTicker();
    this.updateStatsCounters();

    const brand = document.getElementById('brandLogo');
    if (brand) {
      brand.addEventListener('click', () => switchTab('home-page'));
    }
  }

  static updateStatsCounters() {
    const all = StorageManager.getAllRequests();
    let totalKg = 18450;
    let toxicG = 4120;
    let carbonKg = 36800;
    let certCount = 2840;

    all.forEach(r => {
      totalKg += (Number(r.weight) || 1);
      toxicG += Math.round((Number(r.toxicDiverted) || 200) / 1000);
      carbonKg += (Number(r.co2Saved) || 3.5);
      if (r.status === 'Recycled & Certified') {
        certCount++;
      }
    });

    const elKg = document.getElementById('statTotalKg');
    const elTox = document.getElementById('statToxicDiverted');
    const elCo2 = document.getElementById('statCarbonSaved');
    const elCert = document.getElementById('statCertificates');

    if (elKg) elKg.textContent = totalKg.toLocaleString();
    if (elTox) elTox.textContent = (toxicG).toLocaleString();
    if (elCo2) elCo2.textContent = (carbonKg / 1000).toFixed(1);
    if (elCert) elCert.textContent = certCount.toLocaleString();
  }

  static renderUserDashboard() {
    if (!AuthManager.currentUser) return;

    const greeting = document.getElementById('dashGreetingName');
    const itemsEl = document.getElementById('dashUserItems');
    const co2El = document.getElementById('dashUserCo2');
    const tableBody = document.getElementById('userHistoryTableBody');

    if (greeting) greeting.textContent = `Welcome, ${AuthManager.currentUser.name}`;

    const all = StorageManager.getAllRequests();
    // Show only the requests that belong to the signed-in user (matched by email)
    const myEmail = AuthManager.currentUser.email.toLowerCase();
    const displayReqs = all.filter(r => (r.userEmail || '').toLowerCase() === myEmail);

    let totalCo2 = 0;
    displayReqs.forEach(r => {
      totalCo2 += (Number(r.co2Saved) || 3.5);
    });

    if (itemsEl) itemsEl.textContent = `${displayReqs.length}`;
    if (co2El) co2El.textContent = `~${totalCo2.toFixed(1)} kg`;

    if (tableBody) {
      if (displayReqs.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align:center; padding: 2rem; color: var(--text-muted);">
              You have no active collection requests yet. Click "+ New Collection Request" above to get started.
            </td>
          </tr>
        `;
      } else {
        tableBody.innerHTML = displayReqs.map(r => `
          <tr>
            <td><strong>${r.id}</strong></td>
            <td>${r.itemName}<br><small style="color:var(--text-muted);">${r.category}</small></td>
            <td>${r.weight} kg (${r.quantity}x)</td>
            <td>${r.pickupDate}</td>
            <td><span class="status-badge ${r.status === 'Recycled & Certified' ? 'completed' : 'transit'}" style="font-size:0.75rem; padding: 0.2rem 0.55rem;">${r.status}</span></td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="setAndTrackId('${r.id}'); switchTab('request-tracker');">Track</button>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  static initMiniCalculator() {
    const chipsContainer = document.getElementById('calcChips');
    if (!chipsContainer) return;

    const chips = chipsContainer.querySelectorAll('.chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const devType = chip.getAttribute('data-type');
        DashboardManager.renderMiniCalcResult(devType);
      });
    });

    this.renderMiniCalcResult('smartphone');
  }

  static renderMiniCalcResult(type) {
    const data = DEVICE_CALC_DATA[type] || DEVICE_CALC_DATA.smartphone;
    const container = document.getElementById('calcDisplay');
    if (!container) return;

    container.innerHTML = `
      <div class="calc-result-row">
        <span>Precious Metal Yield:</span>
        <strong class="text-green">${data.goldMg > 0 ? data.goldMg + ' mg Gold & Silver' : 'Cobalt & Lithium Recovery'}</strong>
      </div>
      <div class="calc-result-row">
        <span>Toxic Elements Diverted:</span>
        <strong class="text-amber">~${data.toxicG} grams (Lead/Mercury/Lithium)</strong>
      </div>
      <div class="calc-result-row">
        <span>Carbon Offset:</span>
        <strong class="text-green">~${data.co2Kg} kg CO2e saved</strong>
      </div>
    `;
  }

  static initActivityTicker() {
    const tickerContainer = document.getElementById('recentActivityList');
    if (!tickerContainer) return;

    const activities = [
      "Ananya S. recycled 2 laptops in Bangalore (4.2 kg diverted)",
      "Rahul K. scheduled pickup in New Delhi - 1 CRT monitor safely intercepted",
      "Priya N. received 'Certified E-Waste Champion' verification",
      "Sanjay M. completed batch collection of 15 smartphones in Pune",
      "Eastern Bengal Hub processed 450 kg IT scrap into secondary copper billets"
    ];

    let currentIndex = 0;
    tickerContainer.innerHTML = activities[0];

    setInterval(() => {
      currentIndex = (currentIndex + 1) % activities.length;
      tickerContainer.style.opacity = '0';
      setTimeout(() => {
        tickerContainer.innerHTML = activities[currentIndex];
        tickerContainer.style.opacity = '1';
      }, 250);
    }, 4000);
  }
}

// ==============================================================================
// 7. COLLECTION REQUEST FORM HANDLER & LIVE ECO CALCULATOR
// ==============================================================================

class FormManager {
  static init() {
    const form = document.getElementById('eWasteForm');
    if (!form) return;

    ['deviceCategory', 'deviceQuantity', 'deviceWeight'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.onFormChange());
        el.addEventListener('change', () => this.onFormChange());
      }
    });

    const dateInput = document.getElementById('pickupDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    this.initImageUpload();
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  static adjustQuantity(delta) {
    const qtyInput = document.getElementById('deviceQuantity');
    if (!qtyInput) return;
    let val = parseInt(qtyInput.value, 10) || 1;
    val = Math.max(1, Math.min(100, val + delta));
    qtyInput.value = val;
    this.onFormChange();
  }

  static onFormChange() {
    const category = document.getElementById('deviceCategory').value;
    const qty = parseInt(document.getElementById('deviceQuantity').value, 10) || 1;
    const weightInput = document.getElementById('deviceWeight');

    let defaultUnitWeight = 2.0;

    switch (category) {
      case 'Computers & Laptops':
        defaultUnitWeight = 2.2;
        break;
      case 'Mobile Phones & Tablets':
        defaultUnitWeight = 0.3;
        break;
      case 'Consumer Electronics':
        defaultUnitWeight = 6.0;
        break;
      case 'Batteries & Power Units':
        defaultUnitWeight = 1.5;
        break;
      case 'Home Appliances':
        defaultUnitWeight = 12.0;
        break;
      case 'Cables & Accessories':
        defaultUnitWeight = 0.8;
        break;
    }

    const currentWeight = parseFloat(weightInput.value) || (defaultUnitWeight * qty);
    const estCo2 = (currentWeight * 3.6).toFixed(1);
    const estToxic = Math.round(currentWeight * 140);

    const dispWeight = document.getElementById('liveWeightDisplay');
    const dispCo2 = document.getElementById('liveCo2Display');
    const dispToxic = document.getElementById('liveToxicDisplay');

    if (dispWeight) dispWeight.textContent = `${currentWeight.toFixed(1)} kg`;
    if (dispCo2) dispCo2.textContent = `~${estCo2} kg CO2e`;
    if (dispToxic) dispToxic.textContent = `~${estToxic} grams`;
  }

  static initImageUpload() {
    const dropZone = document.getElementById('uploadDropZone');
    const fileInput = document.getElementById('itemImageInput');
    const previewBox = document.getElementById('imagePreviewBox');
    const previewImg = document.getElementById('previewImageSrc');
    const placeholder = document.getElementById('uploadPlaceholder');
    const removeBtn = document.getElementById('removeImageBtn');

    if (!dropZone || !fileInput) return;

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          previewImg.src = event.target.result;
          previewBox.classList.remove('hidden');
          placeholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
      }
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        previewImg.src = '';
        previewBox.classList.add('hidden');
        placeholder.classList.remove('hidden');
      });
    }
  }

  static handleSubmit(e) {
    e.preventDefault();

    if (!AuthManager.currentUser) {
      showToast("Authentication required: Please sign in or register before submitting a collection request.", true);
      switchTab('home-page');
      return;
    }

    const category = document.getElementById('deviceCategory').value;
    const itemName = document.getElementById('deviceName').value.trim();
    const condition = document.getElementById('deviceCondition').value;
    const quantity = parseInt(document.getElementById('deviceQuantity').value, 10) || 1;
    const weight = parseFloat(document.getElementById('deviceWeight').value) || 2.0;
    const age = parseInt(document.getElementById('deviceAge').value, 10) || 2;
    
    const userName = document.getElementById('userName').value.trim() || AuthManager.currentUser.name;
    const userPhone = document.getElementById('userPhone').value.trim();
    const userEmail = document.getElementById('userEmail').value.trim() || AuthManager.currentUser.email;
    const userAddress = document.getElementById('userAddress').value.trim();
    const userCity = document.getElementById('userCity').value.trim();
    const userPincode = document.getElementById('userPincode').value.trim();
    const pickupDate = document.getElementById('pickupDate').value;
    const pickupTimeSlot = document.getElementById('pickupTimeSlot').value;
    const dataWipe = document.getElementById('dataWipeCheckbox').checked;

    if (!category || !itemName || !userName || !userPhone || !userEmail || !userAddress || !userCity || !userPincode || !pickupDate) {
      showToast("Please fill in all mandatory fields marked with an asterisk (*)", true);
      return;
    }

    if (!dataWipe) {
      showToast("Please acknowledge data sanitization before booking.", true);
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `EW-2026-${randomSuffix}`;

    const now = new Date();
    const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
                    ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newRequest = {
      id: trackingId,
      userName,
      userPhone,
      userEmail,
      userAddress,
      userCity,
      userPincode,
      category,
      itemName,
      condition,
      quantity,
      weight,
      age,
      pickupDate,
      pickupTimeSlot,
      status: "Submitted",
      driverName: "Pending Logistics Route Allocation",
      hubName: `${userCity} Regional EcoByte Recovery Center`,
      co2Saved: Number((weight * 3.6).toFixed(1)),
      toxicDiverted: Math.round(weight * 150),
      materials: {
        copper: 30,
        plastics: 35,
        preciousMetals: 12,
        aluminum: 18,
        hazardousNeutralized: 5
      },
      history: [
        { step: "Submitted", time: timeStr, note: "Pickup request registered by citizen" }
      ]
    };

    StorageManager.addRequest(newRequest);
    DashboardManager.updateStatsCounters();

    // Update request count in user session
    if (AuthManager.currentUser) {
      AuthManager.currentUser.requestsCount = (AuthManager.currentUser.requestsCount || 0) + 1;
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(AuthManager.currentUser));
      AuthManager.updateUI();
    }

    this.showSuccessModal(newRequest);
    resetForm();
  }

  static showSuccessModal(req) {
    const modal = document.getElementById('requestSuccessModal');
    const idEl = document.getElementById('successTrackingId');
    const sumEl = document.getElementById('successDetailsSummary');

    if (idEl) idEl.textContent = req.id;
    if (sumEl) {
      sumEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.3rem;">
          <span><strong>Device:</strong> ${req.itemName} (${req.category})</span>
          <span><strong>Weight:</strong> ${req.weight} kg</span>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom: 0.3rem;">
          <span><strong>Pickup Address:</strong> ${req.userAddress}, ${req.userCity}</span>
          <span><strong>Slot:</strong> ${req.pickupDate}</span>
        </div>
        <div style="display:flex; justify-content:space-between; color: var(--primary);">
          <span><strong>CO2 Prevented:</strong> ${req.co2Saved} kg</span>
        </div>
      `;
    }

    if (modal) modal.classList.remove('hidden');
  }
}

function adjustQuantity(delta) {
  FormManager.adjustQuantity(delta);
}

function resetForm() {
  const form = document.getElementById('eWasteForm');
  if (form) form.reset();
  const previewBox = document.getElementById('imagePreviewBox');
  const placeholder = document.getElementById('uploadPlaceholder');
  if (previewBox) previewBox.classList.add('hidden');
  if (placeholder) placeholder.classList.remove('hidden');
  FormManager.onFormChange();
}

function fillSampleFormData() {
  document.getElementById('deviceCategory').value = 'Computers & Laptops';
  document.getElementById('deviceName').value = 'HP Pavilion 15 (Core i5, 8GB RAM)';
  document.getElementById('deviceCondition').value = 'Partially Functional / Broken Screen';
  document.getElementById('deviceQuantity').value = '1';
  document.getElementById('deviceWeight').value = '2.3';
  document.getElementById('deviceAge').value = '5';
  
  document.getElementById('userName').value = AuthManager.currentUser ? AuthManager.currentUser.name : 'Aarav Sharma';
  document.getElementById('userPhone').value = '+91 98765 12345';
  document.getElementById('userEmail').value = AuthManager.currentUser ? AuthManager.currentUser.email : 'aarav.sharma@college.edu';
  document.getElementById('userAddress').value = 'Room 304, Green Park Campus';
  document.getElementById('userCity').value = 'Bangalore';
  document.getElementById('userPincode').value = '560001';
  document.getElementById('pickupTimeSlot').value = 'Afternoon (12:00 PM - 04:00 PM)';
  document.getElementById('dataWipeCheckbox').checked = true;

  FormManager.onFormChange();
  showToast("Sample demonstration data auto-filled.");
}

function copyTrackingId() {
  const idEl = document.getElementById('successTrackingId');
  if (!idEl) return;
  const idText = idEl.textContent.trim();
  navigator.clipboard.writeText(idText).then(() => {
    showToast(`Tracking ID "${idText}" copied.`);
  }).catch(() => {
    showToast(`ID: ${idText}`);
  });
}

function proceedToTrackSuccessId() {
  const idEl = document.getElementById('successTrackingId');
  const id = idEl ? idEl.textContent.trim() : '';
  closeModal('requestSuccessModal');
  setAndTrackId(id);
  switchTab('request-tracker');
}

// ==============================================================================
// 8. REQUEST TRACKING SYSTEM & AUDIT TRAIL ENGINE
// ==============================================================================

function setAndTrackId(id) {
  const input = document.getElementById('trackerInput');
  if (input) input.value = id;
  performTrackingSearch();
}

function performTrackingSearch() {
  const input = document.getElementById('trackerInput');
  const id = input ? input.value.trim() : '';
  const resultArea = document.getElementById('trackingResultArea');

  if (!id) {
    showToast("Please enter a Tracking ID to search", true);
    return;
  }

  const req = StorageManager.getRequestById(id);

  if (!req) {
    resultArea.innerHTML = `
      <div class="text-center" style="padding: 2.5rem 1rem;">
        <h3>No Request Found for "${id}"</h3>
        <p style="margin-top: 0.5rem; max-width: 480px; margin-left: auto; margin-right: auto;">
          Please verify the Tracking ID format (e.g. <code>EW-2026-1042</code>) or select a sample ID above.
        </p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 1.25rem;" onclick="setAndTrackId('EW-2026-1042')">Try Sample ID: EW-2026-1042</button>
      </div>
    `;
    return;
  }

  const STAGES = [
    { key: "Submitted", label: "Request Logged", stepNum: "1" },
    { key: "Logistics Assigned", label: "Logistics Assigned", stepNum: "2" },
    { key: "In Transit", label: "In Transit", stepNum: "3" },
    { key: "At Recycling Facility", label: "At R2 Plant", stepNum: "4" },
    { key: "Recycled & Certified", label: "Urban Recovered", stepNum: "5" }
  ];

  let activeIndex = 0;
  if (req.status === "Logistics Assigned") activeIndex = 1;
  else if (req.status === "In Transit") activeIndex = 2;
  else if (req.status === "At Recycling Facility") activeIndex = 3;
  else if (req.status === "Recycled & Certified") activeIndex = 4;

  const progressPercent = (activeIndex / (STAGES.length - 1)) * 100;

  let stepperHtml = `
    <div class="tracking-stepper">
      <div class="stepper-progress-fill" style="width: ${progressPercent}%;"></div>
  `;

  STAGES.forEach((stage, idx) => {
    let stateClass = "";
    if (idx < activeIndex) stateClass = "completed";
    else if (idx === activeIndex) stateClass = "active";

    const hist = (req.history || []).find(h => h.step === stage.key);
    const timeLabel = hist ? hist.time.split(' - ')[0] : 'Pending';

    stepperHtml += `
      <div class="step-node ${stateClass}">
        <div class="node-icon-circle">${idx < activeIndex ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>' : stage.stepNum}</div>
        <div class="node-label">${stage.label}</div>
        <div class="node-time">${timeLabel}</div>
      </div>
    `;
  });
  stepperHtml += `</div>`;

  let statusBadgeClass = "submitted";
  if (req.status === "Logistics Assigned") statusBadgeClass = "assigned";
  else if (req.status === "In Transit") statusBadgeClass = "transit";
  else if (req.status === "At Recycling Facility") statusBadgeClass = "facility";
  else if (req.status === "Recycled & Certified") statusBadgeClass = "completed";

  resultArea.innerHTML = `
    <div class="tracking-header">
      <div>
        <span class="pill-tag">OFFICIAL AUDIT MANIFEST</span>
        <div class="tracking-id-tag">${req.id}</div>
        <p style="font-size: 0.88rem; margin-top: 0.2rem;">Registered under Central & State WEEE Recovery Grid</p>
      </div>
      <div>
        <span class="status-badge ${statusBadgeClass}">
          <span class="pulse-dot"></span>
          ${req.status}
        </span>
      </div>
    </div>

    ${stepperHtml}

    <div class="tracking-info-grid">
      <div class="info-item">
        <span>Owner / Client:</span>
        <strong>${req.userName}</strong>
      </div>
      <div class="info-item">
        <span>Device & Category:</span>
        <strong>${req.itemName} (${req.category})</strong>
      </div>
      <div class="info-item">
        <span>Net Discard Weight:</span>
        <strong>${req.weight} kg (${req.quantity} unit${req.quantity > 1 ? 's' : ''})</strong>
      </div>
      <div class="info-item">
        <span>Pickup Location:</span>
        <strong>${req.userCity} (${req.userPincode})</strong>
      </div>
      <div class="info-item">
        <span>Assigned Courier / Vehicle:</span>
        <strong>${req.driverName || 'Dispatching soon'}</strong>
      </div>
      <div class="info-item">
        <span>Designated Recovery Hub:</span>
        <strong>${req.hubName}</strong>
      </div>
    </div>

    <div class="material-recovery-card">
      <h4>Estimated Circular Material Recovery Yield</h4>
      <div class="material-bars">
        <div class="mat-row">
          <span class="mat-name">Copper & Conductors:</span>
          <div class="mat-bar-track">
            <div class="mat-bar-fill" style="width: ${req.materials.copper}%; background-color: #d97706;"></div>
          </div>
          <span class="mat-percent">${req.materials.copper}%</span>
        </div>
        <div class="mat-row">
          <span class="mat-name">Clean Engineering Polymers:</span>
          <div class="mat-bar-track">
            <div class="mat-bar-fill" style="width: ${req.materials.plastics}%; background-color: #0284c7;"></div>
          </div>
          <span class="mat-percent">${req.materials.plastics}%</span>
        </div>
        <div class="mat-row">
          <span class="mat-name">Gold, Silver & Rare Earths:</span>
          <div class="mat-bar-track">
            <div class="mat-bar-fill" style="width: ${req.materials.preciousMetals}%; background-color: #2563eb;"></div>
          </div>
          <span class="mat-percent">${req.materials.preciousMetals}%</span>
        </div>
        <div class="mat-row">
          <span class="mat-name">Aluminum & Ferrous Metals:</span>
          <div class="mat-bar-track">
            <div class="mat-bar-fill" style="width: ${req.materials.aluminum}%; background-color: #64748b;"></div>
          </div>
          <span class="mat-percent">${req.materials.aluminum}%</span>
        </div>
        <div class="mat-row">
          <span class="mat-name">Hazardous Toxins Safely Slagged:</span>
          <div class="mat-bar-track">
            <div class="mat-bar-fill" style="width: ${req.materials.hazardousNeutralized}%; background-color: #dc2626;"></div>
          </div>
          <span class="mat-percent">${req.materials.hazardousNeutralized}%</span>
        </div>
      </div>
    </div>

    <div class="tracking-action-bar">
      <button class="btn btn-primary" onclick="openDisposalCertificate('${req.id}')">
        View Official Disposal Certificate
      </button>
    </div>
  `;
}

// ==============================================================================
// 9. E-WASTE AWARENESS & LEARNING CENTRE
// ==============================================================================

class AwarenessManager {
  static init() {
    this.initSubtabs();
    this.renderToxinsMatrix();
    this.initFaqAccordion();
    this.initHotspots();
  }

  static initSubtabs() {
    const subtabs = document.querySelectorAll('.subtab-btn');
    subtabs.forEach(btn => {
      btn.addEventListener('click', () => {
        subtabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-subtab');
        document.querySelectorAll('.subtab-content').forEach(c => {
          if (c.id === targetId) c.classList.add('active');
          else c.classList.remove('active');
        });
      });
    });
  }

  static renderToxinsMatrix() {
    const container = document.getElementById('toxinsContainer');
    if (!container) return;

    container.innerHTML = TOXIC_MATERIALS.map(t => `
      <div class="toxin-card">
        <div class="toxin-header">
          <div class="toxin-symbol">${t.symbol}</div>
          <span class="hazard-level-badge">${t.hazard}</span>
        </div>
        <h3>${t.name}</h3>
        <p><strong>Primary Source:</strong> ${t.foundIn}</p>
        <div class="toxin-meta-row">
          <strong>Health Damage:</strong> ${t.healthImpact}
        </div>
        <div class="toxin-meta-row">
          <strong>Eco Toxicity:</strong> ${t.ecoImpact}
        </div>
      </div>
    `).join('');
  }

  static initFaqAccordion() {
    const container = document.getElementById('faqAccordion');
    if (!container) return;

    const faqs = [
      {
        q: "Why can't I simply toss old lithium batteries or cables in regular household trash?",
        a: "Compactor trucks can easily crush lithium pouch batteries, resulting in violent chemical fires that destroy garbage trucks and facilities. Furthermore, unlined municipal dumps let toxic electrolyte and lead leach into local drinking water tables."
      },
      {
        q: "How does EcoByte ensure complete personal data privacy?",
        a: "All storage drives (SSDs, hard disks, eMMC chips) go through DoD-grade cryptographic wiping or high-temperature physical shredding. Every donor receives an auditable certificate stating physical medium destruction."
      },
      {
        q: "What is Urban Mining and why is it superior to earth mining?",
        a: "Urban mining extracts precious metals (gold, copper, palladium) directly from discarded electronics. Recovering 1 kg of gold from circuit boards consumes 90% less water and emits 80% less carbon than blasting pristine natural landscapes for ore."
      },
      {
        q: "Are old bulky CRT televisions and microwave ovens accepted?",
        a: "Yes. Large appliances and heavy CRT glass tubes require specialized vacuum dismantling because CRT monitors contain up to 2 kg of lead. Our logistics team provides complimentary heavy pickup."
      }
    ];

    container.innerHTML = faqs.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'open' : ''}">
        <button class="faq-question" onclick="toggleFaq(this)">
          ${faq.q}
        </button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
  }

  static initHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(h => {
      h.addEventListener('click', () => {
        const infoType = h.getAttribute('data-info');
        showAnatomyDetail(infoType);
      });
    });
  }
}

function toggleFaq(btn) {
  const item = btn.parentElement;
  item.classList.toggle('open');
}

function showAnatomyDetail(type) {
  const title = document.getElementById('anatomyDetailTitle');
  const text = document.getElementById('anatomyDetailText');
  const fact = document.getElementById('anatomyFunFact');

  if (!title || !text) return;

  switch (type) {
    case 'gold':
      title.textContent = "Gold, Silver and Copper Connectors";
      text.textContent = "Found on contact pins, SIM card trays, and board micro-traces. Gold provides supreme corrosion resistance. Recyclers use specialized hydrometallurgical leaching to safely recover 99.9% pure gold bullion.";
      fact.innerHTML = "<strong>Urban Mining Fact:</strong> 1 million recycled cell phones can recover ~35,274 lbs of copper, 772 lbs of silver, and 75 lbs of gold!";
      break;
    case 'battery':
      title.textContent = "Lithium-Cobalt Battery Cell";
      text.textContent = "High-energy density pouch battery. Contains Lithium, Cobalt, Nickel, and flammable organic electrolytes. If punctured, causes thermal runaway fires reaching 600°C.";
      fact.innerHTML = "<strong>Safety Rule:</strong> Never pierce or incinerate swollen batteries. Always wrap battery terminal contacts in electrical tape.";
      break;
    case 'board':
      title.textContent = "Printed Circuit Board (Lead and Bromine)";
      text.textContent = "The central nervous system of any gadget. Contains solder joints, silicon processors, and bromine flame-retardants. Informal burning of these boards causes carcinogenic smog.";
      fact.innerHTML = "<strong>Clean Recovery:</strong> Advanced smelters separate solder, gold, and tin in closed-loop negative-pressure furnaces with activated charcoal filters.";
      break;
    case 'screen':
      title.textContent = "Display Assembly & Indium Tin Oxide";
      text.textContent = "Modern OLED/LCD screens use Indium Tin Oxide (ITO) for touch responsiveness. Indium is an exceptionally rare element with limited global deposits.";
      fact.innerHTML = "<strong>Resource Scarcity:</strong> Pure indium global supplies are dwindling rapidly; recycling screens is essential for future touchscreens.";
      break;
    default:
      title.textContent = "Inside A Typical Smartphone";
      text.textContent = "Over 60 distinct periodic elements are tightly packed inside each handset. Explore the nodes to see individual recovery channels.";
  }
}

function showAnatomyTab() {
  switchTab('awareness-centre');
  const btn = document.querySelector('[data-subtab="anatomy-tab"]');
  if (btn) btn.click();
}

function showToxinsTab() {
  switchTab('awareness-centre');
  const btn = document.querySelector('[data-subtab="toxins-tab"]');
  if (btn) btn.click();
}

function showDosDontsTab() {
  switchTab('awareness-centre');
  const btn = document.querySelector('[data-subtab="dos-donts-tab"]');
  if (btn) btn.click();
}

// ==============================================================================
// 10. ADMIN DEMO DASHBOARD & OPERATIONS CONSOLE
// ==============================================================================

class AdminManager {
  static render() {
    const all = StorageManager.getAllRequests();

    const totalCount = all.length;
    const pendingCount = all.filter(r => r.status === "Submitted" || r.status === "Logistics Assigned").length;
    const transitCount = all.filter(r => r.status === "In Transit" || r.status === "At Recycling Facility").length;
    const completedCount = all.filter(r => r.status === "Recycled & Certified").length;

    const elTotal = document.getElementById('adminTotalCount');
    const elPending = document.getElementById('adminPendingCount');
    const elTransit = document.getElementById('adminTransitCount');
    const elComp = document.getElementById('adminCompletedCount');

    if (elTotal) elTotal.textContent = totalCount;
    if (elPending) elPending.textContent = pendingCount;
    if (elTransit) elTransit.textContent = transitCount;
    if (elComp) elComp.textContent = completedCount;

    this.filterTable();
  }

  static filterTable() {
    const searchVal = (document.getElementById('adminSearchInput')?.value || '').toLowerCase();
    const statusVal = document.getElementById('adminStatusFilter')?.value || 'ALL';
    const catVal = document.getElementById('adminCategoryFilter')?.value || 'ALL';

    const all = StorageManager.getAllRequests();
    const filtered = all.filter(item => {
      const matchSearch = item.id.toLowerCase().includes(searchVal) ||
                          item.userName.toLowerCase().includes(searchVal) ||
                          item.userCity.toLowerCase().includes(searchVal) ||
                          item.itemName.toLowerCase().includes(searchVal);
      const matchStatus = statusVal === 'ALL' || item.status === statusVal;
      const matchCat = catVal === 'ALL' || item.category === catVal;
      return matchSearch && matchStatus && matchCat;
    });

    const tbody = document.getElementById('adminTableBody');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 2.5rem; color: var(--text-muted);">
            No collection requests match your filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(req => {
      let badgeClass = "submitted";
      if (req.status === "Logistics Assigned") badgeClass = "assigned";
      else if (req.status === "In Transit") badgeClass = "transit";
      else if (req.status === "At Recycling Facility") badgeClass = "facility";
      else if (req.status === "Recycled & Certified") badgeClass = "completed";

      return `
        <tr>
          <td>
            <strong><a href="javascript:void(0)" onclick="trackFromAdmin('${req.id}')" title="Click to track">${req.id}</a></strong>
          </td>
          <td>
            <strong>${req.userName}</strong><br>
            <small style="color:var(--text-muted);">${req.userPhone} | ${req.userCity}</small>
          </td>
          <td>
            ${req.itemName}<br>
            <small style="color:var(--text-muted);">${req.category}</small>
          </td>
          <td>${req.weight} kg (${req.quantity}x)</td>
          <td>
            ${req.pickupDate}<br>
            <small style="color:var(--text-muted);">${req.pickupTimeSlot.split(' ')[0]}</small>
          </td>
          <td>
            <span class="status-badge ${badgeClass}" style="font-size:0.75rem; padding: 0.2rem 0.5rem;">
              ${req.status}
            </span>
          </td>
          <td>
            <select class="table-status-select" onchange="updateRowStatus('${req.id}', this.value)">
              <option value="Submitted" ${req.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
              <option value="Logistics Assigned" ${req.status === 'Logistics Assigned' ? 'selected' : ''}>Logistics Assigned</option>
              <option value="In Transit" ${req.status === 'In Transit' ? 'selected' : ''}>In Transit</option>
              <option value="At Recycling Facility" ${req.status === 'At Recycling Facility' ? 'selected' : ''}>At Facility</option>
              <option value="Recycled & Certified" ${req.status === 'Recycled & Certified' ? 'selected' : ''}>Recycled & Certified</option>
            </select>
          </td>
          <td>
            <button class="btn-delete-row" onclick="deleteAdminRow('${req.id}')" title="Delete request">Delete</button>
          </td>
        </tr>
      `;
    }).join('');
  }
}

function filterAdminTable() {
  AdminManager.filterTable();
}

function updateRowStatus(id, newStatus) {
  StorageManager.updateRequestStatus(id, newStatus);
  AdminManager.render();
  DashboardManager.updateStatsCounters();
  showToast(`Request ${id} status updated to "${newStatus}".`);
}

function deleteAdminRow(id) {
  if (confirm(`Are you sure you want to remove request ${id}?`)) {
    StorageManager.deleteRequest(id);
    AdminManager.render();
    DashboardManager.updateStatsCounters();
    showToast(`Request ${id} deleted.`);
  }
}

function trackFromAdmin(id) {
  setAndTrackId(id);
  switchTab('request-tracker');
}

function seedDefaultDemoData() {
  if (confirm("Reset portal to default sample demonstration dataset?")) {
    StorageManager.resetToDefault();
    AdminManager.render();
    DashboardManager.updateStatsCounters();
    showToast("Portal reset to original default demonstration data.");
  }
}

function openAddQuickModal() {
  const modal = document.getElementById('quickAddModal');
  if (modal) modal.classList.remove('hidden');
}

function submitQuickMockRequest() {
  const name = document.getElementById('quickCustomerName').value.trim() || 'Demo Citizen';
  const city = document.getElementById('quickCity').value.trim() || 'Pune';
  const cat = document.getElementById('quickCategory').value;
  const item = document.getElementById('quickItemName').value.trim() || 'Old Electronics';
  const weight = parseFloat(document.getElementById('quickWeight').value) || 3.5;
  const status = document.getElementById('quickStatus').value;

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const id = `EW-2026-${randomSuffix}`;

  const now = new Date();
  const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
                  ' - ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const mockReq = {
    id,
    userName: name,
    userPhone: "+91 98980 12345",
    userEmail: "demo@ecobyte.in",
    userAddress: "Lane 5, Koregaon Park",
    userCity: city,
    userPincode: "411001",
    category: cat,
    itemName: item,
    condition: "Dead / Scrap / Not Working",
    quantity: 1,
    weight,
    age: 4,
    pickupDate: now.toISOString().split('T')[0],
    pickupTimeSlot: "Morning (09:00 AM - 12:00 PM)",
    status,
    driverName: "Express Logistics Driver",
    hubName: `${city} EcoByte Recycling Center`,
    co2Saved: Number((weight * 3.6).toFixed(1)),
    toxicDiverted: Math.round(weight * 140),
    materials: {
      copper: 30,
      plastics: 35,
      preciousMetals: 15,
      aluminum: 15,
      hazardousNeutralized: 5
    },
    history: [
      { step: "Submitted", time: timeStr, note: "Mock request added via Admin console" }
    ]
  };

  StorageManager.addRequest(mockReq);
  closeModal('quickAddModal');
  AdminManager.render();
  DashboardManager.updateStatsCounters();
  showToast(`Mock Request ${id} added successfully.`);
}

// ==============================================================================
// 11. MODALS & OFFICIAL CERTIFICATE DISPLAY
// ==============================================================================

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
}

function openDisposalCertificate(id) {
  const req = StorageManager.getRequestById(id) || StorageManager.getAllRequests()[0];
  const modal = document.getElementById('disposalCertificateModal');

  const certTracking = document.getElementById('certTrackingId');
  const certName = document.getElementById('certUserName');
  const certItem = document.getElementById('certItemName');
  const certWeight = document.getElementById('certWeight');
  const certDate = document.getElementById('certDate');
  const certCarbon = document.getElementById('certCarbon');

  if (certTracking) certTracking.textContent = req.id;
  if (certName) certName.textContent = req.userName;
  if (certItem) certItem.textContent = `${req.itemName} (${req.category})`;
  if (certWeight) certWeight.textContent = `${req.weight} kg (100% Zero-Landfill Diverted)`;
  if (certDate) certDate.textContent = req.pickupDate || "October 16, 2026";
  if (certCarbon) certCarbon.textContent = `~${req.co2Saved || (req.weight * 3.6).toFixed(1)} kg CO2e Saved`;

  if (modal) modal.classList.remove('hidden');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.add('hidden');
  }
});

// ==============================================================================
// 12. TOAST NOTIFICATIONS & UTILITY HELPERS
// ==============================================================================

// ------------------------------------------------------------------------------
// CSV EXPORT (downloads requests as a spreadsheet-friendly .csv file)
// ------------------------------------------------------------------------------
function csvCell(value) {
  let text = (value === null || value === undefined) ? '' : String(value);
  // Stop spreadsheet apps from treating text as a formula
  if (/^[=@\t\r]/.test(text) || (/^[+-]/.test(text) && !/^[+-]?[\d\s()-]+$/.test(text))) {
    text = "'" + text;
  }
  return `"${text.replace(/"/g, '""')}"`;
}

function exportRequestsCSV(scope = 'all') {
  let requests = StorageManager.getAllRequests();

  if (scope === 'mine') {
    if (!AuthManager.currentUser) {
      showToast("Please sign in to export your requests.", true);
      return;
    }
    const myEmail = AuthManager.currentUser.email.toLowerCase();
    requests = requests.filter(r => (r.userEmail || '').toLowerCase() === myEmail);
  }

  if (requests.length === 0) {
    showToast("There are no requests to export yet.", true);
    return;
  }

  const columns = [
    ['Request ID', 'id'],
    ['Customer Name', 'userName'],
    ['Email', 'userEmail'],
    ['Phone', 'userPhone'],
    ['Address', 'userAddress'],
    ['City', 'userCity'],
    ['PIN Code', 'userPincode'],
    ['Category', 'category'],
    ['Item', 'itemName'],
    ['Condition', 'condition'],
    ['Quantity', 'quantity'],
    ['Weight (kg)', 'weight'],
    ['Age (years)', 'age'],
    ['Pickup Date', 'pickupDate'],
    ['Pickup Slot', 'pickupTimeSlot'],
    ['Status', 'status'],
    ['Driver', 'driverName'],
    ['Recycling Hub', 'hubName'],
    ['CO2 Saved (kg)', 'co2Saved'],
    ['Toxic Diverted (g)', 'toxicDiverted']
  ];

  const header = columns.map(c => csvCell(c[0])).join(',');
  const rows = requests.map(r => columns.map(c => csvCell(r[c[1]])).join(','));
  // \uFEFF (BOM) makes Excel open the file with correct characters
  const csv = '\uFEFF' + [header, ...rows].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const stamp = new Date().toISOString().split('T')[0];
  link.href = url;
  link.download = `ecobyte-requests-${scope === 'mine' ? 'my' : 'all'}-${stamp}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Exported ${requests.length} request${requests.length > 1 ? 's' : ''} to CSV.`);
}

function showToast(message, isError = false) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'toast-error' : ''}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==============================================================================
// 13. BOOTSTRAP APPLICATION ON DOM LOAD
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme (Dark/Light mode with Sun/Moon emoji)
  ThemeManager.init();

  // 2. Initialize Authentication Manager (Sign In / Sign Up)
  AuthManager.init();

  // 3. Initialize Navigation tabs
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId) switchTab(tabId);
    });
  });

  const adminBadge = document.getElementById('quickAdminBadge');
  if (adminBadge) {
    adminBadge.addEventListener('click', () => {
      const currentActive = document.querySelector('.tab-pane.active')?.id;
      if (currentActive === 'admin-portal') {
        switchTab('home-page');
      } else {
        switchTab('admin-portal');
      }
    });
  }

  // 4. Initialize Dashboard & Calculator
  DashboardManager.init();

  // 5. Initialize Collection Form
  FormManager.init();

  // 6. Initialize Awareness Centre
  AwarenessManager.init();

  // 7. Initial tracker search setup
  const trackerInput = document.getElementById('trackerInput');
  if (trackerInput) {
    trackerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performTrackingSearch();
    });
  }

  // 8. Render initial tracking preview with sample ID
  setAndTrackId('EW-2026-1042');

  console.log("EcoByte Portal system successfully initialized.");
});
