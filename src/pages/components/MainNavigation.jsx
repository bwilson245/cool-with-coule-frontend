import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import "./resources/Logo-small.png";
import { useRef, useState } from "react";
import axios from "axios";
import React from "react";

const api = axios.create({
  baseUrl: "https://jsonplaceholder.typicode.com/",
});

function MainNavigation(props) {
  const input = useRef();
  const [criteria, setCriteria] = useState("");

  function signout() {
    let customer = localStorage.getItem("customer");
    if (customer != null) {
      localStorage.removeItem("customer");
      alert("logged out");
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
        <button
          className={classes.search_btn}
          onClick={() => props.content(criteria)}
        >
          GO!
        </button>
        <input
          className={classes.search_input}
          type="text"
          onChange={() => setCriteria("?name=" + input.current.value)}
          ref={input}
          placeholder="Search"
        ></input>
      </div>
      <ul>
        <li>
          <h6>{ }</h6>
        </li>
        <li>
          <Link className={classes.link} to="/" onClick={signout}>
            Sign Out
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/signup">
            Sign Up
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/login">
            Log In
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/account">
            Account
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
