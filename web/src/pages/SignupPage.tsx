import * as React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import Input from "../components/Input";

const SignupPage = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const { signin, state } = useAuthContext();

  const { error, data, mutate, isLoading } = useMutation(
    async ({
      username,
      password,
      confirmPassword,
      email,
    }: {
      username: string;
      password: string;
      email: string;
      confirmPassword: string;
    }) => {
      try {
        const { data } = await axios.post("/signup", {
          username,
          password,
          email,
          confirmPassword,
        });

        if (data.user) signin(data.user);
        return data;
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          return setErrors(err.response.data.errors);
        }
      }
    }
  );

  const handleSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData);
    mutate(fields);
  };

  if (state.authenticated) return <Navigate replace to="/dashboard" />;

  return (
    <section className="">
      <form className="form" onSubmit={handleSubmit}>
        <header className="form__header">
          {error ? (
            <div className="form__notification form__notification--error">
              An error occurred, please try again.
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input
            name="username"
            label="Username"
            type="text"
            error={errors.username}
          />

          <Input name="email" label="Email" type="text" error={errors.email} />

          <Input
            name="password"
            label="Password"
            type="password"
            error={errors.password}
          />

          <Input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword}
          />
        </fieldset>

        <button className="btn btn--submit" disabled={isLoading}>
          Create Account
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
