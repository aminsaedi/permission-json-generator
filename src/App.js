import * as React from "react";

import { Provider } from "./Context";
import Tree from "./Tree";
import Form from "./Form";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1e1e1e",
      paper: "#1e1e1e",
    },
  },
});

export default function MyApp() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Provider>
        <Tree />
        <Form />
      </Provider>
    </ThemeProvider>
  );
}
