import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { SwishSpinner } from "react-spinners-kit";

function Home(props) {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  useEffect(() => {
    props.content("ONLOAD");
  }, []);

  function saveToCart(product, index) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let productExists = false;
    let cartIndex;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === product.name) {
        console.log("cart: ", cart[i]);
        cart[i].quantity += 1;
        productExists = true;
        cartIndex = i;
        console.log("cart after: ", cart[i]);
      }
    }
    if (!productExists) {
      let item = {
        description: product.description,
        imageUrl: product.imageUrl,
        name: product.name,
        priceInCents: product.priceInCents,
        quantity: 1,
        type: product.type,
        upcCode: product.upcCode,
      };
      cart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    product.quantity -= 1;

    let btn = document.getElementById(index);
    if (product.quantity <= 0) {
      btn.className = classes.outOfStock;
      btn.innerHTML = "OUT OF STOCK";
      btn.disabled = true;
    } else if (
      cartIndex != null &&
      cart[cartIndex].quantity >= product.quantity
    ) {
      btn.className = classes.outOfStock;
      btn.innerHTML = "OUT OF STOCK";
      btn.disabled = true;
    } else {
      btn.className = classes.btn;
    }

    console.log(props.data);
  }

  function checkStock(product, index) {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let btn = document.getElementById(index);

    for (let i = 0; i < cart.length; i++) {

    }
    if (product.quantity <= 0) {
      btn.innerHTML = "OUT OF STOCK";
      btn.disabled = true;
      return classes.outOfStock
    } else {
      return classes.btn
    }
  }

  let productsJsx = props.data.map((product, index) => (
    <div key={product.name} className={classes.item}>
      <div className={classes.img}>
        <img src={product.imageUrl} alt={product.name} height="250" />
      </div>
      <h3 className={classes.name}>{product.name}</h3>
      <br />

      <div>
        <div className={classes.desc}>{product.description}</div>
        <div className={classes.price}>${product.priceInCents / 100}</div>
        <button
          id={index}
          className={checkStock(product, index)}
          onClick={() => saveToCart(product, index) }
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <>
      <div className={classes.top_flex_container}>
        <div className={classes.top_flex_left}>
          <h1 className={classes.moto1}>Cool</h1>
          <h1 className={classes.moto2}>With</h1>
          <h1 className={classes.moto1}>Coule.</h1>
          <p>Bet you never felt this cool.</p>
          <p>Now you can, with CoolWithCoule!</p>
          <ul>
            <li>
              <button
                className={classes.bot_btn}
                onClick={() => props.content("?name=apron")}
              >
                Aprons
              </button>
            </li>
            <li>
              <button
                className={classes.bot_btn}
                onClick={() => props.content("?name=tea towel")}
              >
                Tea Towels
              </button>
            </li>
            <li>
              <button
                className={classes.bot_btn}
                onClick={() => props.content("?name=oven mitt")}
              >
                Oven Mits
              </button>
            </li>
          </ul>
          <h1 className={classes.bottom_expression}>Get 'em while</h1>{" "}
          <h2>they're hot!</h2>
        </div>
        <div className={classes.top_flex_right}>
          <img
            src={require("./components/resources/Homepage-main.png")}
            alt="Homepage-main.png"
          />
        </div>
      </div>

      <div className={classes.content}>
        <SwishSpinner loading={props.isLoading} className={classes.icon} />
        {productsJsx.length === 0 && !props.isLoading ? (
          <h3>no results found.</h3>
        ) : (
          productsJsx
        )}
      </div>
    </>
  );
}

export default Home;
