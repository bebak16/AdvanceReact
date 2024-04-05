import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MyLogs from "./MyLogs";

export default function Logs() {
  const passkey = process.env.REACT_APP_PASS_KEY;

  const isLogged = sessionStorage.getItem("isBob");
  const [isAllowed, setIsAllowed] = React.useState(isLogged === passkey);
  const [inputVal, setInputVal] = useState("");

  const validateUser = () => {
    if (inputVal === passkey) {
      setIsAllowed(true);
      sessionStorage.setItem("isBob", inputVal);
    }
  }

  const handleInputChange = (e) => {
    setInputVal(e.target.value);
    if(e.key === "Enter"){
      validateUser();
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
              onKeyDown={handleInputChange}
              autoFocus
            />
            <Button
              variant="contained"
              onClick={validateUser}
              color="success"
              style={{
                width: "9em",
                height: "4.5em",
                fontSize: "12px",
                marginLeft: "10px",
              }}
            >
              Add Log
            </Button>
          </p>
        </>
      )}
    </div>
  );
}
