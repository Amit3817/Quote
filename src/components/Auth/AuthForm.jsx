import React, { useContext, useRef, useState, useEffect } from "react";
import classes from "./AuthForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { signUp, signIn } from "../../lib/api";
import Spinner from "../loading/Spin";
import AuthContext from "../../store/AuthContext";

const AuthForm = () => {
  const [login, setlogin] = useState(true);
  const inputEmail = useRef();
  const inputPassword = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const { sendRequest, status, data, error } = useHttp(login ? signIn : signUp);

  useEffect(() => {
    if (status === "completed" && !error) {
      const expiresIn = new Date(new Date().getTime() + +data.expiresIn * 1000);
      authCtx.logIn(data.idToken, expiresIn.toString());
      navigate("../quotes");
    }
  }, [status, error, data, authCtx, navigate]);
  const authHandler = (event) => {
    event.preventDefault();
    const enteredEmail = inputEmail.current.value;
    const enteredPassword = inputPassword.current.value;

    sendRequest({ email: enteredEmail, password: enteredPassword });
  };

  return (
    <>
      {status === "pending" && <Spinner />}
      {!(status === "pending") && (
        <>
          <section className={classes.auth}>
            <h1>{login ? "Log In" : "Create Account"}</h1>

            <form>
              <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required ref={inputEmail} />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  ref={inputPassword}
                />
              </div>
              <div className={classes.btncntrl}>
                <button className={`btn ${classes.btnn}`} onClick={authHandler}>
                  {login ? "Log In" : "Sign Up"}
                </button>
                <Link
                  className={classes.btnn}
                  onClick={() => setlogin(!login)}
                  to="./"
                >
                  {login ? "Create Account" : "Already Registered, Log In"}
                </Link>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export default AuthForm;
