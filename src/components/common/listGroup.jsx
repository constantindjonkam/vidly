import React from "react";

const ListGroup = ({ genres, onList, currentGenre }) => {
  return (
    <div className="list-group">
      <button
        onClick={() => onList(false)}
        className={
          !currentGenre
            ? "list-group-item list-group-item-action active"
            : "list-group-item list-group-item-action"
        }
      >
        All Genres
      </button>
      {genres.map((genre) => (
        <button
          key={genre._id}
          onClick={() => onList(genre)}
          className={
            currentGenre === genre
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default ListGroup;
