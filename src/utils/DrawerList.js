import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useGlobalContext } from "../context";

const styles = {
  page: {
    backgroundColor: "white",
    width: 300,
  },
  header: {
    marginLeft: "30px",
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
  CalculatorAdv: "Advance Calculator",
  Notes: "Vivek Notes",
  MyLogs: "Vivek Day Logs",
  MocktailApp: "Mocktails Info",
  Pokemons: "Pokemon Abilities",
  TourApp: "Tour Guide",
};

const DrawerList = () => {
  const { path, setPath } = useGlobalContext();

  const handleToggle = (nav) => () => {
    if (path === nav) {
      setPath("");
    } else {
      setPath(nav);
    }
  };

  return (
    <aside>
      <div style={styles.page}>
        <h2 style={styles.header}>Component Lists</h2>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {Object.keys(components).map((itr, index) => (
            <ListItem key={index}>
              <ListItemButton
                style={styles.listButton}
                onClick={handleToggle(itr)}
              >
                <ListItemText
                  style={styles.listText}
                  primary={itr}
                  secondary={components[itr]}
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
  );
};
export default DrawerList;
