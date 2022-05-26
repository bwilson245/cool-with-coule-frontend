import classes from "./Cart.module.css";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/products`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

let customerCart = [{}];

const exampleCart = [{
  "name": "may the forks be with you apron",
  "type": "apron",
  "upcCode": "11118",
  "quantity": 48,
  "description": "This apron makes sure everyone will have their forks",
  "priceInCents": 2000,
  "imageUrl": "./may-the-forks-be-with-you-apron.png"
},
{
  "name": "your opinion apron",
  "type": "apron",
  "upcCode": "11119",
  "quantity": 29,
  "description": "Make sure people know that you are the cook.  They aren't.",
  "priceInCents": 2000,
  "imageUrl": "./your-opinion-apron.png"
},
{
  "name": "batman apron",
  "type": "apron",
  "upcCode": "11116",
  "quantity": 75,
  "description": "This apron is to show how strong you really are",
  "priceInCents": 2000,
  "imageUrl": "./batman-apron.png"
},
{
  "name": "donut give up apron",
  "type": "apron",
  "upcCode": "11121",
  "quantity": 6,
  "description": "An apron to keep yourself and other inspired to donut give up.",
  "priceInCents": 2000,
  "imageUrl": "./donut-give-up-apron.png"
},
{
  "name": "oh crepe apron",
  "type": "apron",
  "upcCode": "11117",
  "quantity": 50,
  "description": "This apron is good if you like to make funny puns or just mess up while cooking",
  "priceInCents": 2000,
  "imageUrl": "./oh-crepe-apron.png"
}]


function Cart(props) {

  let price;
  let quantity;

  return (
    <div>
      <div className={classes.product_container}>

        <table className={classes.product_table}>
          <thead >
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Details</th>
              <th scope="col">Quantity</th>
              <th scope="col">Item Price</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {exampleCart.map((cart) => (
              <tr>
                <td><img className={classes.table_img} src={cart.imageUrl} alt="pic goes here" /></td>
                <td>{cart.description}</td>
                <td><input type="number" defaultValue={cart.quantity} min="0" value={quantity} onChange={() => quantity = this}/></td>
                <td>${cart.priceInCents / 100}</td>
                <td>${price}</td>
              </tr>
            ))}
          </tbody>

        </table>


      </div>
    </div>


  );
}

export default Cart;
