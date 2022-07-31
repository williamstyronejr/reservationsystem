import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/auth";
import HomePage from "./pages";
import DashboardPage from "./pages/dashboard";
import SettingsPage from "./pages/settings";
import StorePage from "./pages/dashboard/store";
import SearchPage from "./pages/Search";
import "./styles/header.css";

const MissingPage = () => <Navigate to="/dashboard" />;

const AuthenticatedApp = () => {
  const { signout, state } = useAuthContext();
  return (
    <>
      <header className="page--header">
        <nav className="page__nav">
          <ul className="page__list">
            <li className="page__item">
              <a className="page__link" href="/">
                Home
              </a>
            </li>
          </ul>
        </nav>

        <div className="page__user-menu">
          <div className="page__username">{state.username}</div>

          <ul className="page__user-list">
            <li className="page__user-item">
              <button className="btn page__link" onClick={() => signout()}>
                Signout
              </button>
            </li>
          </ul>
        </div>
      </header>

      <main className="page--main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/store/:id" element={<StorePage />} />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </main>
    </>
  );
};

export default AuthenticatedApp;
