import React from "react";
import TextField from "@mui/material/TextField";
import MyLogs from "./MyLogs";

export default function Logs() {
  const passkey = process.env.REACT_APP_PASS_KEY;

  const isLogged = localStorage.getItem("isBob");
  const [isAllowed, setIsAllowed] = React.useState(isLogged === passkey);

  const handleInputChange = (e) => {
      if (e.target.value === passkey) {
        setIsAllowed(true);
        localStorage.setItem("isBob", e.target.value);
      }
  };

  return (
    <div>
      {isAllowed ? (
        <MyLogs />
      ) : (
        <>
          <h2>Enter Password to continue</h2>
          <p>
            <TextField
              id="outlined-basic"
              label="Enter Password"
              variant="outlined"
              type="password"
              onChange={handleInputChange}
              autoFocus
            />
          </p>
        </>
      )}
    </div>
  );
}
