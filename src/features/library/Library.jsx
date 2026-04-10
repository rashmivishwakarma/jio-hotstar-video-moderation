//import Toolbar from '@mui/material/Toolbar';
import {
  Toolbar,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import logo from '../../assets/logo.png';
import dashboardIcon from '../../assets/dashboard_icon.png';
import libraryIcon from '../../assets/menu-library-icon.png';

export default function Library() {

  console.log('env ', console.log(import.meta.env))
  const [menuItems, setMenuItems] = useState([
    {
      name: 'Dashboard',
      id: 'dashboard_01',
      iconUrl: dashboardIcon,
      isActive: false
    }, {
      name: 'Library',
      id: 'library_01',
      iconUrl: libraryIcon,
      isActive: true
    },
  ])

  useEffect(() => {
    setMenuItems(prevItems => 
      prevItems.map((item, index) => 
        index === 1 ? { ...item, isActive: true } : item
      )
    );
  }, []);

  return (
    <div className="app">
      <div className="toolbar">
        <Toolbar>
          <div className="toolbar-content">
            <div className="left-toolbar">
              <img src={logo} />
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
            menuItems.map((item) => (
              <div key={item.id} className={`menu ${item.isActive ? 'selected' : ''}`}>
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
