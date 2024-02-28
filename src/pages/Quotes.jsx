import QuoteList from "../components/quotes/QuoteList";
import { useEffect } from "react";
import useHttp from "../hooks/useHttp";
import { allQuotes } from "../lib/api";
import Spinner from "../components/loading/Spin";
import NoQuote from "../components/quotes/NoQuote.jsx";

const Quotes = () => {
  const { sendRequest, status, data, error } = useHttp(allQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return <Spinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (status === "completed" && (!data || data.length === 0)) {
    return <NoQuote />;
  }

  return (
    <section className={classes.section}>
      <QuoteList quotes={data} />
    </section>
  );
};

export default Quotes;
