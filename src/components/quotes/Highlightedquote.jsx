import React from "react";
import classes from "./Highlightedquote.module.css";

const Highlightedquote = (props) => {
  return (
    <div>
      <figure className={classes.quote}>
        <h1>{props.text}</h1>
        <figcaption>{props.author}</figcaption>
      </figure>
    </div>
  );
};

export default Highlightedquote;
