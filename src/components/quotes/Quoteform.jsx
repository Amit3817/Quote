import { useEffect, useState } from "react";
import classes from "./Quoteform.module.css";
import Spinner from "../loading/Spin";

const Quoteform = (props) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const win = window.sessionStorage;

  useEffect(() => {
    if (win.getItem("author")) setAuthor(win.getItem("author"));
    if (win.getItem("text")) setText(win.getItem("text"));
  }, []);

  useEffect(() => {
    win.setItem("author", author);
    win.setItem("text", text);
  }, [author, text]);

  function submitFormHandler(event) {
    event.preventDefault();
    props.onAddQuote({ author: author, text: text });
    win.clear();
    setAuthor("");
    setText("");
  }

  return (
    <>
      {props.isLoading && <Spinner />}
      {!props.isLoading && (
        <div className={classes.section}>
          <form onSubmit={submitFormHandler}>
            <label htmlFor="Author">Author</label>
            <br />
            <input
              type="text"
              id="Author"
              size="50"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
            <br></br>
            <label htmlFor="Text">Text</label>
            <br />
            <textarea
              rows="10"
              cols="50"
              id="Text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            ></textarea>
            <br></br>
            <button type="submit">Add</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Quoteform;
