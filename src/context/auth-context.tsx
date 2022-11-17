import React from "react";
import { useRouter } from "next/router";

type AuthContextInterface = {
  authState: AuthData;
  isUserAuthenticated?: Function;
  setAuthState?: Function;
};
export type AuthData = {
  token: string;
};

const defaultState: AuthContextInterface = {
  authState: {
    token: "",
  },
};

const AuthContext = React.createContext<AuthContextInterface>(defaultState);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = React.useState({
    token: "",
  });

  const setUserAuthInfo = ({ token }: AuthData) => {
    localStorage.setItem("token", token);

    setAuthState({
      token,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = (): boolean => {
    const initialAuthData: AuthData = {
      token: localStorage.getItem("token") ?? "",
    };
    if (initialAuthData.token) {
      setAuthState({
        token: initialAuthData.token,
      });
    }
    if (!authState.token && !initialAuthData.token) {
      return false;
    }
    return true;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo: AuthData) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
