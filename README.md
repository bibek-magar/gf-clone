# ✈️ Google Flights Clone

A simple and responsive clone of Google Flights built with React. This project allows users to search for flights by selecting origin, destination, and travel dates. It integrates with a flight search API and offers a user-friendly interface.

## 🔧 Tech Stack

- **React** – Frontend library
- **MUI (Material UI)** – Component library for UI elements
- **MUI Date Picker** – For selecting travel dates
- **Styled-Components** – CSS-in-JS for component styling
- **Axios** – For API requests
- **React Query** – For data fetching and caching
- **Day.js** – Lightweight date utility for manipulating and formatting dates

## 🚀 Features

- Flight search by origin, destination, and date
- Responsive design
- Modern UI using Material UI
- Clean and maintainable code with styled-components
- Loading and error handling with React Query
- Date manipulation and formatting using Day.js

## 📦 Installation

```bash
yarn install
```

## Start the development server

```bash
yarn dev
```

## 🌐 API Configuration

This project uses a flight search API (e.g., from RapidAPI). Create a `.env` file in the root directory and add your API key. Refer to `.env.example` file.

## 📁 Project Structure

```txt
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components
├── features/        # Domain-specific modules
├── hooks/           # Custom hooks
├── pages/           # Route-level components
├── providers/       # App-level context providers
├── routes/          # App routing
├── services/        # API calls
├── styles/          # Global styles and theme setup
├── utils/           # Helper utility functions
└── main.tsx         # Entry point
```
