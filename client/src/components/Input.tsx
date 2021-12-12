import * as React from 'react';

const Input = ({ name, type }: { name: string; type: string }) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <label htmlFor={`${name}-input`}>
      <input
        id={`${name}-input`}
        name={name}
        type={type}
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        value={value}
      />
    </label>
  );
};

export default Input;
