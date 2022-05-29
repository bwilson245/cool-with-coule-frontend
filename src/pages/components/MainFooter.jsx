import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./MainFooter.module.css";
import "./resources/Logo-small.png";

function MainFooter(props) {
  const [render, reRender] = useState(0);

  function update() {
    props.reRender(render + 1);
  }

  function randomGif() {}
  return (
    <footer className={classes.footer}>
      <div className={classes.top}>
        <ul>
          <li>
            <Link to={"/faq"} onClick={update}>
              Twitter
            </Link>
          </li>
          <li>
            <Link to={"/faq"} onClick={update}>
              Facebook
            </Link>
          </li>
          <li>
            <Link to={"/faq"} onClick={update}>
              Google+
            </Link>
          </li>
          <li>
            <Link to={"/faq"} onClick={update}>
              Instagram
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.bottom}>
        <div className={classes.left}>
          <ul>
            <li>
              <Link to={"/faq"} onClick={update}>
                Contact
              </Link>
            </li>
            <li>
              <Link to={"/faq"} onClick={update}>
                About Us
              </Link>
            </li>
            <li>
              <Link to={"/faq"} onClick={update}>
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <ul>
            <li>
              <Link to={"/faq"} onClick={update}>
                Careers
              </Link>
            </li>
            <li>
              <Link to={"/faq"} onClick={update}>
                Change Country
              </Link>
            </li>
            <li>
              <Link to={"/faq"} onClick={update}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );

  // <footer>
  //   <div class="top">
  //     <ul>
  //       <li>
  //         <a href="#">Twitter</a>
  //       </li>
  //       <li>
  //         <a href="#">Facebook</a>
  //       </li>
  //       <li>
  //         <a href="#">Google+</a>
  //       </li>
  //       <li>
  //         <a href="#">Instagram</a>
  //       </li>
  //     </ul>
  //   </div>
  //   <div class="bottom">
  //     <div class="left">
  //       <ul>
  //         <li>
  //           <a href="#">Contact</a>
  //         </li>
  //         <li>
  //           <a href="#">About Us</a>
  //         </li>
  //         <li>
  //           <a href="#">Terms & Conditions</a>
  //         </li>
  //       </ul>
  //     </div>
  //     <div class="right">
  //       <ul>
  //         <li>
  //           <a href="#">Careers</a>
  //         </li>
  //         <li>
  //           <a href="#">Change country</a>
  //         </li>
  //         <li>
  //           <a href="#">FAQ</a>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // </footer>;
}

export default MainFooter;
