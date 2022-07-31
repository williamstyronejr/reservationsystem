import * as React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthContext } from "../context/auth";

const SigninPage = () => {
  const { state, signin } = useAuthContext();

  const { data, mutate, isLoading, error } = useMutation(
    async ({ username, password }: { username: string; password: string }) => {
      const { data } = await axios.post("/signin", { username, password });
      if (data.user) signin(data.user);
      return data;
    }
  );

  const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  };

  if (state.authenticated) return <Navigate replace to="/dashboard" />;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <header className="form__header">
          {error ? (
            <div className="form__notification form__notification--error">
              Invalid username or password.
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input name="username" label="Username" type="text" error={null} />

          <Input
            name="password"
            label="Password"
            type="password"
            error={null}
          />
        </fieldset>

        <button className="btn btn--submit" disabled={isLoading}>
          Signin
        </button>
      </form>
    </section>
  );
};

export default SigninPage;
