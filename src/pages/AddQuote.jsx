import { useNavigate } from "react-router-dom";
import Quoteform from "../components/quotes/Quoteform";
import useHttp from "../hooks/useHttp";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const AddQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "completed") {
      navigate("../quotes");
    }
  }, [status]);

  const addQuoteHandler = async (quoteData) => {
    try {
      sendRequest(quoteData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Quoteform
        isLoading={status === "pending"}
        onAddQuote={addQuoteHandler}
      />
    </>
  );
};

export default AddQuote;
