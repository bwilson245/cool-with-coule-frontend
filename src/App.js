import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import classes from "./App.module.css";

import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Home from "./pages/Home";
import MainNavigation from "./pages/components/MainNavigation";
import MainFooter from "./pages/components/MainFooter";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FAQ from "./pages/FAQ"

const productClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/products`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function App(props) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [render, reRender] = useState(0)

  function search(criteria) {
    if (content.length > 0 && criteria == "ONLOAD") {
      return null;
    }
    setIsLoading(true);
    productClient
      .get(criteria)
      .then((res) => {
        setContent(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(criteria);
        setIsLoading(false);
      });
  }

  return (
    <div className={classes.main}>
      <MainNavigation
        className={classes.nav}
        content={search}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home data={content} isLoading={isLoading} content={search} />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup setLoggedIn={setLoggedIn} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/faq" element={<FAQ render={render} />} />
      </Routes>
      <MainFooter className={classes.footer} render={reRender}/>
    </div>
  );
}

export default App;
