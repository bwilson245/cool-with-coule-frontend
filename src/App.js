import { Route, Routes } from "react-router-dom";
import axios from "axios";
import classes from "./App.module.css";
import Checkout from "./pages/Checkout"

import Home from "./pages/Home";
import MainNavigation from "./pages/components/MainNavigation";
import MainFooter from "./pages/components/MainFooter";
import Cart from "./pages/Cart";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import React, { useState } from "react";

const productClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/products`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const customerClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function App(props) {
  const [content, setContent] = useState([]);
  const [user, setUser] = useState([])

  function search(criteria) {
    productClient
      .get(criteria)
      .then((res) => {
        setContent(res.data.products);
        console.log(res.data);
        console.log(criteria);
      })
      .catch((err) => {
        console.log(err);
        console.log(criteria);
      });
  }

  function searchCustomer(email, password) {
    let result = customerClient
      .get("?email=" + email + "&password=" + password)
      .then((res) => {
        setUser(res.data.customerModel);
        console.log(res.data);
        console.log(email + "?password=" + password);
      })
      .catch((err) => {
        console.log(err);
        console.log(email + "?password=" + password);
      });
  }

  return (
    <div className={classes.main}>
      <MainNavigation className={classes.nav} content={search} />
      <Routes>
        <Route path="/" element={<Home data={content} content={search} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <MainFooter className={classes.footer} />
    </div>
  );
}

export default App;
