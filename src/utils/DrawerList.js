import * as React from "react";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import { useNavigate, useLocation } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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
  BirthdayPage: "Employees Birthdate",
  MocktailApp: "Mocktails Info",
  Pokemons: "Pokemon Abilities",
  TourApp: "Tour Guide",
};

const DrawerList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location?.pathname.replace("/", "");
  const [checked, setChecked] = React.useState(currentPath);

  const handleToggle = (nav) => () => {
    debugger;
    if (checked === nav) {
      setChecked("");
      navigate("/");
    } else {
      setChecked(nav);
      navigate(`/${nav}`);
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
              <ListItemButton style={styles.listButton}>
                <ListItemText
                  style={styles.listText}
                  primary={itr}
                  secondary={components[itr]}
                />
              </ListItemButton>
              <Switch
                edge="end"
                onChange={handleToggle(itr)}
                checked={checked === itr}
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
