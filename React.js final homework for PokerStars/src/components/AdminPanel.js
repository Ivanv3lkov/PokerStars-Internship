import React from "react";
import "./AdminPanel.css";
import AdminForm from "./AdminForm";
import useDataHook from "./dataHook";

const AdminPanel = () => {
  const { data, refetchData } = useDataHook();

  const deleteAlbum = (albumId) => {
    fetch(`http://localhost:3001/albums/${albumId}`, {
      method: "DELETE",
    }).then(() => refetchData());
  };

  return (
    <div>
      <h1>Admin panel</h1>
      <AdminForm onSuccess={() => refetchData()} />
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
                  onClick={() => deleteAlbum(album.id)}
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
