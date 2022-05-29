import { useEffect, useState } from "react";
import classes from "./Home.module.css";
import { SwishSpinner } from "react-spinners-kit";

function Home(props) {
  const [render, reRender] = useState(0);
  
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  useEffect(() => {
    props.content("ONLOAD");
    console.log("render");
  }, [cart]);

  function saveToCart(product, index) {
    let productExists = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === product.name) {
        if (cart[i].quantity < product.quantity) {
          cart[i].quantity += 1;
          productExists = true;
        }
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
    checkStock(product, index);
    reRender(render + 1);
  }

  function checkStock(product, index) {
    let btn = document.getElementById(index);
    let cartItem;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === product.name) {
        cartItem = cart[i];
      }
    }
    console.log("product.quantity: " + product.quantity);
    console.log("cartItem.quantity: " + cartItem.quantity);

    if (product.quantity <= cartItem.quantity) {
      btn.className = classes.outOfStock;
      btn.innerHTML = "OUT OF STOCK";
      btn.disabled = true;
    } else {
      btn.className = classes.btn;
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
          className={classes.btn}
          onClick={() => saveToCart(product, index)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));

  return (
    <div className={classes.main}>
      <div className={classes.topContainer}>
        <div className={classes.imgContainer}>
          <div className={classes.imgContent}>
            <div className={classes.moto}>
              <h1 className={classes.moto1}>Cool</h1>
              <h1 className={classes.moto2}>With</h1>
              <h1 className={classes.moto1}>Coule.</h1>
            </div>
            <div className={classes.imgText}>
              <p style={{fontSize:"25px"}} >Bet you never felt this cool.</p>
              <p style={{fontSize:"25px"}} >Now you can, with CoolWithCoule!</p>
            </div>
          </div>
        </div>
      </div>
      <h1 className={classes.expression}>Get 'em while they're hot!</h1>{" "}
      <p> Our products sell out quick! So be Coule and buy some now. Chefs from around </p>
      <p> the world buy from us. Just ask Gordon Ramsay, he only has great things to say.</p>
     
      <div className={classes.buttons}>
        <ul>
          <li>
            <button onClick={() => props.content("?name=apron")}>Aprons</button>
          </li>
          <li>
            <button onClick={() => props.content("?name=tea towel")}>
              Tea Towels
            </button>
          </li>
          <li>
            <button onClick={() => props.content("?name=oven mitt")}>
              Oven Mits
            </button>
          </li>
        </ul>
      </div>
      <div className={classes.content}>
        <SwishSpinner loading={props.isLoading} className={classes.icon} />
        {productsJsx.length === 0 && !props.isLoading ? (
          <h3>no results found.</h3>
        ) : (
          productsJsx
        )}
      </div>
    </div>
  );
}

export default Home;
