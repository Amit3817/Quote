import React from "react";
import classing from "./QuoteItem.module.css";
import { Link } from "react-router-dom";

function QuoteItem(props) {
  return (
    <li className={classing.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link
        to={`${props.id}`}
        text={props.text}
        author={props.author}
        className="btn"
      >
        View Fullscreen
      </Link>
    </li>
  );
}

export default QuoteItem;
