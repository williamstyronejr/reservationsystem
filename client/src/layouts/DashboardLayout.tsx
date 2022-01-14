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
  const [userMenuVisible, setUserMenuVisible] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

  const testList = [
    {
      id: '123',
      name: 'store name 1',
    },
    {
      id: '1234',
      name: 'store name 2',
    },
  ];

  return (
    <>
      <aside className={`aside ${asideVisible ? 'aside--active' : ''}`}>
        aside
        <nav className="aside__nav">
          <ul className="aside__list">
            <li className="aside__item">
              <Link className="aside__link" to="/dashboard/analytics">
                Analytics
              </Link>
            </li>
          </ul>

          <ul className="aside__list aside__list--scrollable">
            <li className="aside__item aside__item--heading">Stores</li>
            <li className="aside__item aside__item--special">
              <Link className="aside__link" to="/dashboard/stores/create">
                Add Store
              </Link>
            </li>

            {testList.map((store: any) => (
              <li className="aside__item">
                <Link
                  to={`/dashboard/stores/${store.id}`}
                  className="aside__link"
                >
                  {store.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <header
        className={`header header--dashboard ${
          visible ? 'header--active' : ''
        }`}
      >
        <button
          className="header__toggle"
          type="button"
          onClick={() => setAsideVisible(!asideVisible)}
        >
          <span className="header__bar header__bar--1" />
          <span className="header__bar header__bar--2" />
          <span className="header__bar header__bar--3" />
        </button>

        <div
          className={`header__user ${
            userMenuVisible ? 'header__user--active' : ''
          }`}
        >
          <div className="header__menu-toggle">
            <button
              className=""
              type="button"
              onClick={() => setUserMenuVisible(!userMenuVisible)}
            >
              {username}
            </button>
          </div>

          <div className="header__dropdown">
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
