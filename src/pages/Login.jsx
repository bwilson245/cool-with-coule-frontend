import classes from "./Signup.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";

const customerClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



function Login() {
  let emailInput = useRef();
  let passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function searchCustomer(email, password) {
    let result = customerClient
      .get("?email=" + email + "&password=" + password)
      .then((res) => {
        console.log(res)
        if (res.data.customerModel == null) {
          return alert(res.data.responseStatus.message);
        }
        localStorage.setItem("customer", JSON.stringify(res.data.customerModel))
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error")
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
        <div className={classes.btn}>
          <button className={classes.signin} onClick={() => searchCustomer(email, password)}>
            Sign in
          </button>
          <button className={classes.cancel}>Cancel</button>
        </div>
        <Link className={classes.link} to="/login">
          Dont have an account?
        </Link>
      </div>
    </>
  );
}

export default Login;
