import * as React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import './styles/landing.css';

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
            <Link to="/" className="header__link">
              Features
            </Link>
          </li>

          <li className="header__item">
            <Link to="/" className="header__link">
              Pricing
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

const LandingLayout = ({ children }: { children: any }) => {
  const { state } = useAuthContext();
  const navgiate = useNavigate();
  if (state.authenticated) navgiate('/dashboard');

  return (
    <>
      <Header />
      {children}
      <footer className="footer">
        <div className="footer__wrapper">
          <div className="footer__info">
            <h3 className="footer__logo">
              <Link className="footer__logo-link" to="/">
                Reserve
              </Link>
            </h3>
            <p className="footer__description">
              Reserve makes it easy for stores of all sizes to have a fully
              features reservation system.
            </p>
          </div>
          <div className="footer__links">
            <ul className="footer__list">
              <li className="footer__item footer__item--title">Company</li>
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="footer__list">
              <li className="footer__item footer__item--title">Support</li>
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="footer__list">
              <li className="footer__item footer__item--title">Discover</li>
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>{' '}
              <li className="footer__item">
                <Link className="footer__link" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="footer__copyright">© 2021 Reserve.</p>
      </footer>
    </>
  );
};
export default LandingLayout;
