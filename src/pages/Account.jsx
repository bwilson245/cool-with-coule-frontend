import classes from "./Account.module.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SwishSpinner } from "react-spinners-kit";

const customerClient = axios.create({
  baseURL:
    "https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function Account(props) {
  const navigate = useNavigate();
  let nameInput = useRef();
  let emailInput = useRef();
  let passwordInput = useRef();
  let addressInput = useRef();
  let cityInput = useRef();
  let stateInput = useRef();
  let zipcodeInput = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [render, reRender] = useState(0)

  useEffect(() => {
    let customer = JSON.parse(localStorage.getItem("customer"));
    setName(customer.name);
    setEmail(customer.email);
    setPassword(customer.password);
    setAddress(customer.location.address);
    setCity(customer.location.city);
    setState(customer.location.state);
    setZipcode(customer.location.zipCode);
  }, []);

  let customer = JSON.parse(localStorage.getItem("customer"));

  function updateCustomer() {
    // console.log("name = " + name);
    // console.log("email = " + email);
    // console.log("password = " + password);
    // console.log("address = " + address);
    // console.log("city = " + city);
    // console.log("state = " + state);
    //     console.log("zipcode = " + zipcode);

    setIsLoading(true);

    let id = customer.customerId;
    let jsonFile = {
      customerId: id,
      email: email,
      name: name,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      password: password,
    };

    Object.entries(jsonFile).map(([key, value]) => {
      if (key == "password") {
        if (value == null || value.length < 8) {
          console.log(key + ": " + value);
          setIsLoading(false);
          alert("password must be at least 8 characters");
          return reRender(render + 1);
        }
      } else {
        if (value == null || value.length == 0) {
          console.log(key + ": " + value);
          setIsLoading(false);
          alert("All fields are required");
          return reRender(render + 1);
        }
      }

      console.log(key + ": " + value);
    });
    console.log("test")
    customerClient
      .put(
        "https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer/" +
          id,
        JSON.stringify(jsonFile)
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        props.setLoggedIn(true);
        reRender(render + 1);
        return navigate("/")
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // alert("Something went wrong, try again");
        reRender(render + 1)
        return navigate("/");
      });
  }

  return (
    <>
      <div className={classes.card}>
        <h1 className={classes.login}>Update My Info</h1>
        <label className={classes.label}>Name</label>
        <input
          defaultValue={customer.name}
          type="text"
          placeholder="Name"
          ref={nameInput}
          onChange={() => setName(nameInput.current.value)}
        />
        <label className={classes.label}>Email</label>
        <input
          defaultValue={customer.email}
          type="email"
          placeholder="Email"
          ref={emailInput}
          onChange={() => setEmail(emailInput.current.value)}
        />
        <label className={classes.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          ref={passwordInput}
          onChange={() => setPassword(passwordInput.current.value)}
        />
        <label className={classes.label}>Address</label>
        <input
          defaultValue={customer.location.address}
          type="text"
          placeholder="Address"
          ref={addressInput}
          onChange={() => setAddress(addressInput.current.value)}
        />
        <label className={classes.label}>City</label>
        <input
          defaultValue={customer.location.city}
          type="text"
          placeholder="City"
          ref={cityInput}
          onChange={() => setCity(cityInput.current.value)}
        />
        <label className={classes.label}>State</label>
        <input
          defaultValue={customer.location.state}
          type="text"
          placeholder="State"
          ref={stateInput}
          onChange={() => setState(stateInput.current.value)}
        />
        <label className={classes.label}>Zip Code</label>
        <input
          defaultValue={customer.location.zipCode}
          type="text"
          placeholder="Zip Code"
          ref={zipcodeInput}
          onChange={() => setZipcode(zipcodeInput.current.value)}
        />
        <SwishSpinner loading={isLoading} />
        <div className={classes.btn}>
          <button
            disabled={isLoading}
            className={classes.signin}
            onClick={updateCustomer}
          >
            Update
          </button>

          <Link to="/">
            <button disabled={isLoading} className={classes.cancel}>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Account;
