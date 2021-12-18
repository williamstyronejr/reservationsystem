import * as React from 'react';
import { useAuthContext } from '../context/auth';

const Header = () => {
  const { state, signout } = useAuthContext();
  return (
    <header className="page__header">
      {state.authenticated ? (
        <button
          className="btn btn--signout"
          type="button"
          onClick={() => signout()}
        >
          Signout
        </button>
      ) : null}
    </header>
  );
};

export default Header;
