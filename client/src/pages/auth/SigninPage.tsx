import * as React from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Input';
import { useAuthContext } from '../../context/auth';

const SigninPage = () => {
  const navigate = useNavigate();
  const { signin, state } = useAuthContext();
  const { error, isLoading, mutate } = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const { data } = await axios.post('/signin', { username, password });

      if (data.user) signin(data.user);
      return data;
    },
  );

  function submitHandler(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  }

  if (state.authenticated) navigate('/dashboard');

  return (
    <section className="page-form">
      <form className="form" onSubmit={submitHandler}>
        <header className="form__header">
          <h3 className="form__heading">Signin to your account</h3>
          {error ? (
            <div
              className="form__notification form__notification--error"
              data-cy="notification-failure"
            >
              {(error as any).response.status === 401
                ? 'Invalid username or password.'
                : 'An error occurred during your request, please try again.'}
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input name="username" type="text" label="Username" error={null} />
          <Input
            name="password"
            type="password"
            label="Password"
            error={null}
          />
        </fieldset>

        <button
          className="form__btn form__btn--submit"
          type="submit"
          disabled={isLoading}
        >
          Signin
        </button>

        <Link className="form__link" to="/recovery" data-cy="recovery">
          Forgot password
        </Link>
      </form>
    </section>
  );
};

export default SigninPage;
