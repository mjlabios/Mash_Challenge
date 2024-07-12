import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5E07",
    },
    secondary: {
      main: "#FFF",
    },
    background: {
      default: "#FFF",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: "#FFFFFF",
          textTransform: "capitalize",
        }),
      },
    },
  },
});

export default theme;
