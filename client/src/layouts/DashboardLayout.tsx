import * as React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import './styles/dashboard.css';

const Header = () => {
  const [visible, setVisible] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  return (
    <header className={`header ${visible ? 'header--active' : ''}`}>
      <h1 className="header__logo">Reserve</h1>

      <button
        className="header__toggle"
        type="button"
        onClick={() => setVisible(!visible)}
      >
        <span className="header__bar header__bar--1" />
        <span className="header__bar header__bar--2" />
        <span className="header__bar header__bar--3" />
      </button>

      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <Link to="/" className="header__link">
              Home
            </Link>
          </li>

          <li className="header__item">
            <Link to="/features" className="header__link">
              Features
            </Link>
          </li>

          <li className="header__item">
            <Link to="/signin" className="header__link">
              Signin
            </Link>
          </li>

          <li className="header__item">
            <Link to="/signup" className="header__link">
              Signup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const DashboardLayout = ({ children }: { children: any }) => {
  const { state } = useAuthContext();

  if (!state.authenticated) return <Navigate replace to="/signin" />;

  return (
    <div className="dashboard-wrapper">
      <Header />

      {children}
    </div>
  );
};

export default DashboardLayout;
