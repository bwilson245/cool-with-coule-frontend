import classes from "./SignUpModal.module.css";
import { useRef, useState } from "react";
import axios from "axios";

const customerClient = axios.create({
  baseURL: `https://xqai7ofhql.execute-api.us-west-2.amazonaws.com/prod/customer`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


function SignUpModal(props) {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [user, setUser] = useState([])

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const addressInput = useRef();
  const cityInput = useRef();
  const stateInput = useRef();
  const zipCodeInput = useRef();


  function createUser() {
    console.log("createUser");
    preventRefresh();
      axios
        .post({
          email: email,
          name: name,
          address: address,
          city: city,
          state: state,
          zipcode: zipcode,
          password: password,
        })
        .then((res) => {
          console.log(res.customerModel);
        })
        .catch((err) => {
          console.log(err);
        });
    closeModal()
  }
  
  const preventRefresh = (e) => {
    e.preventDefault();
    console.log("refresh prevented")
  }

  function closeModal() {
    console.log("closeModal")
    setShow(false);
  }

  if (!show) {
    return null;
  }

  return (
    <>
      {/* <div className={classes.overlay}></div> */}
      <div className={classes.main}>
          <div className={classes.top}>
            <h1>Sign Up</h1>
            <input
              className={classes.input}
              type="text"
              placeholder="Full Name"
              id="name"
              ref={nameInput}
              onChange={() => setName(nameInput.current.value)}
            />
            <input
              className={classes.input}
              type="text"
              placeholder="Email"
              id="email"
              ref={emailInput}
              onChange={() => setEmail(emailInput.current.value)}
            />
            <input
              className={classes.input}
              type="password"
              placeholder="Password"
              id="password"
              ref={passwordInput}
              onChange={() => setPassword(passwordInput.current.value)}
            />
            <input
              className={classes.input}
              type="text"
              placeholder="Address"
              id="address"
              ref={addressInput}
              onChange={() => setAddress(addressInput.current.value)}
            />
            <input
              className={classes.input}
              type="text"
              placeholder="City"
              id="city"
              ref={cityInput}
              onChange={() => setCity(cityInput.current.value)}
            />
            <input
              className={classes.input}
              type="text"
              placeholder="State"
              id="state"
              ref={stateInput}
              onChange={() => setState(stateInput.current.value)}
            />
            <input
              className={classes.input}
              type="text"
              placeholder="ZipCode"
              id="zipCode"
              ref={zipCodeInput}
              onChange={() => setZipCode(zipCodeInput.current.value)}
            />
          </div>
          <div className={classes.bot}>
            <button className={classes.btn} onClick={createUser}>
              Submit
            </button>
            <button className={classes.btn} onClick={closeModal}>
              Cancel
            </button>
          </div>
      </div>
    </>
  );
}

export default SignUpModal;
