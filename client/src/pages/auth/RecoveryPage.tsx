import * as React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Input from '../../components/Input';

const RecoveryPage = () => {
  const [fieldError, setFieldError] = React.useState<string | null>(null);

  const { data, error, isLoading, mutate } = useMutation(
    async (inputEmail: string) => {
      try {
        const { data: res } = await axios.post('/recovery', {
          email: inputEmail,
        });
        return res;
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          return setFieldError(err.response.data.errors.email);
        }

        throw err;
      }
    },
  );

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>): any => {
    evt.preventDefault();
    if (isLoading) return;

    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());

    if (fields.email.trim() === '')
      return setFieldError('Please provide a valid email.');
    setFieldError(null);
    mutate(fields.email);
  };

  return (
    <section className="page-form">
      <form className="form" onSubmit={submitHandler}>
        <header className="form__header">
          <h1 className="form__heading">Reset Your Password</h1>

          <p className="form__subheading">
            Please provide the email address used when you created your account.
          </p>

          {error ? (
            <div
              className="form__notification form__notification--error"
              data-cy="notification-failure"
            >
              An error occurred during your request, please try again.
            </div>
          ) : null}

          {data && data.success ? (
            <div
              className="form__notification form__notification--success"
              data-cy="notification-success"
            >
              If an account exists witth the provided email, instructions for
              account recovery will be sent there.
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input name="email" type="text" error={fieldError} label="Email" />
        </fieldset>

        <button
          className="form__btn form__btn--submit"
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
