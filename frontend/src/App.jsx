import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./lib/auth.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AppHomePage from "./pages/AppHomePage.jsx";
import BestWishesPage from "./pages/BestWishesPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/app" element={<AppHomePage />} />
        <Route path="/best-wishes" element={<BestWishesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

