import classes from "./Signup.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className={classes.card}>
        <h1 className={classes.login}>Log in</h1>
        <label className={classes.label}>Email</label>
        <input type="email" placeholder="Email" />
        <label className={classes.label}>Password</label>
        <input type="password" placeholder="Password" />
        <div className={classes.btn}>
          <button className={classes.signin}>Sign in</button>
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
