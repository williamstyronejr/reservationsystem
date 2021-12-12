import * as React from 'react';
import { useMutation } from 'react-query';

const RecoveryPage = () => {
  const [email, setEmail] = React.useState<string>('');
  const [fieldError, setFieldError] = React.useState<string | null>(null);

  const { data, error, isLoading, mutate } = useMutation(
    async (inputEmail: string) => {
      const res = await fetch('/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inputEmail }),
      });

      const jsonData: any = await res.json();
      if (jsonData.errors) return setFieldError(jsonData.errors.email);
      return jsonData;
    },
  );

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>): any => {
    evt.preventDefault();
    if (isLoading) return;

    if (email.trim() === '')
      return setFieldError('Please provide a valid email.');
    setFieldError(null);
    mutate(email);
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
              An error occurred during your request, please try again.
            </div>
          ) : null}

          {fieldError ? (
            <div className="form__notification form__notification--error">
              {fieldError}
            </div>
          ) : null}

          {data && data.success ? (
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

        <button
          className="form__btn form__btn-submit"
          type="submit"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default RecoveryPage;
