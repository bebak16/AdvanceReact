import React from "react";
import { Route, Routes } from "react-router-dom";
import CalculatorAdv from "./Calculator/CalculatorAdv";
import Notes from "./Notes/Notes";
import Logs from "./MyLogs/Logs";
import IITJLogs from "./IITJLogs/IITJLogs"
import DrawerList from "./utils/DrawerList";
import Navbar from "./utils/Navbar";
// import BasicQuizApp from "./BasicQuiz/BasicQuizApp";

const App = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <div style={{ display: "flex" }}>
        <DrawerList />
        <main style={{ margin: "1em" }}>
          <Routes>
            <Route exact path="/" element={<Logs />} />
            <Route exact path="/IITJLogs" element={<IITJLogs />} />
            <Route path="/Logs" element={<Logs />} />
            <Route path="/Notes" element={<Notes />} />
            <Route exact path="/CalculatorAdv" element={<CalculatorAdv />} />
           
            <Route component={<Logs />} />
            {/* <Route path="/BasicQuizApp" element={<BasicQuizApp />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
