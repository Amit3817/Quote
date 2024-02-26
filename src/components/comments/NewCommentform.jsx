import React, { useEffect, useRef } from "react";
import classes from "./NewCommentform.module.css";
import useHttp from "../../hooks/useHttp";
import { addComment } from "../../lib/api";
import Spinner from "../loading/Spin";

const NewCommentform = (props) => {
  const { sendRequest, status, error } = useHttp(addComment);
  const inputcommentref = useRef();
  const { onAddComment } = props;
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enterdText = inputcommentref.current.value;

    sendRequest({ comment: { text: enterdText }, qid: props.qid });
  };

  return (
    <>
      <form className={classes.section} onSubmit={submitFormHandler}>
        {status === "pending" && <Spinner />}
        <label htmlFor="Comment">Your Comment</label>
        <textarea id="Comment" rows="5" ref={inputcommentref}></textarea>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NewCommentform;
