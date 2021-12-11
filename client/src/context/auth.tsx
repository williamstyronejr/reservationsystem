import * as React from 'react';

interface State {
  id: number | null;
  authenticated: boolean;
}

const initState: State = {
  id: null,
  authenticated: false,
};

const AuthContext = React.createContext({});

function authReducer(state: State, action: { type: String; payload?: any }) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, id: action.payload.id };
    case 'SIGNOUT':
      return {
        ...state,
        id: null,
      };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
}

export const AuthProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(authReducer, initState);
  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // React.useEffect(() => {}, []);

  return <AuthContext.Provider value={value} {...props} />;
};

export function useAuthContext(): { state: State } {
  const context = React.useContext(AuthContext) as any;
  if (!context) throw new Error('authContext must be inside of authProvider.');
  const { state } = context;

  return {
    state,
  };
}
