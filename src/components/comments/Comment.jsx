import React, { useCallback, useEffect, useState } from "react";
import NewCommentform from "./NewCommentform";
import { Link, useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import useHttp from "../../hooks/useHttp";
import { allComments } from "../../lib/api";
import Spinner from "../loading/Spin";
import CommentList from "./CommentList";

const Comments = () => {
  const [isAddingComment, setisAddingComment] = useState(false);
  const params = useParams();
  const { sendRequest, status, error, data } = useHttp(allComments);
  const { qid } = params;
  useEffect(() => {
    sendRequest(qid);
  }, [qid, sendRequest]);

  const addCommentHandler = useCallback(
    (event) => {
      sendRequest(qid);
    },
    [sendRequest, qid]
  );

  let comments;
  if (status == "pending") {
    comments = (
      <div className="centered">
        <Spinner />
      </div>
    );
  }
  if (status === "completed" && data.length > 0) {
    comments = <CommentList comments={data} />;
  }
  if (status === "completed" && data.length == 0) {
    comments = <div className="centered">No Comments Found</div>;
  }

  return (
    <div className={classes.comment}>
      <h1>User Comments</h1>
      {!isAddingComment && (
        <button className="btn" onClick={() => setisAddingComment(true)}>
          Add Comments
        </button>
      )}
      {isAddingComment && (
        <NewCommentform onAddComment={addCommentHandler} qid={params.qid} />
      )}
      {comments}
    </div>
  );
};

export default Comments;
