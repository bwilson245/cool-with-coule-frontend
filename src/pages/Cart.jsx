import classes from "./Cart.module.css";
import { useRef, useState } from "react";
import userEvent from "@testing-library/user-event";
import mockCart from "./mock-cart.json";
import { Link, useNavigate } from "react-router-dom";
import { SwishSpinner } from "react-spinners-kit";
import axios from "axios";


const orderClient = axios.create({
  baseURL:
    "https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/postcheckout/%7BcustomerId%7D",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


function Cart(props) {
  const navigate = useNavigate();
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

  function buildOrder() {
    let order = []
    for (let i = 0; i < cart.length; i++) {
      order.push({
        "name": cart[i].name,
        "quantity": cart[i].quantity
      })
    }
    console.log(order)
    checkout(order)
  }


  function checkout(order) {
    setIsLoading(true)
    let customer = localStorage.getItem("customer");


    let request = orderClient
      .post(
        `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/postcheckout/` + customer.customerId,
        order
      )
      .then((res) => {
        console.log(res);
        if (res.data.customerModel == null) {
          setIsLoading(false);
          return alert(res.data.responseStatus.message);
        }
        sessionStorage.setItem("order", JSON.stringify(cart));
        console.log(res.data);
        setIsLoading(false);
        return navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    
    axios.interceptors.request.use((request) => {
      console.log("Starting Request", JSON.stringify(request, null, 2));
      return request;
    });
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
            {isLoading ? (
              <div className={classes.icon}>
                <SwishSpinner />
              </div>
            ) : null}
            {!isLoading ? (
              <div className={classes.order_data}>
                <p>
                  total price : $
                  {cart.reduce(
                    (total, item) => total + item.priceInCents * item.quantity,
                    0
                  ) / 100}
                </p>
                <button onClick={buildOrder}>Submit Order</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;


