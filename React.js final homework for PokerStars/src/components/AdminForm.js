import React, { useState, useEffect } from "react";

const AdminForm = ({ onSuccess, album, isEditing, setToSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [songs, setSongs] = useState([""]);

  useEffect(() => {
    if (album && isEditing) {
      setTitle(album.title);
      setAuthor(album.author);
      setImage(album.image);
      setSongs(album.songs);
    }
  }, [album, isEditing]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (!isEditing) {
      fetch("http://localhost:3001/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          image,
          songs,
        }),
      }).then(() => {
        onSuccess();
        clearFormValues();
      });
    } else {
      fetch(`http://localhost:3001/albums/${album.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: album.id,
          title,
          author,
          image,
          songs,
        }),
      }).then(() => {
        onSuccess();
        clearFormValues();
      });
    }
  };

  const clearFormValues = () => {
    setTitle("");
    setAuthor("");
    setImage("");
    setSongs([""]);
    setToSubmit(false)
  };

  const onSongChange = (value, songIndex) => {
    setSongs((songs) =>
      songs.map((song, index) => (index === songIndex ? value : song))
    );
  };

  const addSong = () => setSongs((songs) => [...songs, ""]);

  return (
    <form className="album-form" onSubmit={onFormSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Author</label>
      <input
        type="text"
        id="author"
        value={author}
        required
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="image">Image</label>
      <input
        type="text"
        id="image"
        value={image}
        required
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="button" className="add-song" onClick={addSong}>
        Add song +
      </button>
      {songs.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <label htmlFor={`song${index}`}>Song #{index + 1}</label>
            <input
              type="text"
              id={`song${index}`}
              value={item}
              onChange={(e) => onSongChange(e.target.value, index)}
            />
          </React.Fragment>
        );
      })}
      <button type="submit" className="submit-button">
        {isEditing ? 'Save' : 'Submit'}
      </button>
    </form>
  );
};

export default AdminForm;