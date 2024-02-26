import { useNavigate, useLocation } from "react-router-dom";
import React from "react";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryparms = new URLSearchParams(location.search);
  const isSort = queryparms.get("sort");
  const isAscSort = isSort === "asc";
  const sortedQuotes = sortQuotes(props.quotes, isAscSort);
  const onClickHandler = () => {
    navigate("?sort=" + (isAscSort ? "desc" : "asc"));
  };

  return (
    <>
      <button onClick={onClickHandler}>
        Sort {isAscSort ? "Descending" : "Ascending"}
      </button>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;
