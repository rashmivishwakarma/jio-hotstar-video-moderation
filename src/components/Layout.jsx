import {
  Toolbar,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Layout() {
   const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    {
      name: 'Dashboard',
      id: 'dashboard',
      iconUrl: `${import.meta.env.VITE_WEB_URL}src/assets/dashboard_icon.png`,
      isActive: false
    }, {
      name: 'Library',
      id: 'library',
      iconUrl: `${import.meta.env.VITE_WEB_URL}src/assets/menu-library-icon.png`,
      isActive: true
    },
  ])

  const handleNavigation = (path) => {
    setMenuItems(prevItems => 
      prevItems.map(prevItem => 
        prevItem.id === path ? { ...prevItem, isActive: true } : { ...prevItem, isActive: false }
      )
    );

    navigate(`/${path}`);
  }

  return (
    <div className="app">
      <div className="toolbar">
        <Toolbar>
          <div className="toolbar-content">
            <div className="left-toolbar">
              <img src="../../src/assets/logo.png" />
            </div>
            <div className="right-toolbar">
              <Button color="inherit">Welcome Admin</Button>
            </div>
          </div>
        </Toolbar>
      </div>
      <div className="view-container">
        <div className="menu-bar">
          {
            menuItems.map((item, index) => (
              <div 
                key={index} 
                className={`menu ${item.isActive ? 'selected' : ''}`}
                onClick={() => handleNavigation(item.id)}>
                <img className="mb-2" src={item.iconUrl} />
                <div className="menu-text">{item.name}</div>
              </div>
            ))
          }
        </div>
        <div className="menu-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
