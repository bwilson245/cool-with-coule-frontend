import { useState } from "react";
import classes from "./FAQ.module.css"

function FAQ() {
    const [render, reRender] = useState(0)
    const gifs = [
      "https://media.giphy.com/media/S9i8jJxTvAKVHVMvvW/giphy.gif",
      "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
      "https://media.giphy.com/media/w7mLEAMcpjrpe/giphy.gif",
      "https://media.giphy.com/media/26gJzZw6Z85QLgxX2/giphy.gif",
      "https://media.giphy.com/media/l2SqgQdRgvJn0sSty/giphy.gif",
      "https://media.giphy.com/media/LURfx2QamoEQhZNuBk/giphy.gif",
      "https://media.giphy.com/media/26FPFoCdiPbuHrmlW/giphy.gif",
      "https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif",
      "https://media.giphy.com/media/r1HGFou3mUwMw/giphy.gif",
      "https://media.giphy.com/media/l3fZTOPfzmcdPlek8/giphy.gif",
      "https://media.giphy.com/media/TNBL4wO6Lv39e/giphy.gif",
      "https://media.giphy.com/media/myJzfC5PozIkM/giphy.gif",
      "https://media.giphy.com/media/rSaQxzxmPAGpW/giphy.gif",
      "https://media.giphy.com/media/l2SpKF3z2hbcrRdkI/giphy.gif",
      "https://media.giphy.com/media/3oeSADYLqmcN5PVkf6/giphy.gif",
    ];

    let random = gifs[Math.floor(Math.random()*gifs.length)]
    return (
      <div className={classes.container}>
        <img src={random}></img>
      </div>
    );
}
export default FAQ