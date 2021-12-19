import * as React from 'react';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact';
import './styles/homepage.css';

const HomePage = () => (
  <>
    <section className="home">
      <h1 className="home__heading">Reservations made easy</h1>
      <p className="home__info">
        Reserve is focus on making an easy to integrate reservation tool for
        stores of all sizes.
      </p>

      <Link className="home__preview" to="/demo">
        View Demo
      </Link>
    </section>

    <section className="features">
      <header className="features__header">
        <h3 className="features__heading">Header</h3>
      </header>
    </section>

    <section className="pricing">
      <header className="pricing__header">
        <h3 className="pricing__heading">Choose a Pricing Plan</h3>
      </header>

      <ul className="pricing__list">
        <li className="pricing__item">
          <h4 className="pricing__type">Standard</h4>
          <p className="pricing__cost">$40</p>
          <ul className="pricing__features">
            <li className="pricing__feature">24x7 Support</li>
          </ul>
        </li>
        <li className="pricing__item">
          <div className="pricing__highlight">Recommended</div>
          <h4 className="pricing__type">Standard</h4>
          <p className="pricing__cost">$40</p>
          <ul className="pricing__features">
            <li className="pricing__feature">24x7 Support</li>
          </ul>
        </li>

        <li className="pricing__item">
          <h4 className="pricing__type">Standard</h4>
          <p className="pricing__cost">$40</p>
          <ul className="pricing__features">
            <li className="pricing__feature">24x7 Support</li>
          </ul>
        </li>
      </ul>
    </section>

    <section className="faq">
      <header className="faq__header">
        <h3 className="faq__heading">Frequently Asked Questions</h3>
        <p className="faq__info">
          Here are typical questions we get. For more information, feel free to
          contact us.
        </p>
        <button className="faq__email" type="button">
          Email us your question
        </button>
      </header>

      <div className="faq__questions">
        <ul className="faq__list">
          <li className="faq__item">
            <span className="faq__logo">Q.</span>
            <div className="faq__qa">
              <div className="faq__question">Question 1</div>
              <div className="faq__answer">Answer 1</div>
            </div>
          </li>

          <li className="faq__item">
            <span className="faq__logo">Q.</span>
            <div className="faq__qa">
              <div className="faq__question">Question 1</div>
              <div className="faq__answer">Answer 1</div>
            </div>
          </li>

          <li className="faq__item">
            <span className="faq__logo">Q.</span>
            <div className="faq__qa">
              <div className="faq__question">Question 1</div>
              <div className="faq__answer">Answer 1</div>
            </div>
          </li>

          <li className="faq__item">
            <span className="faq__logo">Q.</span>
            <div className="faq__qa">
              <div className="faq__question">Question 1</div>
              <div className="faq__answer">Answer 1</div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section className="contact">
      <header className="contact__header">
        <h3 className="contact__heading">Get in Touch</h3>
        <p className="contact__info">
          Please fill out the following form and we will get back to you
          shortly.
        </p>
      </header>
      <Contact />
    </section>
  </>
);

export default HomePage;
