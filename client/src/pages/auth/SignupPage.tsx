import * as React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/Input';
import { useAuthContext } from '../../context/auth';
import { validateAuth } from '../../utils/validation';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signin, state } = useAuthContext();
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {},
  );

  const { error, isLoading, mutate } = useMutation(
    async ({
      username,
      email,
      password,
      confirmPassword,
    }: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      try {
        const { data } = await axios('/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: { username, email, password, confirmPassword },
        });

        if (data.user) signin(data.user);
        return data;
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          return setFieldErrors(err.response.data.errors);
        }

        throw err;
      }
    },
  );

  function submitHandler(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());

    const validationErrors = validateAuth(fields);
    if (validationErrors) return setFieldErrors(validationErrors);
    mutate(fields);
  }

  if (state.authenticated) navigate('/dashboard');

  return (
    <section className="page-form">
      <form className="form" onSubmit={submitHandler}>
        <header className="form__header">
          <h3 className="form__heading">Create your account</h3>
          {error ? (
            <div className="form__notification form__notification--error">
              An error occurred during your request, please try again.
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input
            name="email"
            type="text"
            label="Email"
            error={fieldErrors.email}
          />
          <Input
            name="username"
            type="text"
            label="Username"
            error={fieldErrors.username}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            error={fieldErrors.password}
          />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            error={fieldErrors.confirmPassword}
          />
        </fieldset>

        <button
          className="form__btn form__btn--submit"
          type="submit"
          disabled={isLoading}
        >
          Signup
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
