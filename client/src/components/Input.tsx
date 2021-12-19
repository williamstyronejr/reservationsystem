import * as React from 'react';

const Input = ({
  name,
  type,
  error,
  label,
}: {
  label: string;
  name: string;
  type: string;
  error: string | null;
}) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <label className="form__label" htmlFor={`${name}-input`}>
      {error ? <div className="form__fielderror">{error}</div> : null}
      <span className="form__labeling">{label}</span>
      <input
        id={`${name}-input`}
        name={name}
        className="form__input form__input--text"
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
