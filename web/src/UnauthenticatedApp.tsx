import * as React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages";
import SearchPage from "./pages/Search";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const MissingPage = () => <Navigate to="/" />;

const UnauthenticatedApp = () => (
  <>
    <header className="page--header">
      <nav className="page__nav">
        <ul className="page__list">
          <li className="page__item">
            <Link className="page__item-link" to="/">
              Home
            </Link>
          </li>

          <li className="page__item">
            <Link className="page__item-link" to="/signin">
              Signin
            </Link>
          </li>

          <li className="page__item">
            <Link className="page__item-link" to="/signup">
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    </header>

    <main className="page--main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </main>
  </>
);

export default UnauthenticatedApp;
