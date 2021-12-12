import * as React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import { useAuthContext } from '../../context/auth';

const SigninPage = () => {
  const navigate = useNavigate();
  const { signin, state } = useAuthContext();
  const { error, isLoading, mutate } = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const res = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const jsonData = await res.json();
      if (jsonData.user) signin(jsonData.user);
      return jsonData;
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
    <section className="signin">
      <form className="form" onSubmit={submitHandler}>
        <header className="form__header">
          {error ? (
            <div className="form__notification form__notification--error">
              An error occurred during your request, please try again.
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input name="username" type="text" />
          <Input name="password" type="password" />
        </fieldset>

        <button
          className="form__btn form__btn--submit"
          type="submit"
          disabled={isLoading}
        >
          Signin
        </button>
      </form>
    </section>
  );
};

export default SigninPage;
