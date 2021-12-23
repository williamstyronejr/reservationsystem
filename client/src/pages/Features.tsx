import * as React from 'react';
import Contact from '../components/Contact';
import './styles/featurespage.css';

const FeaturesPage = () => (
  <section className="features">
    <header className="features__header">
      <h2 className="features__heading">Testing</h2>
    </header>

    <div className="">
      <ul className="features__list">
        <li className="features__item">
          <h3 className="feature__">Make reseving easier</h3>
          <p className="features__info">
            Conveient reservation through web or mobile app for all customers.
          </p>
        </li>

        <li className="features__item">
          <h3 className="feature__">Instant communication with customers</h3>
          <p className="features__info">
            Need to cancel a customer&aposs reservation? Emergency closing of
            your store? Send a notification, email, text, or phone call to your
            customer with options to reschedule.
          </p>
        </li>

        <li className="features__item">
          <h3 className="feature__">Model your store</h3>
          <p className="features__info">
            Tools to help you create wireframe model of your store for users to
            know what to expect.
          </p>
        </li>

        <li className="features__item">
          <h3 className="feature__">Access to data</h3>
          <p className="features__info">
            Make use of our many tools to see how your store is preforming on
            our platform, including number of cancellations, number of
            customers, and more.
          </p>
        </li>

        <li className="features__item">
          <h3 className="feature__">Make managing easier</h3>
          <p className="features__info">
            Tools for managing your store&aposs availability and information and
            notifying users of changes.
          </p>
        </li>
      </ul>
    </div>

    <div className="features__request">
      <p className="features__">
        We are consistly working on creating new tools for our customers. If you
        want to request a feature for your store, contact us using the form
        below.
      </p>

      <Contact />
    </div>
  </section>
);

export default FeaturesPage;
