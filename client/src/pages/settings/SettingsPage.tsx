import * as React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Input from '../../components/Input';

const PasswordForm = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const {
    error,
    isLoading,
    mutate,
    data: success,
  } = useMutation(
    async ({
      oldPassword,
      password,
      confirmPassword,
    }: {
      oldPassword: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const { data } = await axios.post('/settings/password', {
          oldPassword,
          password,
          confirmPassword,
        });

        return data;
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          return setErrors(err.response.data.errors);
        }

        throw err;
      }
    },
  );

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setErrors({});
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <header className="form__header">
        <h3 className="form__heading">Update Password</h3>

        {success ? (
          <div className="form__notification form__notification--success">
            Password has been successfully updated.
          </div>
        ) : null}

        {error ? (
          <div
            className="form__notification form__notification--error"
            data-cy="notification-failure"
          >
            Server error occurred, please try again.
          </div>
        ) : null}
      </header>

      <fieldset className="form__field">
        <Input
          name="oldPassword"
          label="Old Password"
          error={errors.oldPassword}
          type="password"
        />
        <Input
          name="password"
          label="New Password"
          error={errors.password}
          type="password"
        />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          error={errors.confirmPassword}
          type="password"
        />
      </fieldset>

      <button
        className="form__btn form__btn--submit"
        type="submit"
        disabled={isLoading}
      >
        Update Password
      </button>
    </form>
  );
};

const AccountForm = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const { isLoading, mutate } = useMutation(
    async ({ username, email }: { username: string; email: string }) => {
      try {
        const { data } = await axios.post('/settings/account', {
          username,
          email,
        });

        return data;
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          return setErrors(err.response.data.errors);
        }

        throw err;
      }
    },
  );

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setErrors({});
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <header className="form__header">
        <h3 className="form__heading">Account</h3>
      </header>

      <fieldset className="form__field">
        <Input
          name="username"
          label="Username"
          error={errors.username}
          type="text"
        />

        <Input name="email" label="Email" error={errors.email} type="text" />
      </fieldset>

      <button
        className="form__btn form__btn--submit"
        type="submit"
        disabled={isLoading}
      >
        Update Account
      </button>
    </form>
  );
};

const SettingsPage = () => (
  <section className="settings">
    <PasswordForm />
    <AccountForm />
  </section>
);

export default SettingsPage;
