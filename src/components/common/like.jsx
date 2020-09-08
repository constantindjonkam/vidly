import React from "react";

const Like = ({ onLike, liked }) => {
  return (
    <i
      onClick={onLike}
      className={liked ? "clickable fa fa-heart" : "clickable fa fa-heart-o"}
    ></i>
  );
};

export default Like;
