import { useState } from "react";
import "./sidenav.css";

export function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="container-fluid nav-container">
        <nav className="nav">
          {/* Hamburger icon to toggle sidebar */}
          <button className="hamburger-icon" onClick={toggleSidebar}>
            ☰
          </button>

          <div className={`nav_menu ${isOpen ? "open" : "closed"}`}>
            <div className="icon">
              <span className="bi bi-lightbulb"></span>
              {isOpen && <span>Notes</span>}
            </div>
            <div className="icon">
              <span className="bi bi-bell"></span>
              {isOpen && <span>Reminders</span>}
            </div>
            <div className="icon">
              <span className="bi bi-pencil"></span>
              {isOpen && <span>Edit</span>}
            </div>
            <div className="icon">
              <span className="bi bi-save2"></span>
              {isOpen && <span>Archives</span>}
            </div>
            <div className="icon">
              <span className="bi bi-trash"></span>
              {isOpen && <span>Bin</span>}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
