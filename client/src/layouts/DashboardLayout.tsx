import * as React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';
import './styles/dashboard.css';

const SearchBar = () => {
  const [visible, setVisible] = React.useState(false);
  const [search, setSearch] = React.useState('');

  return (
    <div
      className={`header__search ${visible ? 'header__search--active' : ''}`}
    >
      <button
        className="header__search-toggle"
        type="button"
        onClick={() => setVisible(!visible)}
      >
        <i className="fas fa-search" />
      </button>

      <input
        type="text"
        className="header__search-bar"
        value={search}
        onChange={(evt: any) => setSearch(evt.target.value)}
        onKeyUp={(evt: any) => {
          if (evt.key === 'Enter') {
            console.log('testing');
            //
          }
        }}
      />
    </div>
  );
};

const Header = ({
  signout,
  username,
}: {
  signout: Function;
  username: string;
}) => {
  const [activeMenu, setActiveMenu] = React.useState('');
  const location = useLocation();

  React.useEffect(() => {
    setActiveMenu('');
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

  return (
    <>
      <aside
        className={`aside ${activeMenu === 'aside' ? 'aside--active' : ''}`}
      >
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
              <li className="aside__item" key={`store-header-${store.id}`}>
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

        <SearchBar />

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
          </div>{' '}
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
                    <div className="header__notification-date">5 Hours ago</div>
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
              onClick={() => setActiveMenu(activeMenu === 'user' ? '' : 'user')}
            >
              {username}
            </button>
          </div>

          <div className="header__dropdown">
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
