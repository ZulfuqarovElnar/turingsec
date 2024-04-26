import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { CurrentUserProvider } from "./context/CurrentUser.tsx";
import QueryContext from "./context/QueryContext.tsx";
import { CurrentCompanyProvider } from "./context/CurrentCompany.tsx";

// import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryContext>
      <CurrentCompanyProvider>
        <CurrentUserProvider>
          {/* <ThemeProvider> */}

          <App />
        </CurrentUserProvider>
      </CurrentCompanyProvider>
    </QueryContext>
    {/* </ThemeProvider> */}
  </React.StrictMode>
);
