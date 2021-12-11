import * as React from 'react';

const RecoveryPage = () => {
  const [email, setEmail] = React.useState<string>('');
  return (
    <section>
      <input
        className=""
        type="text"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
    </section>
  );
};

export default RecoveryPage;
