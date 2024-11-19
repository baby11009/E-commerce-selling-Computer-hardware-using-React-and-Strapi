import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScrollToTop from "./Hooks/ScrollToTop.jsx";
import AuthProvider from "./apiService/Login/AuthProvider/AuthProvider.jsx";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
        <Router>
          <ScrollToTop />
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Router>
    </AuthProvider>
  </React.StrictMode>
);
