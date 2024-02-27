import React, { useCallback, useEffect, useState } from "react";

let logOutTimer;
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

const calculateTokenExpire = (expireTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expireTime).getTime();

  const remainigTime = adjExpirationTime - currentTime;
  return remainigTime;
};

const retreieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpire = localStorage.getItem("expire");
  const remainingTime = calculateTokenExpire(storedExpire);
  if (remainingTime <= 3000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expire");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retreieveStoredToken();
  let initialToken = null;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logOutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expire");
    if (logOutTimer) {
      clearTimeout(logOutTimer);
    }
  }, []);
  const logInHandler = (token, expireTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expire", expireTime);
    const remainingTime = calculateTokenExpire(expireTime);
    logOutTimer = setTimeout(logOutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logOutTimer = setTimeout(logOutHandler, tokenData.duration);
    }

    if (logOutTimer) {
      clearTimeout(logOutTimer);
    }
  }, [tokenData, logOutHandler]);
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: logInHandler,
    logOut: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
