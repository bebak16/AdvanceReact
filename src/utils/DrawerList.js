import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useGlobalContext } from "../context";
import "./DrawerList.css";

const styles = {
  listItemIcon: {
    marginBottom: "4px",
  },
  listText: {
    fontSize: "10px",
  },
  listButton: {
    display: "grid",
  },
};

const components = {
  Home: "🏠 Home",
  IITJLogs: "📚 IITJ Logs",
  Logs : "📅 Logs",
  Notes: "📝 Notes",
  CalculatorAdv: "🧮 Calculator",
};

const DrawerList = () => {
  const { path, setPath } = useGlobalContext();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () =>  setIsSidebarOpen(!isSidebarOpen);

  const handleToggle = (nav) => () => {
    if (path === nav) {
      setPath("");
    } else {
      toggleSidebar();
      setPath(nav);
    }
  };

  return (
    <>
    <aside className={`left-menu ${isSidebarOpen ? 'open' : ''}`}>
      <div>
        <h2 className="header">Quick Drawer</h2>
        <List>
          {Object.keys(components).map((itr, index) => (
            <ListItem key={index}>
              <ListItemButton
                style={styles.listButton}
                onClick={handleToggle(itr)}
              >
                <ListItemText
                  style={styles.listText}
                  primary={components[itr]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </aside>
    <button className="side-icon" onClick={toggleSidebar}>
        ☰
      </button>
    </>
  );
};
export default DrawerList;
