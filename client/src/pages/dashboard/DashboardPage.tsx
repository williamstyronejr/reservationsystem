import * as React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import './styles/dashboardpage.css';

const chartData: Record<string, Array<any>> = {
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

const DashboardPage = () => {
  const [days, setDays] = React.useState<string>('week');

  console.log(days);

  return (
    <section className="dashboard">
      <header className="dashboard__header">
        <h3 className="dashboard__heading">Welcome Back</h3>
      </header>

      <div className="dashboard__options">
        <select
          className="dashboard__option"
          name="days"
          onChange={(evt) => setDays(evt.currentTarget.value)}
        >
          <option value="week">Last 7 Days</option>
          <option value="ytd">Year To Date</option>
        </select>
      </div>

      <div className="dashboard__tiles">
        <div className="dashboard__tile">
          <h5 className="dashboard__tile-heading">Total Reservations</h5>
          <div className="dashboard__tile-amount">1900</div>
        </div>

        <div className="dashboard__tile">
          <h5 className="dashboard__tile-heading">Avg Daily Reservations</h5>
          <div className="dashboard__tile-amount">76</div>
        </div>
      </div>

      <div className="dashboard__chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData[0]}
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
    </section>
  );
};

export default DashboardPage;
