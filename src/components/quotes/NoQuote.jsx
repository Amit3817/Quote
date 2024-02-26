import React from "react";
import { Link } from "react-router-dom";

const NoQuote = () => {
  return (
    <div className="centered" style={{ flexDirection: "column" }}>
      <h2>No Quote Found</h2>
      <Link className="btn" to="../addquote">
        Add Quote
      </Link>
    </div>
  );
};

export default NoQuote;
