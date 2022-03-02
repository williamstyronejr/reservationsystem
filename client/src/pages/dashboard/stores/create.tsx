import * as React from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Navigate } from 'react-router-dom';
import Input from '../../../components/Input';

const CreateStorePage = () => {
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {},
  );

  const {
    error,
    isLoading,
    mutate,
    data: response,
  } = useMutation(
    async ({
      name,
      phone,
      tags,
      location,
    }: {
      name: string;
      phone: string;
      tags: string;
      location: string;
    }) => {
      try {
        const { data } = await axios.post('/store/create', {
          name,
          phone,
          tags,
          location,
        });

        return data;
      } catch (err: any) {
        if (err.response && err.response.status === 400) {
          return setFieldErrors(err.response.data.errors);
        }
        throw err;
      }
    },
  );

  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  };

  if (response && response.storeId)
    return <Navigate replace to={`/dashboard/stores/${response.storeId}`} />;

  return (
    <section>
      <form className="form" onSubmit={submitHandler}>
        <header className="form__header">
          <h3 className="form__heading">Create your Store</h3>
          {error ? (
            <div className="form__notification form__notification--error">
              {(error as any).response && (error as any).response.status === 400
                ? 'Invali'
                : ''}
            </div>
          ) : null}
        </header>

        <fieldset className="form__field">
          <Input
            name="name"
            type="text"
            label="Store Name"
            error={fieldErrors.name}
          />

          <Input
            name="location"
            type="text"
            label="Address"
            error={fieldErrors.location}
          />

          <Input
            name="phone"
            type="text"
            label="Phone Number"
            error={fieldErrors.phone}
          />

          <Input
            name="tags"
            type="text"
            label="Tags (Separated by comma)"
            error={fieldErrors.tags}
          />
        </fieldset>

        <button
          className="form__btn form__btn--submit"
          type="submit"
          disabled={isLoading}
        >
          Create Store
        </button>
      </form>
    </section>
  );
};

export default CreateStorePage;
