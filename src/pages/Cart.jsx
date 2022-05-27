import classes from "./Cart.module.css";
import { useRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import mockCart from "./mock-cart.json";
import { Link } from "react-router-dom";
import { SwishSpinner } from "react-spinners-kit";

function Cart(props) {
  const input = useRef();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const user = localStorage.getItem("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function modItem(item, value) {
    console.log(item);
    console.log(value);

    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name == item.name) {
        cart[i].quantity += parseInt(value, 10);
        if (cart[i].quantity == -1) {
          return null;
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  }

  function removeItem(item) {
    console.log("test");
    let oldCart = JSON.parse(localStorage.getItem("cart"));
    let newCart = JSON.parse("[]");
    for (let i = 0; i < oldCart.length; i++) {
      if (oldCart[i].name != item.name) {
        newCart.push(oldCart[i]);
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  function saveToStorage() {
    sessionStorage.setItem("order", JSON.stringify(cart));
  }

  return (
    <div>
      {cart.length == 0 ? (
        <h1>GO BUY SOMETHING!!!</h1>
      ) : (
        <div className={classes.page}>
          <div className={classes.product_container}>
            <table className={classes.product_table}>
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Details</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.name}>
                    <td>
                      <img
                        className={classes.table_img}
                        src={product.imageUrl}
                        alt="pic goes here"
                      />
                    </td>
                    <td>{product.description}</td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        min="0"
                        ref={input}
                        value={product.quantity}
                        readOnly={true}
                      />
                      <button
                        className={classes.rem_btn}
                        onClick={() => removeItem(product)}
                      >
                        Remove
                      </button>
                      <button onClick={() => modItem(product, 1)}>+</button>
                      <button onClick={() => modItem(product, -1)}>-</button>
                    </td>
                    <td>${product.priceInCents / 100}</td>
                    <td>${(product.quantity * product.priceInCents) / 100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={classes.bot_data}>
            {isLoading && !orderPlaced ? (
              <div className={classes.icon}>
                <SwishSpinner />
              </div>
            ) : null}
            {!isLoading && orderPlaced ? (
              <div className={classes.order_confirm}>
                <p>Your order has been placed!</p>
                <Link to="/order">View your order</Link>
              </div>
            ) : null}
            {!isLoading && !orderPlaced ? (
              <div className={classes.order_data}>
                <p>
                  total price : $
                  {cart.reduce(
                    (total, item) => total + item.priceInCents * item.quantity,
                    0
                  ) / 100}
                </p>
                <Link to="/checkout"></Link>
                <button onClick={saveToStorage}>Submit Order</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;


