import { createTheme } from "@mui/material/styles";
import { currentTheme } from "../utils/theme";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: currentTheme.primary,
    },
    background: {
      default: currentTheme.background,
      paper: currentTheme.surface,
    },
    text: {
      primary: currentTheme.text,
      secondary: currentTheme.textSecondary,
    },
    divider: currentTheme.border,
    error: {
      main: currentTheme.required,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: currentTheme.searchBg,
            "& fieldset": {
              borderColor: currentTheme.border,
            },
            "&:hover fieldset": {
              borderColor: currentTheme.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: currentTheme.primary,
            },
          },
          "& .MuiInputBase-input": {
            color: currentTheme.text,
          },
          "& .MuiFormLabel-root": {
            color: currentTheme.textSecondary,
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: currentTheme.surface,
          border: `1px solid ${currentTheme.border}`,
        },
        option: {
          color: currentTheme.text,
          "&:hover": {
            backgroundColor: currentTheme.searchBg,
          },
          '&[aria-selected="true"]': {
            backgroundColor: `${currentTheme.primary}20`,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: currentTheme.text,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: currentTheme.textSecondary,
          "&.Mui-checked": {
            color: currentTheme.primary,
          },
        },
      },
    },
  },
});
