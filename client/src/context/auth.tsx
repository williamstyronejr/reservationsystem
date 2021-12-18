import * as React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';

interface State {
  id: number | null;
  username: string | null;
  authenticated: boolean;
}

const initState: State = {
  id: null,
  username: null,
  authenticated: false,
};

const AuthContext = React.createContext({});

function authReducer(state: State, action: { type: String; payload?: any }) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        authenticated: true,
      };

    case 'SIGNOUT':
      return {
        ...state,
        id: null,
        authenticated: false,
      };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
}

export const AuthProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(authReducer, initState);
  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch]);
  useQuery('csrf', async () => {
    const res = await axios.get('/getCSRFToken');
    const csrfToken = res.data.CSRFToken;
    axios.defaults.headers.common['csrf-token'] = csrfToken;

    return res.data;
  });

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(
    '/session',
    async () => {
      const { data } = await axios.get('/session');
      return data;
    },
    { retry: false, refetchOnMount: false },
  );

  React.useEffect(() => {
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user,
      });
    }
  }, [user, error]);

  if (isLoading) return <LoadingScreen />;
  return <AuthContext.Provider value={value} {...props} />;
};

export function useAuthContext(): {
  state: State;
  signin: Function;
  signout: Function;
} {
  const context = React.useContext(AuthContext) as any;
  if (!context) throw new Error('authContext must be inside of authProvider.');
  const { state, dispatch } = context;

  function signin(user: any) {
    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  }

  async function signout() {
    try {
      const { data } = await axios.post('/signout');

      if (data.success)
        dispatch({
          type: 'SIGNOUT',
        });
    } catch (err) {
      //
    }
  }

  return {
    state,
    signin,
    signout,
  };
}
