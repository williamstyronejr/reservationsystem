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
      <span className="form__labeling">{label}</span>
      {error ? (
        <div className="form__fielderror" data-cy="input-error">
          {error}
        </div>
      ) : null}
      {type !== 'textarea' ? (
        <input
          id={`${name}-input`}
          name={name}
          className="form__input form__input--text"
          type={type}
          onChange={(evt) => {
            setValue(evt.target.value);
          }}
          value={value}
          placeholder={label}
        />
      ) : (
        <textarea
          className="form__input form__input--textarea"
          placeholder={label}
        />
      )}
    </label>
  );
};

export default Input;
