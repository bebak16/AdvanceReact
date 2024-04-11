import React from "react";
import { Route, Routes } from "react-router-dom";
import CalculatorAdv from "./Calculator/CalculatorAdv";
import MocktailApp from "./MocktailPage/MocktailApp";
import TourApp from "./TourPage/TourApp";
import Notes from "./Notes/Notes";
import Logs from "./MyLogs/Logs";
import Pokemons from "./PokemonDetails/Pokemons";
import DrawerList from "./utils/DrawerList";
import SingleCocktail from "./MocktailPage/pages/SingleCocktail";
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
          <h2>React Advance Components Home Page</h2>
          <Routes>
            <Route exact path="/" element={<Logs />} />
            <Route exact path="/CalculatorAdv" element={<CalculatorAdv />} />
            <Route path="/Notes" element={<Notes />} />
            <Route path="/Logs" element={<Logs />} />
            <Route path="/MocktailApp" element={<MocktailApp />} />
            <Route path="/MocktailApp/:id" element={<SingleCocktail />} />
            <Route path="/Pokemons" element={<Pokemons />} />
            <Route path="/TourApp" element={<TourApp />} />
            <Route component={<Logs />} />
            {/* <Route path="/BasicQuizApp" element={<BasicQuizApp />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
