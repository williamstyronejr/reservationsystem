import * as React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import './styles/dashboard.css';

const Header = ({
  signout,
  username,
}: {
  signout: Function;
  username: string;
}) => {
  const [visible, setVisible] = React.useState(false);
  const [asideVisible, setAsideVisible] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  return (
    <>
      <aside className={`aside ${asideVisible ? 'aside--active' : ''}`}>
        aside
      </aside>

      <header className={`header ${visible ? 'header--active' : ''}`}>
        <button
          className=""
          type="button"
          onClick={() => setAsideVisible(!asideVisible)}
        >
          three
        </button>

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
          </ul>
        </nav>

        <div className="">
          <div>{username}</div>

          <div className="">
            <button className="" type="button" onClick={() => signout()}>
              Signout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

const DashboardLayout = ({ children }: { children: any }) => {
  const { state, signout } = useAuthContext();

  if (!state.authenticated) return <Navigate replace to="/signin" />;

  return (
    <div className="dashboard-wrapper">
      <Header signout={signout} username={state.username} />

      {children}
    </div>
  );
};

export default DashboardLayout;
