import axios from 'axios';
import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import Input from '../../../components/Input';
import LoadingScreen from '../../../components/LoadingScreen';

const StoreSettingsPage = () => {
  const queryClient = useQueryClient();
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {},
  );
  const { storeId } = useParams();

  const { isLoading, data } = useQuery(
    '/dashboard/store/settings',
    async () => {
      const res = await axios(`/dashboard/store/${storeId}`);

      return res.data;
    },
  );

  const {
    isLoading: isUpdating,
    mutate,
    isSuccess: updateSuccess,
  } = useMutation(
    async ({
      name,
      address,
      phone,
      tags,
    }: {
      name: string;
      address: string;
      phone: string;
      tags: string;
    }) => {
      const params: any = {};
      if (name !== data.name) params.name = name;
      if (address !== data.address) params.address = address;
      if (phone !== data.phone) params.phone = phone;
      if (tags !== data.tags) params.tags = tags;

      const res = await axios.post(`/store/${storeId}/update`, params);

      return res.data;
    },
    {
      onSuccess: (updatedDate: any) => {
        queryClient.setQueryData('/dashboard/store/settings', updatedDate);
      },
      onError: (error: any) => {
        if (error.response && error.response.status === 400) {
          setFieldErrors(error.response.data.errors);
        } else {
          setFieldErrors({
            general: 'An error occurred during request, please try again.',
          });
        }
        return error;
      },
    },
  );

  function uploadHandler(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    setFieldErrors({});
  }

  function submitHandler(evt: React.SyntheticEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const fields: any = Object.fromEntries(formData.entries());
    mutate(fields);
  }

  if (isLoading) return <LoadingScreen />;

  return (
    <section className="">
      {updateSuccess ? (
        <div className="form__notification form__notification--success">
          Update was successful
        </div>
      ) : null}

      {fieldErrors.general ? (
        <div className="form__notification form__notification--error">
          {fieldErrors.general}
        </div>
      ) : null}
      <form onSubmit={uploadHandler}>
        <fieldset className="form__field">t</fieldset>
      </form>

      <form className="" onSubmit={submitHandler}>
        <fieldset className="form__field">
          <Input
            name="name"
            type="text"
            label="Store Name"
            defaultValue={data.name}
            error={fieldErrors.name}
          />

          <Input
            name="location"
            type="text"
            label="Address"
            defaultValue={data.location}
            error={fieldErrors.location}
          />

          <Input
            name="phone"
            type="text"
            label="Phone Number"
            defaultValue={data.phone}
            error={fieldErrors.phone}
          />

          <Input
            name="tags"
            type="text"
            label="Tags (Separated by comma)"
            defaultValue={data.tags}
            error={fieldErrors.tags}
          />
        </fieldset>

        <button
          className="form__btn form__btn--submit"
          type="submit"
          disabled={isUpdating}
        >
          Update Store
        </button>
      </form>
    </section>
  );
};

export default StoreSettingsPage;
