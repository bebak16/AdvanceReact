import React from "react";
import TextField from "@mui/material/TextField";
import MyLogs from "./MyLogs";

export default function Logs() {
  const [isAllowed, setIsAllowed] = React.useState(false);

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === process.env.REACT_APP_PASS_KEY) {
        setIsAllowed(true);
      }
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
              onKeyUp={handleInputChange}
              autoFocus
            />
          </p>
        </>
      )}
    </div>
  );
}
