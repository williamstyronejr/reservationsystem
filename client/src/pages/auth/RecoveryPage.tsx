import * as React from 'react';

const RecoveryPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>): any => {
    evt.preventDefault();

    if (email.trim() === '') return setError('Please provide a valid email.');
    setError(null);
    setSuccess(false);

    fetch('/recovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res: Response) => res.json())
      .then((data) => {
        // eslint-disable-next-line no-console
        if (data.errors) return setError(data.errors.email);
        setSuccess(true);
      })
      .catch(() => {
        setError('An server error has occurred, please try again.');
      });
  };

  return (
    <section>
      <form className="form" onSubmit={submitHandler}>
        <header className="form__header">
          <h1 className="form__heading">Reset Your Password</h1>

          <p className="form__info">
            Please provide the email address used when you created your account.
          </p>

          {error ? (
            <div className="form__notification form__notification--error">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="form__notification form__notification--success">
              Please check your email for recovery instructions.
            </div>
          ) : null}
        </header>

        <fieldset>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              className="form__input"
              type="text"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </label>
        </fieldset>

        <button className="form__btn form__btn-submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default RecoveryPage;
