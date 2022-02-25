import * as React from 'react';
import Input from '../../../components/Input';

const CreateStorePage = () => {
  const submitHandler = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <section>
      <form className="form" onSubmit={submitHandler}>
        <fieldset className="form__field">
          <Input name="title" type="text" label="Title" error={null} />
        </fieldset>

        <button className="" type="submit">
          Create Store
        </button>
      </form>
    </section>
  );
};

export default CreateStorePage;
