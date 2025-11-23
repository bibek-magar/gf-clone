export const theme = {
  // Light theme colors
  light: {
    background: "#f9fbff",
    surface: "#ffffff",
    border: "#e2e8f0",
    primary: "#215ce5",
    text: "#111827",
    textSecondary: "#4b5563",
    required: "#d30d0d",
    headerBg: "#ffffff",
    headerBorder: "#e8eaed",
    searchBg: "#f8f9fa",
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  // Dark theme colors
  dark: {
    background: "#0d1117",
    surface: "#161b22",
    border: "#30363d",
    primary: "#58a6ff",
    text: "#e6edf3",
    textSecondary: "#7d8590",
    required: "#f85149",
    headerBg: "#161b22",
    headerBorder: "#21262d",
    searchBg: "#21262d",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
};

// Default to dark theme
export const currentTheme = theme.dark;
