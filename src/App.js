import React from "react";
import { Route, Routes } from "react-router-dom";
import CalculatorAdv from "./Calculator/CalculatorAdv";
import Notes from "./Notes/Notes";
import Logs from "./MyLogs/Logs";
import IITJLogs from "./IITJLogs/IITJLogs"
import DrawerList from "./utils/DrawerList";
import Navbar from "./utils/Navbar";
// import BasicQuizApp from "./BasicQuiz/BasicQuizApp";
import Home from "./home";
import "./App.css";

const App = () => {
  return (
    <div className="top-container">
      <nav>
        <Navbar />
      </nav>
      <div style={{ display: "flex" }}>
        <DrawerList />
        <main style={{ marginTop: "6rem", margin: "1rem" }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/IITJLogs" element={<IITJLogs />} />
            <Route path="/Logs" element={<Logs />} />
            <Route path="/Notes" element={<Notes />} />
            <Route exact path="/CalculatorAdv" element={<CalculatorAdv />} />
            <Route exact path="*" element={<Home />} />
            <Route component={<Logs />} />
            {/* <Route path="/BasicQuizApp" element={<BasicQuizApp />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
