import React, { useState } from "react";
import "../App.css";
import Albums from "./Albums";
import AdminPanel from "./AdminPanel";
import Router from "../router";


const views = {
  ALBUMS: "ALBUMS",
  ADMIN: "ADMIN",
};

function Home() {
  const [view, setView] = useState(views.ALBUMS);

  return (
    <div>
      <header>
        <nav>
          <button className={`nav-button ${view === views.ALBUMS ? 'highlight' : ''}`} onClick={() => setView(views.ALBUMS)}>
            Albums
          </button> 
          <button className={`nav-button ${view === views.ADMIN ? 'highlight' : ''}`} onClick={() => setView(views.ADMIN)}>
            Admin
          </button>
        </nav>
      </header>
      <main>
        {view === views.ALBUMS && <Albums />}
        {view === views.ADMIN && <AdminPanel />}
      </main>
    </div>
  );
}

export default Home;
