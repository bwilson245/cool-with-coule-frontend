import classes from "./Checkout.module.css";

function Checkout(props) {
  const cart = localStorage.getItem("cart");
  let orderJsx = cart.map((order) => {
    <div key={order.orderId} className={classes.order}>
      <h3 className={classes.name}>{order.productNames}</h3>
      <div className={classes.date}>{order.orderDate}</div>
    </div>;
  });
  return (
    <div>
      <title>Checkout Successful</title>
      <div className={classes.checkoutbox}>
        <h1>Checkout Complete!</h1>
        <p>Your order is on its way!</p>
        <button
          className={classes.reviewbutton}
          onClick={() => props.content("test-id")}
        >
          Click here to view your order
        </button>
      </div>

      <h2>test</h2>

      <div className={classes.content}>{orderJsx}</div>
    </div>
  );
}

export default Checkout;
