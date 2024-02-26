import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

const Spinner = () => {
  return (
    <BeatLoader
      cssOverride={{
        display: "flex",
        margin: "15rem",
      }}
      color="white"
      size="50px"
    />
  );
};

export default Spinner;
