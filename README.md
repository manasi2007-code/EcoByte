# EcoByte: E-Waste Awareness, Collection & Tracking Portal

A single-page web portal that helps citizens learn about electronic waste, schedule doorstep e-waste pickups, track each request through the recycling process, and download a disposal certificate. Facility administrators get a separate console to manage requests.

Built with plain **HTML5, CSS3 and Vanilla JavaScript**. There is no framework, no build step and no backend. Data is saved in the browser's `localStorage`.

---

## Features

### Home page
- Impact summary (kg recycled, toxic material diverted, CO₂ prevented)
- Sign In / Sign Up box on the landing page
- 4-step lifecycle: Sign In & Book, Doorstep Pickup, Safe Extraction, Disposal Certificate
- Device categories (computers, phones, screens, batteries, appliances, wiring) and a live activity ticker

### Authentication
- Citizens can **sign up** and **sign in** with email and password
- Accounts are saved in `localStorage`; passwords are stored as SHA-256 hashes, not plain text
- Duplicate-email, wrong-password and wrong-account-type checks
- A separate **Facility Administrator** account type for the admin console
- Dashboard, request form and admin console are protected and show a sign-in screen when logged out

### User dashboard
- Personal summary: devices submitted, CO₂ offset, account status
- History table showing only the signed-in user's own requests
- Impact estimator for common gadgets
- **Export My Requests (CSV)** button

### Collection request form
- Device details: category, model, condition, quantity, weight, age
- Pickup details: address, city, PIN code, date and time slot
- Image upload preview and a data-sanitization confirmation
- Live impact calculator (estimated CO₂ savings)
- Generates a unique tracking ID such as `EW-2026-XXXX`

### Request tracker
- Search by tracking ID or use the preset ID shortcuts
- 5-stage progress stepper: Logged, Dispatched, In Transit, Processing at Hub, Recovered & Certified
- Material recovery bars (copper, plastics, precious metals, aluminium, neutralised hazardous waste)
- **Official Disposal Certificate** with Print / Save as PDF

### Awareness centre
- Interactive smartphone teardown
- Toxic heavy-metal guide (Pb, Hg, Cd, BFR, Li, As)
- Do's and Don'ts, circular vs. linear economy comparison, FAQ accordion

### Admin console (administrator login required)
- KPI cards: total, pending, in transit, recycled
- Search and filter by status and category
- Change a request's status from the table, and it updates the tracker and dashboards
- Add a sample request, reset sample data, and **Export All to CSV**

### Other
- Light and dark theme toggle, remembered between visits
- Responsive layout

---

## Getting started

No installation is needed.

1. Download or clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

Optionally, run it from a local server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

### Using the portal
- **Citizen:** click *Sign Up* on the home page, create an account, then submit a collection request and track it.
- **Administrator:** choose **Account Type: Facility Administrator** on the sign-in form and use the admin account. The admin credentials are defined in the `ADMIN_ACCOUNT` block of `AuthManager` in `app.js`. **Change them before deploying.**

---

## Project structure

```
.
├── index.html   # Page structure, all tabs and modals
├── style.css    # Styles, light/dark themes, responsive rules, print styles
├── app.js       # Auth, storage, form logic, tracker, admin console, CSV export
└── README.md
```

## Data storage

Everything is stored in the browser's `localStorage` under these keys:

| Key | Contents |
|---|---|
| `ecobyte_users_v1` | Registered citizen accounts (password hashes) |
| `ecobyte_user_session_v1` | Currently signed-in user |
| `ecobyte_requests_v1` | All collection requests |
| `ecobyte_theme_v1` | Light or dark theme |

Clearing site data in the browser resets the portal.

## CSV export

- The admin console's **Export All to CSV** downloads every request.
- The user dashboard's **Export My Requests (CSV)** downloads only that user's requests.
- Columns include request ID, customer details, address, device, weight, pickup date and slot, status, driver, hub, CO₂ saved and toxic material diverted.
- The file opens directly in Excel or Google Sheets.

---

## Limitations

- **Front-end only:** data lives in one browser and is not shared between devices or users.
- **Admin credentials are visible** in `app.js`, so this login is suitable for a demo, not for production.
- Sample requests are pre-loaded so the tracker and admin console have something to show.

## Future improvements

- Move users and requests to a real database (Firebase, Supabase, or Node + SQLite)
- Server-side authentication and role checks
- Email or SMS notifications for status updates
- Collection-centre locator map

---

## Author

**Manasi Wagh**

## License

This project was built for academic purposes. Add a license of your choice (for example MIT) before publishing.
