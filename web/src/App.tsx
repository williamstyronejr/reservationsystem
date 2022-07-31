import * as React from "react";
import LoadingScreen from "./components/LoadingScreen";
import { useAuthContext } from "./context/auth";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = React.lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const { state } = useAuthContext();

  return (
    <React.Suspense fallback={<LoadingScreen />}>
      {state.authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
