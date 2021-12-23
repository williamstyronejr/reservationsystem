import * as React from 'react';
import Input from './Input';

const Contact = () => {
  function submitHandler(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  return (
    <form className="" onSubmit={submitHandler}>
      <fieldset className="form__field">
        <Input name="name" type="text" label="Your Name" error={null} />
        <Input name="email" type="text" label="Your Email" error={null} />
        <Input name="subject" type="text" label="Your Subject" error={null} />
        <Input name="message" type="textarea" label="Message" error={null} />
      </fieldset>

      <button className="form__btn form__btn--submit" type="submit">
        Send Message
      </button>
    </form>
  );
};

export default Contact;
