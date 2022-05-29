import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import "./resources/Logo-small.png";


function MainNavigation(props, { loggedIn }) {
  const input = useRef();
  const [criteria, setCriteria] = useState("");
  const [value, setValue] = useState(0);

  let customer = JSON.parse(localStorage.getItem("customer"));

  function signout() {
    console.log("test");
    if (customer != null) {
      localStorage.removeItem("customer");
      setValue(value + 1);
      props.setLoggedIn(false);
    } else {
      console.log("error");
    }
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <img
          className={classes.logo_small}
          src={require("./resources/Logo-small.png")}
          alt="logo"
        />
      </Link>
      <h1 className={classes.h1}>You're Cool!</h1>

      <div className={classes.search}>
        <Link to="/">
          <button
            className={classes.search_btn}
            onClick={() => props.content(criteria)}
          >
            GO!
          </button>
        </Link>

        <input
          className={classes.search_input}
          type="text"
          onChange={() => setCriteria("?name=" + input.current.value)}
          ref={input}
          placeholder="Search"
        ></input>
      </div>
      <ul>
        {props.loggedIn ? (
          <div className={classes.opt}>
            <li>
              <h5>
                Welcome Back, <br />
                {customer.name}! <br />
                <Link className={classes.account} to="/account">
                  Go to account
                </Link>
              </h5>
            </li>
            <li>
              <Link className={classes.link} to="/" onClick={signout}>
                Sign Out
              </Link>
            </li>
          </div>
        ) : (
          <div className={classes.opt}>
            <li>
              <Link className={classes.link} to="/login">
                Log In
              </Link>
            </li>
            <li>
              <Link className={classes.link} to="/signup">
                Sign Up
              </Link>
            </li>
          </div>
        )}
        <li>
          <Link className={classes.link} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/cart">
            Cart
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default MainNavigation;
