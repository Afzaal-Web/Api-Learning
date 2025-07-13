# 🌍 Countries Explorer Web App

A fully functional responsive web app built using **HTML**, **CSS**, and **JavaScript** that allows users to explore countries with powerful features like filtering, sorting, searching (with debounce), and modal pop-ups with detailed information.

---

## 🚀 Features

### ✅ Country Listing
- Loads data from **REST Countries API**.
- Initially displays 8 countries.
- Load more countries using the **"Load More"** button.

### 🔍 Live Search (with Debounce)
- Search countries by name in real-time.
- Debounced input prevents excessive API/filter calls.

### 🌐 Region Filter
- Filter countries by region (e.g., Asia, Europe, Africa).
- Dynamically updates the list based on region.

### 📊 Population Sorting
- Sort countries by **population** from High to Low or Low to High.

### 🌙 Theme Toggle
- Light / Dark theme toggle.
- Saves theme preference in `localStorage`.

### 📌 Scroll to Top Button
- Appears after scrolling down a set distance (3500px).
- Smooth scroll back to the top of the page.

### 💡 Modal Popup
- Click any country card to view detailed information.
- Modal includes:
  - Name
  - Area
  - Subregion
  - Languages
  - Currency
  - Timezones

---

## 📦 Tech Stack

| Language   | Purpose                      |
|------------|-------------------------------|
| HTML       | Page structure                |
| CSS        | Styling & Layout              |
| JavaScript | Functionality & Interactivity |
| REST API   | Data Source ([RESTCountries](https://restcountries.com/v3.1/all)) |

---

## 📁 File Structure
/project-folder
│
├── index.html
├── style.css
├── script.js
└── README.md


---

## 🧠 Concepts Covered

- DOM Manipulation
- Event Handling
- `fetch()` API
- Debouncing
- Sorting and Filtering Arrays
- Dynamic UI rendering
- Responsive design
- Theme persistence using `localStorage`

---

## ✨ Future Improvements (Optional)

- Add pagination instead of "Load More".
- Add search suggestions or fuzzy search.
- Improve accessibility (ARIA labels, keyboard nav).
- Add flag alt-text fallback.

---

## 🛠️ Contribution

Contributions are welcome! Here’s how you can help:

1. Fork this repository.
2. Clone your fork:
   ```bash
   git clone https://github.com/Afzaal-Web/countries-explorer.git

