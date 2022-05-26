import classes from "./Signup.module.css"
import { Link } from "react-router-dom";

function Signup() {

    return (
      <>
        <div className={classes.card}>
          <h1 className={classes.login}>Log in</h1>
          <label className={classes.label}>Name</label>
          <input type="text" placeholder="Name" />
          <label className={classes.label}>Email</label>
          <input type="email" placeholder="Email" />
          <label className={classes.label}>Password</label>
          <input type="password" placeholder="Password" />
          <label className={classes.label}>Address</label>
          <input type="text" placeholder="Address" />
          <label className={classes.label}>City</label>
          <input type="text" placeholder="City" />
          <label className={classes.label}>State</label>
          <input type="text" placeholder="State" />
          <label className={classes.label}>Zip Code</label>
          <input type="text" placeholder="Zip Code" />
          <div className={classes.btn}>
            <button className={classes.signin}>Sign in</button>
            <button className={classes.cancel}>Cancel</button>
          </div>
        </div>
      </>
    );
}
export default Signup;