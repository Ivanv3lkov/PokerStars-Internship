import React, { useState } from "react";
import "./AdminPanel.css";
import AdminForm from "./AdminForm";
import useDataHook from "./dataHook";


const AdminPanel = () => {
  const { data, refetchData } = useDataHook();
  const [album, setAlbum] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const setToSubmit = (shouldSetToSubmit) => {
    setIsEditing(shouldSetToSubmit);
  }

  const deleteAlbum = (albumId) => {
    fetch(`http://localhost:3001/albums/${albumId}`, {
      method: "DELETE",
    }).then(() => refetchData());
  };

  const getAlbum = (albumId) => {
    fetch(`http://localhost:3001/albums/${albumId}`)
      .then(response => response.json())
      .then(data => {
        setAlbum(data);
        setIsEditing(true)
      });
  };


  return (
    <div>
      <h1>Admin panel</h1>
      <AdminForm onSuccess={() => refetchData()} album={album} isEditing={isEditing} setToSubmit={setToSubmit} />
      <div className="albums-list">
        <div className="album-item">id</div>
        <div className="album-item">title</div>
        <div className="album-item">ACTIONS</div>
        {data.map((album, index) => {
          return (
            <React.Fragment key={index}>
              <div className="album-item">{album.id}</div>
              <div className="album-item">{album.title}</div>
              <div className="album-item">
                <button
                  className="delete-button"
                  onClick={() => deleteAlbum(album.id)}
                >
                  DELETE
                </button>
                <button
                  className="delete-button"
                  onClick={() => getAlbum(album.id)}
                >
                  EDIT
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPanel;
