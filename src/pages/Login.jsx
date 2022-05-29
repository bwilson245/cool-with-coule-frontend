import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SwishSpinner } from "react-spinners-kit";
import axios from "axios";

import classes from "./Login.module.css";

const customerClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function Login(props) {
  const navigate = useNavigate();
  let emailInput = useRef();
  let passwordInput = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [render, reRender] = useState(0)

  function searchCustomer(email, password) {
    setIsLoading(true);
    customerClient
      .get("?email=" + email + "&password=" + password)
      .then((res) => {
        console.log(res);
        if (res.data.customerModel == null) {
          setIsLoading(false);
          return alert(res.data.responseStatus.message);
        }
        localStorage.setItem(
          "customer",
          JSON.stringify(res.data.customerModel)
        );
        setIsLoading(false);
        props.setLoggedIn(true);
        reRender(render + 1);
        return navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        reRender(render + 1);
        alert("Error");
      });
  }

  return (
    <>
      <div className={classes.card}>
        <h1 className={classes.login}>Log in</h1>
        <label className={classes.label}>Email</label>
        <input
          type="email"
          placeholder="Email"
          ref={emailInput}
          onChange={() => setEmail(emailInput.current.value)}
        />
        <label className={classes.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          ref={passwordInput}
          onChange={() => setPassword(passwordInput.current.value)}
        />
        <div className={classes.icon}>
          <SwishSpinner loading={isLoading} />
        </div>
        <div className={classes.btn}>
          <button
            className={classes.signin}
            onClick={() => searchCustomer(email, password) && props.login(true)}
            disabled={isLoading}
          >
            Sign in
          </button>

          <Link className={classes.link} to="/">
            <button className={classes.cancel} disabled={isLoading}>
              Cancel
            </button>
          </Link>
        </div>
        {isLoading ? null : (
          <Link className={classes.link} to="/signup">
            Dont have an account?
          </Link>
        )}
      </div>
    </>
  );
}

export default Login;
