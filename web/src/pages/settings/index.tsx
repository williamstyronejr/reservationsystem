import * as React from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useAuthContext } from "../../context/auth";
import Input from "../../components/Input";

const AccountForm = ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const { error, isLoading, mutate } = useMutation("", async () => {});

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  };

  console.log(error);

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <header className="form__header">
          {error ? (
            <div className="form__notification form__notification--error">
              An error occurred, please try again.
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input
            type="text"
            name="username"
            label="Username"
            error={errors.username}
            defaultValue={username}
          />

          <Input
            type="text"
            name="email"
            label="Email"
            error={errors.email}
            defaultValue={email}
          />
        </fieldset>

        <button className="btn btn--submit" type="submit" disabled={isLoading}>
          Update Account
        </button>
      </form>

      <div className="">
        <button className="btn btn--delete">Delete Account</button>
      </div>
    </>
  );
};

const PasswordFrom = () => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const { error, mutate, isLoading } = useMutation(
    "/settings/password",
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
        const res = await axios.post("/settings/password", {
          oldPassword,
          password,
          confirmPassword,
        });

        return res.data;
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          return setErrors(err.response.data.errors);
        }
      }
    }
  );

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <header className="form__header">
        {error ? (
          <div className="form__notification form__notification--error">
            An error occurred, please try again.
          </div>
        ) : null}
      </header>

      <fieldset className="form__field">
        <Input
          type="password"
          name="oldPassword"
          label="Old Password"
          error={errors.oldPassword}
        />
        <Input
          type="password"
          name="password"
          label="New Password"
          error={errors.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          error={errors.confirmPassword}
        />
      </fieldset>

      <button type="submit" className="btn btn--submit" disabled={isLoading}>
        Update Password
      </button>
    </form>
  );
};

const SettingsPage = () => {
  const { state } = useAuthContext();
  const [formSelected, SetFormSelected] = React.useState<String>("password");

  return (
    <section className="settings">
      <aside className="settings__aside">
        <ul className="settings__list">
          <li className="settings__item">
            <button className="" onClick={() => SetFormSelected("account")}>
              Account
            </button>
          </li>

          <li className="settings__item">
            <button className="" onClick={() => SetFormSelected("password")}>
              Password
            </button>
          </li>
        </ul>
      </aside>

      <div className="settings__content">
        {formSelected === "account" ? (
          <AccountForm username={state.username} email={""} />
        ) : null}
        {formSelected === "password" ? <PasswordFrom /> : null}
      </div>
    </section>
  );
};

export default SettingsPage;
