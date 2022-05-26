import classes from "./Checkout.module.css";

const testOrder = [{"order":{"orderId":"test-id","productNames":["baby yoda oven mitt"],"orderDate":1653428474242,"customerId":"dummy-id"}
,"responseStatus":{"code":200,"message":"[SUCCESS] Good job everything is working great."}}]


let tableIsRendered = false;
const getOrder = () => {
  if (JSON.parse(sessionStorage.getItem("order") != null)) {
    tableIsRendered = true;
    console.log("Order was found in session storage");
  } else {
    console.log("Order was not found in session storage");
  }
};


function Checkout() {
  //var order = JSON.parse(sessionStorage.getItem("order"));
  var order = testOrder;
  if (order != null) {
    const orderProductsArray = order.productNames;
    //i want to create a string of all the productNames by using .join(" ") but it's giving errors.  //TODO
  }
    return (
        <div>
          <title>Checkout Successful</title>
            <div className={classes.checkoutbox}>
              <h1>Checkout Complete!</h1>
              <p>Your order is on its way!</p>
              <button className={classes.reviewbutton}
               onClick={getOrder}>
                   Click here to view your order</button>
            </div>
            <h2>test</h2>
            {tableIsRendered && <div>
              <table>
              <tr>
                <th>Order Id</th>
                <th>Order Date</th>
              </tr>
              <tbody>
                <tr>
                  ${order.orderId}
                  ${order.orderDate}
                </tr>
              </tbody>
            </table> 
            </div>}
        </div>
        
      );
}

export default Checkout;
