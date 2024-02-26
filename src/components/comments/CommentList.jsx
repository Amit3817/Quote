import React from "react";
import CommentItem from "./CommentItem";
import classes from "./CommentList.module.css";
const CommentList = (props) => {
  return (
    <ul className={classes.list}>
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} id={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentList;
