import QuoteList from "../components/quotes/QuoteList.jsx";
import { useEffect } from "react";
import useHttp from "../hooks/useHttp.jsx";
import { allQuotes } from "../lib/api.jsx";
import Spinner from "../components/loading/Spin.jsx";
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
    <section >
      <QuoteList quotes={data} />
    </section>
  );
};

export default Quotes;
