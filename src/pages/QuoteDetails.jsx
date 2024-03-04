import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom";
import Highlightedquote from "../components/quotes/Highlightedquote.jsx";
import useHttp from "../hooks/useHttp.jsx";
import { singleQuotes } from "../lib/api.jsx";
import Spinner from "../components/loading/Spin.jsx";

const QuoteDetails = (props) => {
  const [loaded, setLoaded] = useState(false);
  const { sendRequest, status, data, error } = useHttp(singleQuotes, true);
  const params = useParams();

  useEffect(() => {
    sendRequest(params.qid);
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
    <>
      <Highlightedquote
        text={data[params.qid].text}
        author={data[params.qid].author}
      />
      {!loaded && (
        <div className="centered">
          <Link className="btn" to="comments" onClick={() => setLoaded(true)}>
            Comments
          </Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default QuoteDetails;
