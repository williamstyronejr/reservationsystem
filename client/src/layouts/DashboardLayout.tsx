import * as React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import './styles/dashboard.css';

const DashboardLayout = ({ children }: { children: any }) => {
  const { state, signout } = useAuthContext();
  const [activeMenu, setActiveMenu] = React.useState('');
  const location = useLocation();

  // Close menu on route change
  React.useEffect(() => {
    setActiveMenu('');
  }, [location.pathname]);

  const testNotifications = [
    {
      id: '123',
      type: 'message',
      msg: 'Wow Thanks',
      author: 'Username',
      image: '/',
    },
    {
      id: '12344',
      type: 'like',
      author: 'Person 1',
      image: '/',
    },
  ];

  if (!state.authenticated) return <Navigate replace to="/signin" />;

  return (
    <div className="dashboard-wrapper">
      <aside
        className={`aside ${activeMenu === 'aside' ? 'aside--active' : ''}`}
      >
        <header className="aside__header">Heading</header>

        <nav className="aside__nav">
          <ul className="aside__list">
            <li className="aside__item">
              <Link className="aside__link" to="/dashboard">
                <span className="aside__link-logo">
                  <i className="fas fa-home" />
                </span>
                <span className="aside__link-text">Dashboard</span>
              </Link>
            </li>

            <li className="aside__item">
              <Link className="aside__link" to="/dashboard/stores">
                <span className="aside__link-logo">
                  <i className="fas fa-store" />
                </span>

                <span className="aside__link-text">Stores</span>
              </Link>
            </li>

            <li className="aside__item">
              <Link className="aside__link" to="/dashboard/analytics">
                <span className="aside__link-logo">
                  <i className="fas fa-database" />
                </span>

                <span className="aside__link-text">Analytics</span>
              </Link>
            </li>

            <li className="aside__item">
              <Link className="aside__link" to="/dashboard/calendar">
                <span className="aside__link-logo">
                  <i className="fas fa-calendar-alt" />
                </span>

                <span className="aside__link-text">Calendar</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="dashboard-content">
        <header
          className={`header header--dashboard ${
            activeMenu === 'aside' ? 'header--active' : ''
          }`}
        >
          <button
            className="header__toggle"
            type="button"
            onClick={() => setActiveMenu(activeMenu === 'aside' ? '' : 'aside')}
          >
            <span className="header__bar header__bar--1" />
            <span className="header__bar header__bar--2" />
            <span className="header__bar header__bar--3" />
          </button>

          <div
            className={`header__notification ${
              activeMenu === 'notif' ? 'header__notification--active' : ''
            }`}
          >
            <div className="header__menu-toggle">
              <button
                className="header__notification-toggle"
                type="button"
                aria-label="Notifications"
                onClick={() =>
                  setActiveMenu(activeMenu === 'notif' ? '' : 'notif')
                }
              >
                <i className="far fa-bell" />
              </button>
            </div>

            <div className="header__dropdown">
              <ul className="header__notification-list">
                {testNotifications.map((notification: any) => (
                  <li
                    className="header__notification-item"
                    key={`header-notification-${notification.id}`}
                  >
                    <img
                      className="header__notification-img"
                      alt="Profile"
                      src={notification.image}
                    />
                    <div className="header__notification-details">
                      <h4 className="header__notification-heading">
                        Headingjjjjjjjjjjjjjjfffffjjjjjjjjjjjjjjfffff
                      </h4>
                      <p className="header__notification-message">
                        Mshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhvhvhvvg
                      </p>
                      <div className="header__notification-date">
                        5 Hours ago
                      </div>
                    </div>
                  </li>
                ))}

                <li className="header__notification-item header__notification-item--end">
                  <Link
                    className="header__notification-all"
                    to="/dashboard/notifications"
                  >
                    View All
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`header__user ${
              activeMenu === 'user' ? 'header__user--active' : ''
            }`}
          >
            <div className="header__menu-toggle">
              <button
                className="header__user-toggle"
                type="button"
                onClick={() =>
                  setActiveMenu(activeMenu === 'user' ? '' : 'user')
                }
              >
                <img
                  className="header__user-img"
                  alt="User Profile"
                  src={state.username}
                />
                <div className="header__user-name">{state.username}</div>
              </button>
            </div>

            <div className="header__dropdown">
              <Link className="header__user-link" to="/settings">
                Settings
              </Link>

              <button
                className="header__user-link"
                type="button"
                onClick={() => signout()}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
