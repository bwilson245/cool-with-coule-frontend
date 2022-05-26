import classes from "./LoginModal.module.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Home from "../Home";
import axios from "axios";

function LoginModal(props, {show}) {
  const emailInput = useRef();
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([])
  const [open, setOpen] = useState(false)
  
  

  if (!open) {
    return null;
  }

   const preventRefresh = (e) => {
     e.preventDefault();
     console.log("refresh prevented");
   };

  function saveToLocalStorage(customerId) {
    window.localStorage.setItem("customerId", customerId);
  }
  return (
    <>
      {/* <div className={classes.overlay}></div> */}
      <div className={classes.main}>
        <form className={classes.login_box} onSubmit={preventRefresh}>
          <div className={classes.top}>
            <h1>Log In</h1>
            <label>Email</label>
            <input
              className={classes.input}
              type="text"
              placeholder="Email Address"
              ref={emailInput}
              onChange={() => setEmail(emailInput.current.value)}
            />
            <label>Password</label>
            <input
              className={classes.input}
              type="password"
              placeholder="Password"
              ref={passwordInput}
              onChange={() => setPassword(passwordInput.current.value)}
            />
          </div>
          <div className={classes.mid}>
            <input type="checkbox" />
            <p>Remember Me</p>
          </div>
          <div className={classes.bot}>
            <button
              className={classes.btn}
              onClick={() => props.login(email, password)}
            >
              Submit
            </button>
            <button className={classes.btn} onClick={show}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginModal;
