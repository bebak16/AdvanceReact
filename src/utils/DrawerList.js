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
  header: {
    margin: "2em 1em 0em",
  },
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
  IITJLogs: "IITJ Logs",
  Logs : "Vivek Logs",
  Notes: "Vivek Notes",
  CalculatorAdv: "Advance Calculator",
  // MocktailApp: "Mocktails Info",
  // Pokemons: "Pokemon Abilities",
  // TourApp: "Tour Guide",
};

const DrawerList = () => {
  const { path, setPath } = useGlobalContext();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        <h2 style={styles.header}>Vivek's Notes</h2>
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
              <Switch
                edge="end"
                onChange={handleToggle(itr)}
                checked={path === itr}
                inputProps={{
                  "aria-labelledby": `${itr}`,
                }}
              />
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
