import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import './styles/storePage.css';

const data: Record<string, Array<any>> = {
  monday: [
    {
      name: '1am',
      amount: 1500,
    },
    {
      name: '2am',
      amount: 1200,
    },

    {
      name: '3am',
      amount: 900,
    },

    {
      name: '4am',
      amount: 3000,
    },

    {
      name: '5am',
      amount: 3000,
    },

    {
      name: '6am',
      amount: 3000,
    },

    {
      name: '7am',
      amount: 3000,
    },

    {
      name: '8am',
      amount: 3000,
    },

    {
      name: '9am',
      amount: 3000,
    },

    {
      name: '10am',
      amount: 3000,
    },

    {
      name: '11am',
      amount: 3000,
    },

    {
      name: '12pm',
      amount: 3000,
    },

    {
      name: '1pm',
      amount: 3000,
    },

    {
      name: '2pm',
      amount: 3000,
    },

    {
      name: '3pm',
      amount: 3000,
    },

    {
      name: '4pm',
      amount: 3000,
    },

    {
      name: '5pm',
      amount: 3000,
    },

    {
      name: '6pm',
      amount: 3000,
    },

    {
      name: '7pm',
      amount: 3000,
    },

    {
      name: '8pm',
      amount: 3000,
    },

    {
      name: '9pm',
      amount: 3000,
    },

    {
      name: '10pm',
      amount: 3000,
    },

    {
      name: '11pm',
      amount: 3000,
    },
  ],
  tuesday: [
    {
      name: '1am',
      amount: 1000,
    },
    {
      name: '2am',
      amount: 3000,
    },

    {
      name: '3am',
      amount: 3000,
    },

    {
      name: '4am',
      amount: 3000,
    },

    {
      name: '5am',
      amount: 3000,
    },

    {
      name: '6am',
      amount: 3000,
    },

    {
      name: '7am',
      amount: 3000,
    },

    {
      name: '8am',
      amount: 3000,
    },

    {
      name: '9am',
      amount: 3000,
    },

    {
      name: '10am',
      amount: 3000,
    },

    {
      name: '11am',
      amount: 3000,
    },

    {
      name: '12pm',
      amount: 3000,
    },

    {
      name: '1pm',
      amount: 3000,
    },

    {
      name: '2pm',
      amount: 3000,
    },

    {
      name: '3pm',
      amount: 3000,
    },

    {
      name: '4pm',
      amount: 3000,
    },

    {
      name: '5pm',
      amount: 3000,
    },

    {
      name: '6pm',
      amount: 3000,
    },

    {
      name: '7pm',
      amount: 3000,
    },

    {
      name: '8pm',
      amount: 3000,
    },

    {
      name: '9pm',
      amount: 3000,
    },

    {
      name: '10pm',
      amount: 3000,
    },

    {
      name: '11pm',
      amount: 3000,
    },
  ],
  wednesday: [
    {
      name: '1am',
      amount: 2000,
    },
    {
      name: '2am',
      amount: 750,
    },

    {
      name: '3am',
      amount: 1900,
    },

    {
      name: '4am',
      amount: 3000,
    },

    {
      name: '5am',
      amount: 3000,
    },

    {
      name: '6am',
      amount: 3000,
    },

    {
      name: '7am',
      amount: 3000,
    },

    {
      name: '8am',
      amount: 3000,
    },

    {
      name: '9am',
      amount: 3000,
    },

    {
      name: '10am',
      amount: 3000,
    },

    {
      name: '11am',
      amount: 3000,
    },

    {
      name: '12pm',
      amount: 3000,
    },

    {
      name: '1pm',
      amount: 3000,
    },

    {
      name: '2pm',
      amount: 3000,
    },

    {
      name: '3pm',
      amount: 3000,
    },

    {
      name: '4pm',
      amount: 3000,
    },

    {
      name: '5pm',
      amount: 3000,
    },

    {
      name: '6pm',
      amount: 3000,
    },

    {
      name: '7pm',
      amount: 3000,
    },

    {
      name: '8pm',
      amount: 3000,
    },

    {
      name: '9pm',
      amount: 3000,
    },

    {
      name: '10pm',
      amount: 3000,
    },

    {
      name: '11pm',
      amount: 3000,
    },
  ],
  thrusday: [
    {
      name: '1am',
      amount: 2000,
    },
    {
      name: '2am',
      amount: 3000,
    },

    {
      name: '3am',
      amount: 500,
    },

    {
      name: '4am',
      amount: 3000,
    },

    {
      name: '5am',
      amount: 3000,
    },

    {
      name: '6am',
      amount: 3000,
    },

    {
      name: '7am',
      amount: 3000,
    },

    {
      name: '8am',
      amount: 3000,
    },

    {
      name: '9am',
      amount: 3000,
    },

    {
      name: '10am',
      amount: 3000,
    },

    {
      name: '11am',
      amount: 3000,
    },

    {
      name: '12pm',
      amount: 3000,
    },

    {
      name: '1pm',
      amount: 3000,
    },

    {
      name: '2pm',
      amount: 3000,
    },

    {
      name: '3pm',
      amount: 3000,
    },

    {
      name: '4pm',
      amount: 3000,
    },

    {
      name: '5pm',
      amount: 3000,
    },

    {
      name: '6pm',
      amount: 3000,
    },

    {
      name: '7pm',
      amount: 3000,
    },

    {
      name: '8pm',
      amount: 3000,
    },

    {
      name: '9pm',
      amount: 3000,
    },

    {
      name: '10pm',
      amount: 3000,
    },

    {
      name: '11pm',
      amount: 3000,
    },
  ],
  friday: [
    {
      name: '1am',
      amount: 4000,
    },
    {
      name: '2am',
      amount: 3000,
    },

    {
      name: '3am',
      amount: 3000,
    },

    {
      name: '4am',
      amount: 3000,
    },

    {
      name: '5am',
      amount: 3000,
    },

    {
      name: '6am',
      amount: 3000,
    },

    {
      name: '7am',
      amount: 3000,
    },

    {
      name: '8am',
      amount: 3000,
    },

    {
      name: '9am',
      amount: 3000,
    },

    {
      name: '10am',
      amount: 3000,
    },

    {
      name: '11am',
      amount: 3000,
    },

    {
      name: '12pm',
      amount: 3000,
    },

    {
      name: '1pm',
      amount: 3000,
    },

    {
      name: '2pm',
      amount: 3000,
    },

    {
      name: '3pm',
      amount: 3000,
    },

    {
      name: '4pm',
      amount: 3000,
    },

    {
      name: '5pm',
      amount: 3000,
    },

    {
      name: '6pm',
      amount: 3000,
    },

    {
      name: '7pm',
      amount: 3000,
    },

    {
      name: '8pm',
      amount: 3000,
    },

    {
      name: '9pm',
      amount: 3000,
    },

    {
      name: '10pm',
      amount: 3000,
    },

    {
      name: '11pm',
      amount: 3000,
    },
  ],
  saturday: [
    {
      name: '1am',
      amount: 200,
    },
    {
      name: '2am',
      amount: 300,
    },

    {
      name: '3am',
      amount: 800,
    },

    {
      name: '4am',
      amount: 3000,
    },

    {
      name: '5am',
      amount: 3000,
    },

    {
      name: '6am',
      amount: 3000,
    },

    {
      name: '7am',
      amount: 3000,
    },

    {
      name: '8am',
      amount: 3000,
    },

    {
      name: '9am',
      amount: 3000,
    },

    {
      name: '10am',
      amount: 3000,
    },

    {
      name: '11am',
      amount: 3000,
    },

    {
      name: '12pm',
      amount: 3000,
    },

    {
      name: '1pm',
      amount: 3000,
    },

    {
      name: '2pm',
      amount: 3000,
    },

    {
      name: '3pm',
      amount: 3000,
    },

    {
      name: '4pm',
      amount: 3000,
    },

    {
      name: '5pm',
      amount: 3000,
    },

    {
      name: '6pm',
      amount: 3000,
    },

    {
      name: '7pm',
      amount: 3000,
    },

    {
      name: '8pm',
      amount: 3000,
    },

    {
      name: '9pm',
      amount: 3000,
    },

    {
      name: '10pm',
      amount: 3000,
    },

    {
      name: '11pm',
      amount: 3000,
    },
  ],
  sunday: [
    {
      name: '1am',
      amount: 2000,
    },
    {
      name: '2am',
      amount: 3000,
    },

    {
      name: '3am',
      amount: 3000,
    },

    {
      name: '4am',
      amount: 3000,
    },

    {
      name: '5am',
      amount: 3000,
    },

    {
      name: '6am',
      amount: 3000,
    },

    {
      name: '7am',
      amount: 3000,
    },

    {
      name: '8am',
      amount: 3000,
    },

    {
      name: '9am',
      amount: 3000,
    },

    {
      name: '10am',
      amount: 3000,
    },

    {
      name: '11am',
      amount: 3000,
    },

    {
      name: '12pm',
      amount: 3000,
    },

    {
      name: '1pm',
      amount: 3000,
    },

    {
      name: '2pm',
      amount: 3000,
    },

    {
      name: '3pm',
      amount: 3000,
    },

    {
      name: '4pm',
      amount: 3000,
    },

    {
      name: '5pm',
      amount: 3000,
    },

    {
      name: '6pm',
      amount: 3000,
    },

    {
      name: '7pm',
      amount: 3000,
    },

    {
      name: '8pm',
      amount: 3000,
    },

    {
      name: '9pm',
      amount: 3000,
    },

    {
      name: '10pm',
      amount: 3000,
    },

    {
      name: '11pm',
      amount: 3000,
    },
  ],
};

const Reservation = ({
  id,
  username,
  date,
  status,
  image,
}: {
  id: String;
  username: String;
  date: String;
  status: String;
  image: string;
}) => {
  const [actionVisible, setActionVisible] = React.useState<boolean>(false);

  return (
    <li className="store__reservation-item">
      <div className="store__reservation-details">
        <div className="store__reservation-status">
          {status === 'cancelled' ? (
            <i className="fas fa-ban" />
          ) : (
            <i className="fas fa-check" />
          )}
        </div>

        <div className="store__reservation-info">
          <img
            className="store__reservation-img"
            src={image}
            alt="User profile"
          />
          {id}
          <h4 className="store__reservation-user">{username}</h4>
          <div className="store__reservation-date">{date}</div>
        </div>

        <div className="store__reservation-toggle">
          <button
            className="store__reservation-actions"
            type="button"
            onClick={() => setActionVisible(!actionVisible)}
          >
            <i className="fas fa-ellipsis-h" />
          </button>

          {actionVisible ? (
            <div className="store__reservation-dropdown">
              <button className="store__reservation-action" type="button">
                <div className="store__reservation-text">Delete</div>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
};

const StorePage = () => {
  const [menuVisible, setMenuVisible] = React.useState<boolean>(false);
  const [dayTraffic, setDayTraffic] = React.useState<string>('monday');
  const { storeId } = useParams();

  const store = {
    name: 'Title',

    recentReservation: [
      {
        id: '123',
        username: 'Tyrone Williams',
        profileImage: '/img/default.jpg',
        date: '08 Jan 2019 12:28 pm',
        status: 'cancelled',
      },
    ],
  };

  return (
    <section className="store">
      <header className="store__header">
        <h2 className="store__heading">{store.name}</h2>

        <button
          className="store__settings"
          type="button"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <i className="fas fa-cog" />
        </button>

        <div
          className={`store__dropdown ${
            menuVisible ? 'store__dropdown--active' : ''
          }`}
        >
          <ul className="store__dropdown-list">
            <li className="store__dropdown-item">
              <Link
                className="store__dropdown-link"
                to={`/dashboard/stores/${storeId}/layout`}
              >
                Edit Store Layout
              </Link>
            </li>
            <li className="store__dropdown-item">
              <Link
                className="store__dropdown-link"
                to={`/dashboard/stores/${storeId}/settings`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <div className="store__card store__card-list">
        <ul className="store__list">
          <li className="store__item">
            <div className="store__detail-amount">4000</div>
            <h4 className="store__detail-title">Avg Daily Reservation</h4>
          </li>

          <li className="store__item">
            <div className="store__detail-amount">4000</div>
            <h4 className="store__detail-title">Weekly Reservations</h4>
          </li>
        </ul>
      </div>

      <div className="store__card">
        <h4 className="store__card-heading">Popular Times</h4>
        <div className="store__dates">
          <button
            className={`store__day ${
              dayTraffic === 'monday' ? 'store__day-active  ' : ''
            }`}
            type="button"
            onClick={() => setDayTraffic('monday')}
          >
            Mon
          </button>
          <button
            className={`store__day ${
              dayTraffic === 'tuesday' ? 'store__day-active  ' : ''
            }`}
            type="button"
            onClick={() => setDayTraffic('tuesday')}
          >
            Tue
          </button>
          <button
            className={`store__day ${
              dayTraffic === 'wednesday' ? 'store__day-active  ' : ''
            }`}
            type="button"
            onClick={() => setDayTraffic('wednesday')}
          >
            Wes
          </button>
          <button
            className={`store__day ${
              dayTraffic === 'thrusday' ? 'store__day-active  ' : ''
            }`}
            type="button"
            onClick={() => setDayTraffic('thrusday')}
          >
            Thru
          </button>
          <button
            className={`store__day ${
              dayTraffic === 'friday' ? 'store__day-active  ' : ''
            }`}
            type="button"
            onClick={() => setDayTraffic('friday')}
          >
            Fri
          </button>
          <button
            className={`store__day ${
              dayTraffic === 'saturday' ? 'store__day-active  ' : ''
            }`}
            type="button"
            onClick={() => setDayTraffic('saturday')}
          >
            Sat
          </button>
          <button
            className={`store__day ${
              dayTraffic === 'sunday' ? 'store__day-active  ' : ''
            }`}
            type="button"
            onClick={() => setDayTraffic('sunday')}
          >
            Sun
          </button>
        </div>

        <div className="store__container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data[dayTraffic]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="amount" fill="#727cf5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="store__card">
        <h4 className="store__card-heading">Recent Reservation</h4>

        <ul className="store__reservation-list">
          {store.recentReservation.map((reservation) => (
            <Reservation
              id={reservation.id}
              username={reservation.username}
              date={reservation.date}
              status={reservation.status}
              image={reservation.profileImage}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StorePage;
